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
  variants?: Array<
    | string
    | {
        size?: string;
        price?: number;
        mrp?: number;
      }
  >;
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
  sortByFilter?: string;
};

//============Scents type==============
export type ScentItem = {
  _id?: string;
  name?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type ScentsApiResponse = {
  status?: number;
  message?: string;
  data?: {
    scent_data?: ScentItem[];
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

export type ScentsQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  startDateFilter?: string;
  endDateFilter?: string;
  ActiveFilter?: boolean;
  status?: "active" | "inactive";
};

//============Seasons type==============
export type SeasonItem = {
  _id?: string;
  name?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type SeasonsApiResponse = {
  status?: number;
  message?: string;
  data?: {
    season_data?: SeasonItem[];
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

export type SeasonsQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  startDateFilter?: string;
  endDateFilter?: string;
  ActiveFilter?: boolean;
  status?: "active" | "inactive";
};

//============Topbar type==============
export type TopbarItem = {
  _id?: string;
  topbarItems?: string[];
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type TopbarApiResponse = {
  status?: number;
  message?: string;
  data?: TopbarItem | { topbarItems?: string[]; topbar_data?: TopbarItem[] };
};
