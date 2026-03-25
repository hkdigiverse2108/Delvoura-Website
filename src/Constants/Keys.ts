export const KEYS = {
  //========Auth=========
  AUTH: {
    SIGNIN: "signin",
    SIGNUP: "signup",
    VERIFY_OTP: "verify-otp",
    FORGET_PASSWORD: "forget-password",
    RESET_FORGET_PASSWORD: "reset-forget-password",
  },

  //========User=========
  USER: {
    GET_SINGLE_USER_BY_ID: "get-single-user-by-id",
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

  //========Contact=========
  CONTACT_US: {
    ADD: "contact-us-add",
  },
} as const;
