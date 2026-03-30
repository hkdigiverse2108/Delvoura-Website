export type PaymentProvider = "phonepe" | "razorpay" | "";

export const asObject = (input: unknown) =>
  input && typeof input === "object" ? (input as Record<string, unknown>) : {};

export const normalizePaymentResponse = (raw: unknown) => {
  const root = (raw as { data?: unknown })?.data ?? raw;
  const data = (root as { data?: unknown })?.data ?? root;
  return { ...asObject(root), ...asObject(data) } as Record<string, unknown>;
};

export const getProvider = (payload: Record<string, unknown>) =>
  String(
    (payload as any)?.paymentProvider ??
      (payload as any)?.paymentMethod ??
      (payload as any)?.gateway ??
      ""
  ).toLowerCase();

export const getPhonePeUrl = (payload: Record<string, unknown>) =>
  (payload as any)?.phonePeUrl ??
  (payload as any)?.phonepeUrl ??
  (payload as any)?.phonePeRedirectUrl ??
  (payload as any)?.redirectUrl ??
  (payload as any)?.phonepe?.redirectUrl ??
  (payload as any)?.phonePe?.redirectUrl ??
  (payload as any)?.paymentUrl ??
  (payload as any)?.instrumentResponse?.redirectInfo?.url ??
  (payload as any)?.redirectInfo?.url ??
  (payload as any)?.phonepe?.instrumentResponse?.redirectInfo?.url ??
  (payload as any)?.phonepe?.data?.instrumentResponse?.redirectInfo?.url ??
  (payload as any)?.phonePe?.instrumentResponse?.redirectInfo?.url ??
  (payload as any)?.phonePe?.data?.instrumentResponse?.redirectInfo?.url;

export const getRazorpayConfig = (payload: Record<string, unknown>) => {
  const razorpayPayload =
    (payload as any)?.razorpay ??
    (payload as any)?.razorpayData ??
    (payload as any)?.razorpayOrder ??
    (payload as any)?.order ??
    null;

  return {
    hasConfig: !!(
      razorpayPayload ||
      (payload as any)?.razorpayKey ||
      (payload as any)?.razorpayOrderId
    ),
    key:
      (payload as any)?.razorpayKey ??
      (payload as any)?.razorpayKeyId ??
      (razorpayPayload as any)?.key ??
      (razorpayPayload as any)?.key_id ??
      (razorpayPayload as any)?.keyId ??
      (payload as any)?.key,
    orderId:
      (payload as any)?.razorpayOrderId ??
      (payload as any)?.orderId ??
      (razorpayPayload as any)?.id ??
      (razorpayPayload as any)?.orderId ??
      (payload as any)?.razorpayId,
    amount: (payload as any)?.amount ?? (razorpayPayload as any)?.amount,
    currency:
      (payload as any)?.currency ?? (razorpayPayload as any)?.currency ?? "INR",
  };
};

export const loadRazorpayScript = () =>
  new Promise<boolean>((resolve) => {
    if ((window as any).Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

type RazorpayOpenOptions = {
  key: string;
  amount: number;
  currency?: string;
  orderId: string;
  name?: string;
  description?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  themeColor?: string;
  onSuccess: (payload: any) => void;
  onDismiss?: () => void;
  onFail?: (payload: any) => void;
};

export const openRazorpay = async (options: RazorpayOpenOptions) => {
  const loaded = await loadRazorpayScript();
  if (!loaded) return { ok: false, error: "Razorpay load failed" } as const;

  const Razorpay = (window as any).Razorpay;
  const instance = new Razorpay({
    key: options.key,
    amount: options.amount,
    currency: options.currency ?? "INR",
    name: options.name ?? "Delvoura",
    description: options.description ?? "Order payment",
    order_id: options.orderId,
    prefill: options.prefill,
    handler: (res: any) => options.onSuccess(res),
    modal: {
      ondismiss: () => options.onDismiss?.(),
    },
    theme: { color: options.themeColor ?? "#EB4A2E" },
  });

  if (options.onFail) {
    instance.on("payment.failed", (res: any) => options.onFail?.(res));
  }

  instance.open();
  return { ok: true } as const;
};

const PHONEPE_STORAGE_KEY = "dv_phonepe_pending";

type PhonePePending = {
  merchantOrderId: string;
  orderId?: string;
};

export const storePhonePePending = (payload: Record<string, unknown>, orderId?: string) => {
  const merchantOrderId =
    (payload as any)?.merchantOrderId ??
    (payload as any)?.phonepe?.data?.merchantOrderId ??
    (payload as any)?.phonePe?.data?.merchantOrderId;

  if (!merchantOrderId) return false;
  const entry: PhonePePending = { merchantOrderId: String(merchantOrderId) };
  if (orderId) entry.orderId = orderId;
  sessionStorage.setItem(PHONEPE_STORAGE_KEY, JSON.stringify(entry));
  return true;
};

export const readPhonePePending = (): PhonePePending | null => {
  const raw = sessionStorage.getItem(PHONEPE_STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as PhonePePending;
    if (!parsed?.merchantOrderId) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const clearPhonePePending = () => {
  sessionStorage.removeItem(PHONEPE_STORAGE_KEY);
};

export const getStatusValue = (payload: Record<string, unknown>) =>
  String(
    (payload as any)?.state ??
      (payload as any)?.status ??
      (payload as any)?.data?.state ??
      (payload as any)?.data?.status ??
      ""
  ).toLowerCase();

export const isSuccessStatus = (status: string) =>
  ["success", "completed", "captured", "paid"].includes(status.toLowerCase());
