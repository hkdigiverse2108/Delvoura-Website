export type RazorpayCreatePaymentPayload = {
  amount?: number;
  currency?: string;
  orderId?: string;
  receipt?: string;
  notes?: Record<string, unknown>;
  [key: string]: unknown;
};

export type RazorpayCreatePaymentResponse = Record<string, unknown>;

export type RazorpayVerifyPaymentPayload = {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  orderId?: string;
  [key: string]: unknown;
};

export type RazorpayVerifyPaymentResponse = Record<string, unknown>;

export type RazorpayOrderStatusResponse = Record<string, unknown>;

export type PhonepeCreatePaymentPayload = {
  amount?: number;
  amountUnit?: string;
  expireAfter?: number;
  message?: string;
  metaInfo?: Record<string, unknown>;
  redirectUrl?: string;
  callbackUrl?: string;
  orderId?: string;
  merchantOrderId?: string;
  [key: string]: unknown;
};

export type PhonepeCreatePaymentResponse = Record<string, unknown>;

export type PhonepeOrderStatusResponse = Record<string, unknown>;


export type PaymentResultProps = {
  status: "success" | "failed";
  title?: string;
  description?: string;
  note?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};
