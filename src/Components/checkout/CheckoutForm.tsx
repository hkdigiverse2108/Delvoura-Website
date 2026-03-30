import { useEffect } from "react";
import { useFormikContext } from "formik";
import { CommonCountrySelect, CommonEmailInput, CommonPhoneInput, CommonPinCodeInput, CommonTextInput, } from "../../Attribute";
import AddressPicker from "./AddressPicker";
import type { AddressItem, CheckoutFormValues } from "../../Types";

type CheckoutFormProps = {
  addresses: AddressItem[];
  selectedAddressId: string | null;
  onSelectAddress: (id: string) => void;
  showAddressForm: boolean;
  onToggleAddressForm: () => void;
  saveAddress: boolean;
  onToggleSaveAddress: () => void;
  canUseSavedAddresses: boolean;
};

const CheckoutForm = ({ addresses, selectedAddressId, onSelectAddress, showAddressForm, onToggleAddressForm, saveAddress, onToggleSaveAddress, canUseSavedAddresses,}: CheckoutFormProps) => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    useFormikContext<CheckoutFormValues>();

  const fullName = [values.firstName, values.lastName].filter(Boolean).join(" ").trim() || "Delivery Address";
  const displayPhone = values.phone ? `${values.countryCode} ${values.phone}`.trim() : values.countryCode;

  useEffect(() => {
    if (showAddressForm) return;
    if (!selectedAddressId) return;
    const selectedAddress = addresses.find((item) => item._id === selectedAddressId);
    if (!selectedAddress) return;

    setFieldValue("country", selectedAddress.country ?? values.country ?? "India");
    setFieldValue("state", selectedAddress.state ?? "");
    setFieldValue("city", selectedAddress.city ?? "");
    setFieldValue("pinCode", selectedAddress.pinCode ?? "");
    setFieldValue("address1", selectedAddress.address1 ?? "");
    setFieldValue("address2", selectedAddress.address2 ?? "");
  }, [addresses, selectedAddressId, setFieldValue, showAddressForm, values.country]);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[color:var(--color-border)] bg-white px-5 py-5">
        <h3 className="text-base font-semibold">Personal Information</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <CommonTextInput name="firstName" label="First Name" placeholder="First name" value={values.firstName} onChange={handleChange} onBlur={handleBlur} error={touched.firstName ? (errors.firstName as string) : undefined} touched={!!touched.firstName} />
          <CommonTextInput  name="lastName"  label="Last Name"  placeholder="Last name"  value={values.lastName}  onChange={handleChange}  onBlur={handleBlur}  error={touched.lastName ? (errors.lastName as string) : undefined}  touched={!!touched.lastName} />
          <CommonEmailInput name="email" label="Email" placeholder="you@example.com" value={values.email} onChange={handleChange} onBlur={handleBlur} error={touched.email ? (errors.email as string) : undefined} touched={!!touched.email} />
          <CommonPhoneInput name="phone" label="Phone" placeholder="Enter phone number" value={values.phone} onChange={handleChange} onBlur={handleBlur} error={touched.phone ? (errors.phone as string) : undefined} touched={!!touched.phone} countryValue={values.countryCode} onCountryChange={(value: string) => setFieldValue("countryCode", value)} />
        </div>
      </section>

      <section className="rounded-2xl border border-[color:var(--color-border)] bg-white px-5 py-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">Shipping Address</h3>
          {canUseSavedAddresses && (
            <button
              type="button"
              onClick={onToggleAddressForm}
              className="cursor-pointer rounded-md border border-[color:var(--color-border)] px-3 py-1 text-xs font-semibold text-[color:var(--color-text)] hover:border-[color:var(--color-border)]"
            >
              {showAddressForm ? "Back to Saved Addresses" : "Use Different Address"}
            </button>
          )}
        </div>
        {!showAddressForm && canUseSavedAddresses && (
          <div className="mt-4 space-y-3">
            <AddressPicker addresses={addresses} selectedId={selectedAddressId ?? ""} onSelect={onSelectAddress} fullName={fullName} phone={displayPhone || ""} />
          </div>
        )}

        {showAddressForm && (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <CommonCountrySelect name="country" label="Country" placeholder="Select country" value={values.country} onChange={(value: string) => setFieldValue("country", value)} onBlur={handleBlur} error={touched.country ? (errors.country as string) : undefined} touched={!!touched.country} />
              <CommonTextInput name="state" label="State" placeholder="State" value={values.state} onChange={handleChange} onBlur={handleBlur} error={touched.state ? (errors.state as string) : undefined} touched={!!touched.state} />
              <CommonTextInput name="city" label="City" placeholder="City" value={values.city} onChange={handleChange} onBlur={handleBlur} error={touched.city ? (errors.city as string) : undefined} touched={!!touched.city} />
              <CommonPinCodeInput name="pinCode" label="Pin Code" placeholder="Pin code" value={values.pinCode} onChange={handleChange} onBlur={handleBlur} error={touched.pinCode ? (errors.pinCode as string) : undefined} touched={!!touched.pinCode} />
              <CommonTextInput name="address1" label="Address Line 1" placeholder="Flat / House / Building" value={values.address1} onChange={handleChange} onBlur={handleBlur} error={touched.address1 ? (errors.address1 as string) : undefined} touched={!!touched.address1} />
              <CommonTextInput name="address2" label="Landmark" placeholder="Landmark (optional)" value={values.address2} onChange={handleChange} onBlur={handleBlur} error={touched.address2 ? (errors.address2 as string) : undefined} touched={!!touched.address2} />
            </div>

            <label className="mt-5 flex items-center gap-3 text-sm text-[color:var(--color-text-muted)]">
              <input type="checkbox" checked={saveAddress} onChange={onToggleSaveAddress} className="h-4 w-4 accent-[color:var(--color-accent)]" />
              Save this address for next time
            </label>
          </>
        )}
      </section>

      <section className="rounded-2xl border border-[color:var(--color-border)] bg-white px-5 py-5">
        <h3 className="text-base font-semibold">Payment</h3>
        <p className="mt-1 text-sm text-[color:var(--color-text-muted)]">
          All transactions are secure and encrypted.
        </p>

        <div className="mt-4 overflow-hidden rounded-2xl border border-[color:var(--color-accent)] bg-[color:var(--color-secondary-bg)]">
          <div className="flex items-start justify-between gap-4 px-4 py-3">
            <div>
              <div className="text-sm font-semibold">
                Razorpay Secure (UPI, Cards, Int'l Cards, Wallets)
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src="/assets/images/checkout/upi.svg" alt="UPI" className="h-5 w-auto" />
              <img src="/assets/images/checkout/visa.svg" alt="Visa" className="h-5 w-auto" />
              <img src="/assets/images/checkout/masterCard.svg" alt="Mastercard" className="h-5 w-auto" />
              <span className="rounded border border-[color:var(--color-border)] bg-white px-2 py-1 text-[10px] text-[color:var(--color-text-muted)]">
                +18
              </span>
            </div>
          </div>
          <div className="border-t border-[color:var(--color-border)] bg-white px-4 py-3 text-sm text-[color:var(--color-text-muted)]">
            You'll be redirected to the selected payment gateway to complete your purchase.
          </div>
        </div>
      </section>
    </div>
  );
};

export default CheckoutForm;
