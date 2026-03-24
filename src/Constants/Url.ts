export const URL_KEYS = {
    // ============= AUTH==============
    AUTH  : {
        SIGNIN : "/auth/login",
        SIGNUP : "/auth/signup",
        VERIFY_OTP : "/auth/verify-otp",
        FORGET_PASSWORD : "/auth/forgot-password",
        RESET_FORGET_PASSWORD : "/auth/reset-password"
    },

    //==============USER===============
    USER : {
        GET_SINGLE_USER_BY_ID : "/user"
    },

    //==============COLLECTION===============
    COLLECTION: {
        GET_COLLECTIONS: "/collection"
    },

    //==============PRODUCT===============
    PRODUCT: {
        GET_PRODUCTS: "/product",
        GET_PRODUCT_BY_ID: "/product"
    },

    //==============RATING===============
    RATING: {
        GET_RATINGS: "/rating",
        ADD_RATING: "/rating/add"
    },

    //==============SCENT===============
    SCENT: {
        GET_SCENTS: "/scent"
    },

    //==============SEASON===============
    SEASON: {
        GET_SEASONS: "/season"
    },
} as const
