import { KEYS, URL_KEYS } from "../Constants";
import type { AddressesApiResponse, AddressesQueryParams, BannerApiResponse, BlogsApiResponse, BlogsQueryParams, CollectionsApiResponse, CollectionsQueryParams, InstagramApiResponse, InstagramQueryParams, OrdersApiResponse, OrdersQueryParams, PhonepeOrderStatusResponse, PrivacyPolicyApiResponse, ProductsApiResponse, ProductsQueryParams, RatingsApiResponse, RatingsQueryParams, RazorpayOrderStatusResponse, RefundPolicyApiResponse, ReturnExchangeApiResponse, ScentsApiResponse, ScentsQueryParams, SeasonsApiResponse, SeasonsQueryParams, SettingsApiResponse, SingleAddressApiResponse, SingleBlogApiResponse, SingleOrderApiResponse, SingleProductApiResponse, SingleUserApiResponse, TermsConditionsApiResponse, TermsServiceApiResponse, TopbarApiResponse } from "../Types";
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

  // ************ Settings ***********
  useGetSettings: () => useQueries<SettingsApiResponse>([KEYS.SETTINGS.GET_SETTINGS], () => Get<SettingsApiResponse>(URL_KEYS.SETTINGS.GET_SETTINGS),),

  // ************ Instagram ***********
  useGetInstagrams: (params?: InstagramQueryParams) => useQueries<InstagramApiResponse>([KEYS.INSTAGRAM.GET_INSTAGRAMS, params], () => Get<InstagramApiResponse>(URL_KEYS.INSTAGRAM.GET_INSTAGRAMS, params),),

  // ************ Policy ***********
  useGetTermsService: () => useQueries<TermsServiceApiResponse>([KEYS.POLICY.GET_TERMS_OF_SERVICE], () => Get<TermsServiceApiResponse>(URL_KEYS.POLICY.GET_TERMS_OF_SERVICE),),
  useGetTermsConditions: () => useQueries<TermsConditionsApiResponse>([KEYS.POLICY.GET_TERMS_CONDITIONS], () => Get<TermsConditionsApiResponse>(URL_KEYS.POLICY.GET_TERMS_CONDITIONS),),
  useGetRefundPolicy: () => useQueries<RefundPolicyApiResponse>([KEYS.POLICY.GET_REFUND_POLICY], () => Get<RefundPolicyApiResponse>(URL_KEYS.POLICY.GET_REFUND_POLICY),),
  useGetPrivacyPolicy: () => useQueries<PrivacyPolicyApiResponse>([KEYS.POLICY.GET_PRIVACY_POLICY], () => Get<PrivacyPolicyApiResponse>(URL_KEYS.POLICY.GET_PRIVACY_POLICY),),
  useGetReturnExchange: () => useQueries<ReturnExchangeApiResponse>([KEYS.POLICY.GET_RETURN_EXCHANGE], () => Get<ReturnExchangeApiResponse>(URL_KEYS.POLICY.GET_RETURN_EXCHANGE),),

  // ************ Blog ***********
  useGetBlogs: (params?: BlogsQueryParams) => useQueries<BlogsApiResponse>([KEYS.BLOG.GET_BLOGS, params], () => Get<BlogsApiResponse>(URL_KEYS.BLOG.GET_BLOGS, params),),
  useGetBlogById: (id?: string) => useQueries<SingleBlogApiResponse>([KEYS.BLOG.GET_BLOG_BY_ID, id], () => Get<SingleBlogApiResponse>(`${URL_KEYS.BLOG.GET_BLOG_BY_ID}/${id}`), { enabled: !!id },),

  // ************ Banner ***********
  useGetBanner: () => useQueries<BannerApiResponse>([KEYS.BANNER.GET_BANNER], () => Get<BannerApiResponse>(URL_KEYS.BANNER.GET_BANNER),),

  // ************ Address ***********
  useGetAddresses: (params?: AddressesQueryParams, token?: string) =>  useQueries<AddressesApiResponse>([KEYS.ADDRESS.GET_ADDRESSES, params, token], () => Get<AddressesApiResponse>(URL_KEYS.ADDRESS.GET_ADDRESSES, params, undefined, token), { enabled: !!token },),
  useGetAddressById: (id?: string, token?: string) =>  useQueries<SingleAddressApiResponse>([KEYS.ADDRESS.GET_ADDRESS_BY_ID, id, token], () => Get<SingleAddressApiResponse>(`${URL_KEYS.ADDRESS.GET_ADDRESS_BY_ID}/${id}`, undefined, undefined, token), { enabled: !!id && !!token },),

  // ************ Order ***********
  useGetOrders: (params?: OrdersQueryParams, token?: string) => useQueries<OrdersApiResponse>([KEYS.ORDER.GET_ORDERS, params, token], () => Get<OrdersApiResponse>(URL_KEYS.ORDER.GET_ORDERS, params, undefined, token), { enabled: !!token },),
  useGetOrderById: (id?: string, token?: string) => useQueries<SingleOrderApiResponse>([KEYS.ORDER.GET_ORDER_BY_ID, id, token], () => Get<SingleOrderApiResponse>(`${URL_KEYS.ORDER.GET_ORDER_BY_ID}/${id}`, undefined, undefined, token), { enabled: !!id && !!token },),

  // ************ Payment ***********
  useGetRazorpayOrderStatus: (razorpayOrderId?: string, token?: string) => useQueries<RazorpayOrderStatusResponse>([KEYS.PAYMENT.RAZORPAY_ORDER_STATUS, razorpayOrderId, token], () => Get<RazorpayOrderStatusResponse>(`${URL_KEYS.PAYMENT.RAZORPAY_ORDER_STATUS}/${razorpayOrderId}/status`, undefined, undefined, token), { enabled: !!razorpayOrderId && !!token },),
  useGetRazorpayOrderStatusByOrder: (orderId?: string, token?: string) => useQueries<RazorpayOrderStatusResponse>([KEYS.PAYMENT.RAZORPAY_ORDER_STATUS_BY_ORDER, orderId, token], () => Get<RazorpayOrderStatusResponse>(`${URL_KEYS.PAYMENT.RAZORPAY_ORDER_STATUS_BY_ORDER}/${orderId}/status`, undefined, undefined, token), { enabled: !!orderId && !!token },),
  useGetPhonepeOrderStatus: (merchantOrderId?: string, token?: string) => useQueries<PhonepeOrderStatusResponse>([KEYS.PAYMENT.PHONEPE_ORDER_STATUS, merchantOrderId, token], () => Get<PhonepeOrderStatusResponse>(`${URL_KEYS.PAYMENT.PHONEPE_ORDER_STATUS}/${merchantOrderId}/status`, undefined, undefined, token), { enabled: !!merchantOrderId && !!token },),
};
