import { useCallback, useEffect, useMemo, useState } from "react";
import { Form, Formik, type FormikHelpers } from "formik";
import CheckoutForm from "./CheckoutForm";
import CheckoutItems from "./CheckoutItems";
import CheckoutSummary from "./CheckoutSummary";
import { readCart, writeCart, type CartItem } from "../../Utils/Hooks/useCart";
import { Mutations, Queries } from "../../Api";
import { ROUTES } from "../../Constants/Routes";
import { useAppDispatch, useAppSelector } from "../../Store/Hooks";
import { setAddresses } from "../../Store/Slices/AddressSlice";
import { setSettings } from "../../Store/Slices/SettingsSlice";
import { CheckoutSchema } from "../../Utils/ValidationSchemas";
import { notifyError, notifySuccess, notifyWarning } from "../../Attribute";
import { useNavigate } from "react-router-dom";
import { clearPhonePePending, getPhonePeUrl, getProvider, getRazorpayConfig, getStatusValue, isSuccessStatus, markPhonePePendingNotified, markPhonePeResultNotified, normalizePaymentResponse, normalizePaymentStatus, openRazorpay, readPhonePePending, storePhonePePending, wasPhonePePendingNotified, wasPhonePeResultNotified, } from "../common";
import type { AddressItem, CreateOrderPayload, CheckoutFormValues, SettingsItem } from "../../Types";

const CheckoutContent = () => {
  // ====== Local state ======
  const [items, setItems] = useState<CartItem[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [saveAddress, setSaveAddress] = useState(true);
  const dispatch = useAppDispatch();
  const { token, user, isAuthenticated } = useAppSelector((state) => state.auth);
  const settings = useAppSelector((state) => state.settings.item);
  const navigate = useNavigate();

  // ====== Clear cart after successful redirect ======
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status =
      params.get("status") ||
      params.get("state") ||
      params.get("payment_status") ||
      params.get("paymentStatus");
    if (!status) return;
    const normalized = normalizePaymentStatus(status);
    if (normalized === "paid") {
      writeCart([]);
      if (!wasPhonePeResultNotified(pendingMerchantOrderId, "paid")) {
        notifySuccess("Payment successful.");
        markPhonePeResultNotified(pendingMerchantOrderId, "paid");
      }
      clearPhonePePending();
      navigate(ROUTES.PAYMENT.SUCCESS);
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }
    if (normalized === "failed") {
      if (!wasPhonePeResultNotified(pendingMerchantOrderId, "failed")) {
        notifyError("Payment failed.");
        markPhonePeResultNotified(pendingMerchantOrderId, "failed");
      }
      clearPhonePePending();
      navigate(ROUTES.PAYMENT.FAILED);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [navigate]);

  // ====== Keep cart in sync ======
  useEffect(() => {
    const load = () => setItems(readCart());
    load();
    const onUpdate = () => load();
    window.addEventListener("delvoura-cart-updated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("delvoura-cart-updated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  // ====== Address fetch + store sync ======
  const { data: addressData } = Queries.useGetAddresses(undefined, token ?? undefined);
  const { data: settingsData } = Queries.useGetSettings();
  const addresses = useAppSelector((state) => state.address.items);

  const resolveUser = useCallback((input: unknown) => {
    if (!input) return {};
    return (
      (input as { data?: { user?: unknown } })?.data?.user ??
      (input as { user?: unknown })?.user ??
      input
    );
  }, []);

  const resolvedUser = resolveUser(user) as {
    firstName?: string;
    lastName?: string;
    email?: string;
    contact?: { phoneNo?: string | number; countryCode?: string };
    phone?: string | number;
  };

  const resolveAddressList = (input: unknown): AddressItem[] => {
    if (!input) return [];
    const root = (input as { data?: unknown })?.data ?? input;
    if (Array.isArray(root)) return root as AddressItem[];
    const data = root as { address_data?: unknown; addresses?: unknown; data?: unknown };
    if (Array.isArray(data.address_data)) return data.address_data as AddressItem[];
    if (Array.isArray(data.addresses)) return data.addresses as AddressItem[];
    if (Array.isArray(data.data)) return data.data as AddressItem[];
    return [];
  };

  const resolvedAddresses = useMemo(() => resolveAddressList(addressData), [addressData]);

  // ====== Store address list for other screens ======
  useEffect(() => {
    dispatch(setAddresses(resolvedAddresses));
  }, [dispatch, resolvedAddresses]);

  const resolveSettings = (input: unknown): SettingsItem | null => {
    if (!input) return null;
    const root = (input as { data?: unknown })?.data ?? input;
    if (Array.isArray(root)) return (root[0] as SettingsItem) ?? null;
    const data = root as { settings?: unknown; settings_data?: unknown; data?: unknown };
    if (data.settings && typeof data.settings === "object") return data.settings as SettingsItem;
    if (Array.isArray(data.settings_data)) return (data.settings_data[0] as SettingsItem) ?? null;
    if (data.data && typeof data.data === "object") return data.data as SettingsItem;
    if (typeof root === "object") return root as SettingsItem;
    return null;
  };

  const resolvedSettings = useMemo(() => resolveSettings(settingsData), [settingsData]);

  useEffect(() => {
    if (!resolvedSettings) return;
    dispatch(setSettings(resolvedSettings));
  }, [dispatch, resolvedSettings]);

  // ====== Auto-pick saved address when available ======
  const canUseSavedAddresses = isAuthenticated && addresses.length > 0;
  const preferredGateway = useMemo(() => {
    if (settings?.isPhonePe) return "phonepe";
    if (settings?.isRazorpay) return "razorpay";
    return "";
  }, [settings]);

  useEffect(() => {
    if (!canUseSavedAddresses) {
      setShowAddressForm(true);
      setSelectedAddressId(null);
      return;
    }
    if (!selectedAddressId && addresses.length > 0) {
      const defaultAddress = addresses.find((item) => item.isDefault) ?? addresses[0];
      setSelectedAddressId(defaultAddress?._id ?? null);
    }
  }, [addresses, canUseSavedAddresses, selectedAddressId]);

  // ====== API hooks ======
  const { mutate: createOrder } = Mutations.useCreateOrder(token ?? undefined);
  const { mutateAsync: createRazorpayPayment } = Mutations.useCreateRazorpayPayment(token ?? undefined);
  const { mutateAsync: createPhonepePayment } = Mutations.useCreatePhonepePayment(token ?? undefined);
  const { mutateAsync: verifyRazorpayPayment } = Mutations.useVerifyRazorpayPayment(token ?? undefined);

  // ====== Cart total ======
  const subtotal = useMemo( () => items.reduce((sum, item) => sum + item.price * item.qty, 0),[items]);

  // ====== Form defaults ======
  const initialValues = useMemo<CheckoutFormValues>(() => ({
      firstName: resolvedUser?.firstName ?? "",
      lastName: resolvedUser?.lastName ?? "",
      email: resolvedUser?.email ?? "",
      phone: String(resolvedUser?.contact?.phoneNo ?? resolvedUser?.phone ?? ""),
      countryCode: resolvedUser?.contact?.countryCode ?? "+91",
      country: "India",
      state: "",
      city: "",
      pinCode: "",
      address1: "",
      address2: "",
      discountCode: "",
    }),
    [resolvedUser]
  );

  const [pendingPhonePe, setPendingPhonePe] = useState(() => readPhonePePending());
  const pendingMerchantOrderId = pendingPhonePe?.merchantOrderId;
  const { data: phonepeStatusData } = Queries.useGetPhonepeOrderStatus(
    pendingMerchantOrderId ?? undefined,
    token ?? undefined
  );

  useEffect(() => {
    if (!phonepeStatusData) return;
    const payload = normalizePaymentResponse(phonepeStatusData);
    const statusValue = getStatusValue(payload);
    if (!statusValue) return;
    const normalized = normalizePaymentStatus(statusValue);

    if (isSuccessStatus(statusValue) || normalized === "paid") {
      writeCart([]);
      if (!wasPhonePeResultNotified(pendingMerchantOrderId, "paid")) {
        notifySuccess("Payment successful.");
        markPhonePeResultNotified(pendingMerchantOrderId, "paid");
      }
      clearPhonePePending();
      setPendingPhonePe(null);
      navigate(ROUTES.PAYMENT.SUCCESS);
      return;
    }

    if (normalized === "failed" || normalized === "refunded") {
      const resultKey = normalized === "refunded" ? "refunded" : "failed";
      if (!wasPhonePeResultNotified(pendingMerchantOrderId, resultKey)) {
        notifyError(normalized === "refunded" ? "Payment refunded." : "Payment failed.");
        markPhonePeResultNotified(pendingMerchantOrderId, resultKey);
      }
      clearPhonePePending();
      setPendingPhonePe(null);
      navigate(ROUTES.PAYMENT.FAILED);
      return;
    }

    if (!wasPhonePePendingNotified(pendingMerchantOrderId)) {
      notifyWarning("Payment is still processing.");
      markPhonePePendingNotified(pendingMerchantOrderId);
    }
  }, [navigate, phonepeStatusData, pendingMerchantOrderId]);

  // ====== Open the correct payment UI ======
  const handlePaymentFlow = async (
    payload: Record<string, unknown>,
    values: CheckoutFormValues,
    preferred?: string,
    options?: { silentFail?: boolean },
    context?: { orderId?: string }
  ) => {
    const provider = preferred || getProvider(payload);
    const phonePeUrl = getPhonePeUrl(payload);

    if (provider.includes("phone") || phonePeUrl) {
      if (!phonePeUrl) {
        if (options?.silentFail) return false;
        notifyError("PhonePe redirect URL is missing.");
        return false;
      }
      storePhonePePending(payload, context?.orderId);
      setPendingPhonePe(readPhonePePending());
      window.location.href = phonePeUrl;
      return true;
    }

    const razorpayConfig = getRazorpayConfig(payload);
    if (provider.includes("razor") || razorpayConfig.hasConfig) {
      if (!razorpayConfig.hasConfig) {
        if (options?.silentFail) return false;
        notifyError("Razorpay configuration is missing.");
        return false;
      }
      if (!razorpayConfig.key || !razorpayConfig.orderId || !razorpayConfig.amount) {
        notifyError("Razorpay configuration is incomplete.");
        return false;
      }

      const result = await openRazorpay({
        key: razorpayConfig.key,
        amount: razorpayConfig.amount,
        currency: razorpayConfig.currency,
        orderId: razorpayConfig.orderId,
        prefill: {
          name: [values.firstName, values.lastName].filter(Boolean).join(" ").trim(),
          email: values.email,
          contact: values.phone,
        },
        onSuccess: async (response) => {
          try {
            await verifyRazorpayPayment({
              razorpay_order_id: response?.razorpay_order_id ?? razorpayConfig.orderId,
              razorpay_payment_id: response?.razorpay_payment_id,
              razorpay_signature: response?.razorpay_signature,
              orderId: context?.orderId,
            });
            notifySuccess("Payment successful.");
            writeCart([]);
            navigate(ROUTES.PAYMENT.SUCCESS);
          } catch (error) {
            const message = error instanceof Error ? error.message : "Payment verification failed.";
            notifyError(message);
            navigate(ROUTES.PAYMENT.FAILED);
          }
        },
        onFail: () => {
          notifyWarning("Payment failed.");
          navigate(ROUTES.PAYMENT.FAILED);
        },
        onDismiss: () => {
          notifyWarning("Payment cancelled.");
          navigate(ROUTES.PAYMENT.FAILED);
        },
      });

      if (!result.ok) {
        notifyError("Unable to load Razorpay. Please try again.");
        return false;
      }
      return true;
    }

    return false;
  };

  // ====== Place order + trigger payment ======
  const handleSubmit = (values: CheckoutFormValues, helpers: FormikHelpers<CheckoutFormValues>) => {
    if (!items.length) {
      notifyError("Your cart is empty.");
      helpers.setSubmitting(false);
      return;
    }

    const trimmedEmail = values.email.trim().toLowerCase();
    const trimmedPhone = values.phone.replace(/\s+/g, "").trim();
    const lineItems = items.map((item) => ({
      productId: item.id,
      quantity: item.qty,
      price: item.price,
    }));

    const payload: CreateOrderPayload = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: trimmedEmail,
      phone: trimmedPhone,
      items: lineItems,
      subtotal,
      total: subtotal,
      discountCode: values.discountCode?.trim() || undefined,
      currency: "INR",
    };

    const useSavedAddress = canUseSavedAddresses && selectedAddressId && !showAddressForm;

    if (useSavedAddress) {
      payload.addressId = selectedAddressId;
    } else {
      payload.shippingAddress = [
        {
          country: values.country,
          address1: values.address1,
          address2: values.address2,
          city: values.city,
          state: values.state,
          pinCode: values.pinCode,
          default: saveAddress,
        },
      ];
    }

    createOrder(payload, {
      onSuccess: async (response) => {
        // Step 1: If backend already returns payment data, use it directly
        const payload = normalizePaymentResponse(response);
        const orderId =
          (payload as any)?.orderId ??
          (payload as any)?._id ??
          (payload as any)?.order?._id ??
          (payload as any)?.data?._id;
        const handled = await handlePaymentFlow(payload, values, preferredGateway, { silentFail: true }, { orderId: orderId ? String(orderId) : undefined });
        if (handled) return;

        // Step 2: Otherwise create payment based on provider
        const provider = preferredGateway || getProvider(payload) || "phonepe";

        if (!orderId) {
          notifySuccess("Order placed successfully.");
          return;
        }

        try {
          if (provider.includes("razor")) {
            const razorpayResponse = await createRazorpayPayment({
              orderId: String(orderId),
              amount: subtotal,
              currency: "INR",
            });
            const razorpayHandled = await handlePaymentFlow(
              normalizePaymentResponse(razorpayResponse),
              values,
              "razorpay",
              undefined,
              { orderId: String(orderId) }
            );
            if (!razorpayHandled) notifySuccess("Order placed successfully.");
            return;
          }

          // Default: PhonePe
          const phonepeResponse = await createPhonepePayment({
            orderId: String(orderId),
            amount: subtotal,
            redirectUrl: `${window.location.origin}${ROUTES.CHECKOUT}`,
          });
          const phonepeHandled = await handlePaymentFlow(
            normalizePaymentResponse(phonepeResponse),
            values,
            "phonepe",
            undefined,
            { orderId: String(orderId) }
          );
          if (!phonepeHandled) notifySuccess("Order placed successfully.");
        } catch (error) {
          const message = error instanceof Error ? error.message : "Payment initiation failed.";
          notifyError(message);
        }
      },
      onError: (err) => {
        const message = err instanceof Error ? err.message : "Something went wrong";
        notifyError(message);
      },
      onSettled: () => {
        helpers.setSubmitting(false);
      },
    });
  };

  return (
    <section className="mx-auto w-[95%] max-w-[1280px] py-10">
      <Formik<CheckoutFormValues>  enableReinitialize  initialValues={initialValues}  validationSchema={CheckoutSchema}  onSubmit={handleSubmit}>
        <Form>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
            <CheckoutForm addresses={addresses} selectedAddressId={selectedAddressId} onSelectAddress={(id) => {  setSelectedAddressId(id);  setShowAddressForm(false);
              }}
              showAddressForm={showAddressForm}
              onToggleAddressForm={() => setShowAddressForm((prev) => !prev)}
              saveAddress={saveAddress}
              onToggleSaveAddress={() => setSaveAddress((prev) => !prev)}
              canUseSavedAddresses={canUseSavedAddresses}
            />
            <div className="space-y-6">
              <CheckoutItems items={items} />
              <CheckoutSummary items={items} />
            </div>
          </div>
        </Form>
      </Formik>
    </section>
  );
};

export default CheckoutContent;
