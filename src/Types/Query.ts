//============Users type==============
export type SingleUserApiResponse = Record<string, unknown>;


//============Collections type==============
export type CollectionItem = {
  _id?: string;
  name?: string;
  image?: string;
  imageUrl?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type CollectionsApiResponse = {
  status?: number;
  message?: string;
  data?: {
    collection_data?: CollectionItem[];
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

export type CollectionsQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  startDateFilter?: string;
  endDateFilter?: string;
};

//============Products type==============
export type ProductItem = {
  _id?: string;
  name?: string;
  title?: string;
  images?: string[];
  coverimage?: string;
  price?: number;
  mrp?: number;
  seasonIds?: { _id?: string; name?: string }[];
  gender?: string;
  collectionIds?: { _id?: string; name?: string }[];
  variants?: string[];
  ingredients?: string[];
  description?: string;
  scentIds?: { _id?: string; name?: string }[];
  usageTips?: string;
  scentStory?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  slug?: string;
  isTrending?: boolean;
  brandManufacturerInfo?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  ratingSummary?: {
    avgRating?: number;
    ratingCount?: number;
  };
};

export type ProductsApiResponse = {
  status?: number;
  message?: string;
  data?: {
    product_data?: ProductItem[];
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

export type SingleProductApiResponse = {
  status?: number;
  message?: string;
  data?: ProductItem;
};

export type ProductsQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  startDateFilter?: string;
  endDateFilter?: string;
  collectionFilter?: string;
  seasonFilter?: string;
  scentFilter?: string;
  genderFilter?: string;
  TrendingFilter?: boolean;
};
