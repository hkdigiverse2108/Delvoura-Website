export const URL_KEYS = {
    // ============= AUTH==============
    AUTH  : {
        SIGNIN : "/auth/login",
        SIGNUP : "/auth/signup",
        VERIFY_OTP : "/auth/verify-otp",
        FORGET_PASSWORD : "/auth/forgot-password",
        RESET_FORGET_PASSWORD : "/auth/reset-password",
        CHANGE_PASSWORD : "/auth/change-password"
    },

    //==============USER===============
    USER : {
        GET_SINGLE_USER_BY_ID : "/user",
        UPDATE_USER : "/user/edit"
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

    //==============TOPBAR===============
    TOPBAR: {
        GET_TOPBAR: "/topbar"
    },

    //==============BLOG===============
    BLOG: {
        GET_BLOGS: "/blog",
        GET_BLOG_BY_ID: "/blog"
    },

    //==============CONTACT===============
    CONTACT_US: {
        ADD: "/contact-us/add"
    },
} as const
