import { KEYS, URL_KEYS } from "../Constants";
import type { AddressesApiResponse, AddressesQueryParams, BlogsApiResponse, BlogsQueryParams, CollectionsApiResponse, CollectionsQueryParams, ProductsApiResponse, ProductsQueryParams, RatingsApiResponse, RatingsQueryParams, ScentsApiResponse, ScentsQueryParams, SeasonsApiResponse, SeasonsQueryParams, SingleAddressApiResponse, SingleBlogApiResponse, SingleProductApiResponse, SingleUserApiResponse, TopbarApiResponse } from "../Types";
import { Get } from "./Methods/Index";
import { useQueries } from "./ReactQuery/Index";



export const Queries = {
  
  // ************ User ***********
  useGetSingleUser: (id?: string) =>useQueries<SingleUserApiResponse>([KEYS.USER.GET_SINGLE_USER_BY_ID, id],() =>Get<SingleUserApiResponse>(`${URL_KEYS.USER.GET_SINGLE_USER_BY_ID}/${id}`, ),{ enabled: !!id },),

  // ************ Collection ***********
  useGetCollections: (params?: CollectionsQueryParams) =>useQueries<CollectionsApiResponse>([KEYS.COLLECTION.GET_COLLECTIONS, params],() => Get<CollectionsApiResponse>(URL_KEYS.COLLECTION.GET_COLLECTIONS, params),),

  // ************ Product ***********
  useGetProducts: (params?: ProductsQueryParams) =>useQueries<ProductsApiResponse>([KEYS.PRODUCT.GET_PRODUCTS, params],() => Get<ProductsApiResponse>(URL_KEYS.PRODUCT.GET_PRODUCTS, params),),
  useGetProductById: (id?: string) =>useQueries<SingleProductApiResponse>([KEYS.PRODUCT.GET_PRODUCT_BY_ID, id],() => Get<SingleProductApiResponse>(`${URL_KEYS.PRODUCT.GET_PRODUCT_BY_ID}/${id}`),{ enabled: !!id },),

  // ************ Rating ***********
  useGetRatings: (params?: RatingsQueryParams) => useQueries<RatingsApiResponse>( [KEYS.RATING.GET_RATINGS, params], () => Get<RatingsApiResponse>(URL_KEYS.RATING.GET_RATINGS, params), { enabled: !!params?.productId },),

  // ************ Scent ***********
  useGetScents: (params?: ScentsQueryParams) => useQueries<ScentsApiResponse>([KEYS.SCENT.GET_SCENTS, params], () => Get<ScentsApiResponse>(URL_KEYS.SCENT.GET_SCENTS, params),),

  // ************ Season ***********
  useGetSeasons: (params?: SeasonsQueryParams) => useQueries<SeasonsApiResponse>([KEYS.SEASON.GET_SEASONS, params], () => Get<SeasonsApiResponse>(URL_KEYS.SEASON.GET_SEASONS, params),),

  // ************ Topbar ***********
  useGetTopbar: () => useQueries<TopbarApiResponse>([KEYS.TOPBAR.GET_TOPBAR], () => Get<TopbarApiResponse>(URL_KEYS.TOPBAR.GET_TOPBAR),),

  // ************ Blog ***********
  useGetBlogs: (params?: BlogsQueryParams) => useQueries<BlogsApiResponse>([KEYS.BLOG.GET_BLOGS, params], () => Get<BlogsApiResponse>(URL_KEYS.BLOG.GET_BLOGS, params),),
  useGetBlogById: (id?: string) => useQueries<SingleBlogApiResponse>([KEYS.BLOG.GET_BLOG_BY_ID, id], () => Get<SingleBlogApiResponse>(`${URL_KEYS.BLOG.GET_BLOG_BY_ID}/${id}`), { enabled: !!id },),

  // ************ Address ***********
  useGetAddresses: (params?: AddressesQueryParams, token?: string) =>
    useQueries<AddressesApiResponse>([KEYS.ADDRESS.GET_ADDRESSES, params, token], () => Get<AddressesApiResponse>(URL_KEYS.ADDRESS.GET_ADDRESSES, params, undefined, token), { enabled: !!token },),
  useGetAddressById: (id?: string, token?: string) =>
    useQueries<SingleAddressApiResponse>([KEYS.ADDRESS.GET_ADDRESS_BY_ID, id, token], () => Get<SingleAddressApiResponse>(`${URL_KEYS.ADDRESS.GET_ADDRESS_BY_ID}/${id}`, undefined, undefined, token), { enabled: !!id && !!token },),
};
