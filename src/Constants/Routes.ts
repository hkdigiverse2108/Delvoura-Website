export const ROUTES = {
    //==============HERO===============
    HERO: "/",
    
    //==============COLLECTION===============
    COLLECTIONS_ALL: "/collections/all",
    PRODUCT_DETAILS: "/products/:id",
    getProductDetails: (id: string) => `/products/${id}`,
    //==============CONTACT===============
    CONTACT: "/contact",
    //==============POLICIES===============
    SHIPPING: "/shipping",
    RETURNS_EXCHANGES: "/returns-and-exchanges",
    PRIVACY_POLICY: "/privacy-policy",
    TERMS_CONDITIONS: "/terms-and-conditions",
    REFUND_POLICY: "/refund-policy",
    TERMS_OF_SERVICE: "/terms-of-service",
    //==============PROFILE===============
    PROFILE: "/profile",
    //==============BLOG===============
    BLOG: "/blog",
    BLOG_DETAILS: "/blog/:id",

    //==============AUTH===============
    AUTH : {
        AUTHETICATION : "/authentication"
    }
}
