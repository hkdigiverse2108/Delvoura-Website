export const URL_KEYS = {
    // ============= AUTH==============
    AUTH  : {
        SIGNIN : "/auth/login",
        SIGNUP : "/auth/signup",
        VERIFY_OTP : "/auth/verify-otp",
        FORGET_PASSWORD : "/auth/forget-password",
        RESET_FORGET_PASSWORD : "/auth/reset-password"
    },

    //==============USER===============
    USER : {
        GET_SINGLE_USER_BY_ID : "/user"
    }
} as const
