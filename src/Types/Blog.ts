export type BlogItem = {
  _id?: string;
  title?: string;
  content?: string;
  image?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type BlogsApiResponse = {
  status?: number;
  message?: string;
  data?: {
    blog_data?: BlogItem[];
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

export type SingleBlogApiResponse = {
  status?: number;
  message?: string;
  data?: BlogItem;
};

export type BlogsQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  startDateFilter?: string;
  endDateFilter?: string;
};

export type BlogDetailsProps = {
  post: BlogItem;
  onBack?: () => void;
  backTo?: string;
};
