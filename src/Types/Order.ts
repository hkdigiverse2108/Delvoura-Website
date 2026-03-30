export type OrderLineItem = {
  productId?: string;
  name?: string;
  image?: string;
  size?: string;
  quantity?: number;
  price?: number;
};

export type OrderShippingAddress = {
  country?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  pinCode?: string;
  default?: boolean;
  isDefault?: boolean;
};

export type OrderItem = {
  _id?: string;
  userId?: string;
  addressId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  shippingAddress?: OrderShippingAddress[];
  items?: OrderLineItem[];
  discountCode?: string;
  subtotal?: number;
  shipping?: number;
  tax?: number;
  total?: number;
  currency?: string;
  razorpayId?: string | null;
  phonePeId?: string | null;
  paymentStatus?: string;
  orderStatus?: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type OrdersApiState = {
  page?: number;
  limit?: number;
  totalPages?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
};

export type OrdersApiData = {
  order_data?: OrderItem[];
  orders?: OrderItem[];
  totalData?: number;
  state?: OrdersApiState;
};

export type OrdersApiResponse = {
  status?: number;
  message?: string;
  data?: OrdersApiData | OrderItem[];
};

export type SingleOrderApiResponse = {
  status?: number;
  message?: string;
  data?: OrderItem;
};

export type OrdersQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  startDateFilter?: string;
  endDateFilter?: string;
};

export type CreateOrderPayload = {
  addressId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shippingAddress?: OrderShippingAddress[];
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  discountCode?: string;
  subtotal: number;
  shipping?: number;
  tax?: number;
  total: number;
  currency?: string;
  razorpayId?: string | null;
  phonePeId?: string | null;
};

export type CreateOrderResponse = Record<string, unknown>;

export type UpdateOrderShippingPayload = {
  orderId: string;
  addressId?: string;
  shippingAddress?: OrderShippingAddress[];
};

export type UpdateOrderShippingResponse = Record<string, unknown>;

export type CheckoutFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  country: string;
  state: string;
  city: string;
  pinCode: string;
  address1: string;
  address2: string;
  discountCode: string;
};
