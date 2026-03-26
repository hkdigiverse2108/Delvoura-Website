import { KEYS, URL_KEYS } from "../Constants";
import type { ChangePasswordPayload, ChangePasswordResponse, ContactUsPayload, ContactUsResponse, CreateRatingPayload, CreateRatingResponse, ForgetPasswordPayload, ForgetPasswordResponse, LoginPayload, LoginResponse, ResetForgetPasswordPayload, ResetForgetPasswordResponse, SignupPayload, SignupResponse, UpdateUserPayload, UpdateUserResponse, VerifyOtpPayload, VerifyOtpResponse,} from "../Types";
import { Post, Put } from "./Methods/Index";
import { useMutations, type AppMutationOptions } from "./ReactQuery/Index";

export const Mutations = {
  // ************ Auth ***********
  useSignin: () => useMutations<LoginPayload, LoginResponse>([KEYS.AUTH.SIGNIN], (input) =>Post<LoginPayload, LoginResponse>(URL_KEYS.AUTH.SIGNIN, input),),
  useSignup: () =>useMutations<SignupPayload, SignupResponse>([KEYS.AUTH.SIGNUP], (input) =>Post<SignupPayload, SignupResponse>(URL_KEYS.AUTH.SIGNUP, input),),
  useVerifyOtp: () =>useMutations<VerifyOtpPayload, VerifyOtpResponse>([KEYS.AUTH.VERIFY_OTP], (input) =>Post<VerifyOtpPayload, VerifyOtpResponse>(URL_KEYS.AUTH.VERIFY_OTP, input),),
  useForgetPassword: () =>useMutations<ForgetPasswordPayload, ForgetPasswordResponse>([KEYS.AUTH.FORGET_PASSWORD], (input) =>Post<ForgetPasswordPayload, ForgetPasswordResponse>(URL_KEYS.AUTH.FORGET_PASSWORD, input),),
  useResetForgetPassword: () =>useMutations<ResetForgetPasswordPayload, ResetForgetPasswordResponse>([KEYS.AUTH.RESET_FORGET_PASSWORD],(input) => Post<ResetForgetPasswordPayload, ResetForgetPasswordResponse>(URL_KEYS.AUTH.RESET_FORGET_PASSWORD, input),),
  useChangePassword: (token?: string) => useMutations<ChangePasswordPayload, ChangePasswordResponse>([KEYS.AUTH.CHANGE_PASSWORD], (input) =>Post<ChangePasswordPayload, ChangePasswordResponse>(URL_KEYS.AUTH.CHANGE_PASSWORD, input, token),),

  // ************ Rating ***********
  useCreateRating: (options?: AppMutationOptions<CreateRatingResponse, CreateRatingPayload>) => useMutations<CreateRatingPayload, CreateRatingResponse>( [KEYS.RATING.ADD_RATING], (input) => Post<CreateRatingPayload, CreateRatingResponse>(URL_KEYS.RATING.ADD_RATING, input), options,),

  // ************ Contact ***********
  useContactUs: (options?: AppMutationOptions<ContactUsResponse, ContactUsPayload>) => useMutations<ContactUsPayload, ContactUsResponse>([KEYS.CONTACT_US.ADD], (input) => Post<ContactUsPayload, ContactUsResponse>(URL_KEYS.CONTACT_US.ADD, input), options,),

  // ************ User ***********
  useUpdateUser: (options?: AppMutationOptions<UpdateUserResponse, UpdateUserPayload>) =>useMutations<UpdateUserPayload, UpdateUserResponse>([KEYS.USER.UPDATE_USER],(input) => Put<UpdateUserPayload, UpdateUserResponse>(URL_KEYS.USER.UPDATE_USER, input),options,),
};
