export type RatingItem = {
  _id?: string;
  productId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  description?: string;
  starRating?: number;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type RatingsApiResponse = {
  status?: number;
  message?: string;
  data?: {
    rating_data?: RatingItem[];
    totalData?: number;
    state?: {
      page?: number;
      limit?: number;
      totalPages?: number;
      hasNext?: boolean;
      hasPrev?: boolean;
    };
  };
};

export type RatingsQueryParams = {
  productId: string;
  page?: number;
  limit?: number;
  search?: string;
  startDateFilter?: string;
  endDateFilter?: string;
};

export type CreateRatingPayload = {
  productId: string;
  firstName: string;
  lastName: string;
  email: string;
  description?: string;
  starRating: number;
};

export type CreateRatingResponse = {
  status?: number;
  message?: string;
  data?: RatingItem;
};
