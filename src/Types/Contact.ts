export type ContactUsPayload = {
  fullName: string;
  email: string;
  countryCode?: string;
  phone?: string;
  message: string;
};

export type ContactUsResponse = {
  status?: number;
  message?: string;
  data?: unknown;
};
