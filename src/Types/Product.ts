import type { ProductItem } from "./Query";

export type ProductListState = {
  items: ProductItem[];
  totalData: number;
  state: {
    page?: number;
    limit?: number;
    totalPages?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
  } | null;
};

export type ProductState = {
  list: ProductListState;
  selected: ProductItem | null;
};

export type SetProductsPayload = {
  products?: ProductState["list"]["items"];
  totalData?: number;
  state?: ProductState["list"]["state"];
};

export type ProductReviewsProps = {
  productId?: string;
  ratingSummary?: {
    avgRating?: number;
    ratingCount?: number;
  } | null;
};
 

export type HomeFilters = {
  scent?: string;
  season?: string;
  gender?: string;
  collectionFilter?: string;
  sort?: string;
  sortByFilter?: string;
  TrendingFilter?: boolean;
};

export type UseDataGridOptions = {
  defaultFilters?: HomeFilters;
  page?: number;
  pageSize?: number;
  pagination?: boolean;
};
