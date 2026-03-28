export const KEYS = {
  //========Auth=========
  AUTH: {
    SIGNIN: "signin",
    SIGNUP: "signup",
    VERIFY_OTP: "verify-otp",
    FORGET_PASSWORD: "forget-password",
    RESET_FORGET_PASSWORD: "reset-forget-password",
    CHANGE_PASSWORD: "change-password",
  },

  //========User=========
  USER: {
    GET_SINGLE_USER_BY_ID: "get-single-user-by-id",
    UPDATE_USER: "update-user",
  },

  //========Collections=========
  COLLECTION: {
    GET_COLLECTIONS: "get-collections",
  },

  //========Products=========
  PRODUCT: {
    GET_PRODUCTS: "get-products",
    GET_PRODUCT_BY_ID: "get-product-by-id",
  },

  //========Ratings=========
  RATING: {
    GET_RATINGS: "get-ratings",
    ADD_RATING: "add-rating",
  },

  //========Scent=========
  SCENT: {
    GET_SCENTS: "get-scents",
  },

  //========Season=========
  SEASON: {
    GET_SEASONS: "get-seasons",
  },

  //========Topbar=========
  TOPBAR: {
    GET_TOPBAR: "get-topbar",
  },

  //========Blog=========
  BLOG: {
    GET_BLOGS: "get-blogs",
    GET_BLOG_BY_ID: "get-blog-by-id",
  },

  //========Contact=========
  CONTACT_US: {
    ADD: "contact-us-add",
  },

  //========Address=========
  ADDRESS: {
    GET_ADDRESSES: "get-addresses",
    GET_ADDRESS_BY_ID: "get-address-by-id",
    ADD_ADDRESS: "add-address",
    UPDATE_ADDRESS: "update-address",
    DELETE_ADDRESS: "delete-address",
  },

  //========Order=========
  ORDER: {
    GET_ORDERS: "get-orders",
    GET_ORDER_BY_ID: "get-order-by-id",
    ADD_ORDER: "add-order",
    UPDATE_ORDER_SHIPPING: "update-order-shipping",
  },

  //========Newsletter=========
  NEWSLETTER: {
    ADD_NEWSLETTER: "add-newsletter",
  },

  //========Policy=========
  POLICY: {
    GET_TERMS_OF_SERVICE: "get-terms-of-service",
    GET_TERMS_CONDITIONS: "get-terms-conditions",
    GET_REFUND_POLICY: "get-refund-policy",
    GET_PRIVACY_POLICY: "get-privacy-policy",
    GET_RETURN_EXCHANGE: "get-return-exchange",
  },
} as const;
