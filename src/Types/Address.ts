export type AddressItem = {
  _id?: string;
  userId?: string;
  country?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  pinCode?: string;
  isDefault?: boolean;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type AddressesApiState = {
  page?: number;
  limit?: number;
  totalPages?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
};

export type AddressesApiData = {
  address_data?: AddressItem[];
  addresses?: AddressItem[];
  totalData?: number;
  state?: AddressesApiState;
};

export type AddressesApiResponse = {
  status?: number;
  message?: string;
  data?: AddressesApiData | AddressItem[];
};

export type SingleAddressApiResponse = {
  status?: number;
  message?: string;
  data?: AddressItem;
};

export type AddressesQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  ActiveFilter?: boolean;
  status?: "active" | "inactive";
  startDateFilter?: string;
  endDateFilter?: string;
};

export type CreateAddressPayload = {
  country: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  pinCode: string;
  isDefault?: boolean;
  isActive?: boolean;
};

export type CreateAddressResponse = Record<string, unknown>;

export type UpdateAddressPayload = {
  addressId: string;
  country?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  pinCode?: string;
  isDefault?: boolean;
  isActive?: boolean;
};

export type UpdateAddressResponse = Record<string, unknown>;

export type DeleteAddressResponse = Record<string, unknown>;
