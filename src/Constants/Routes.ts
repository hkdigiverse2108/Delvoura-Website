export const ROUTES = {
    HERO: "/",
    
    COLLECTIONS_ALL: "/collections/all",
    PRODUCT_DETAILS: "/products/:id",
    getProductDetails: (id: string) => `/products/${id}`,
    CONTACT: "/contact",
    SHIPPING: "/shipping",
    RETURNS_EXCHANGES: "/returns-and-exchanges",
    PRIVACY_POLICY: "/privacy-policy",
    TERMS_CONDITIONS: "/terms-and-conditions",
    REFUND_POLICY: "/refund-policy",
    TERMS_OF_SERVICE: "/terms-of-service",

    AUTH : {
        AUTHETICATION : "/authentication"
    }
}
