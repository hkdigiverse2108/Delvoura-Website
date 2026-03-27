import { KEYS, URL_KEYS } from "../Constants";
import type { ChangePasswordPayload, ChangePasswordResponse, ContactUsPayload, ContactUsResponse, CreateAddressPayload, CreateAddressResponse, CreateNewsletterPayload, CreateNewsletterResponse, CreateOrderPayload, CreateOrderResponse, CreateRatingPayload, CreateRatingResponse, DeleteAddressResponse, ForgetPasswordPayload, ForgetPasswordResponse, LoginPayload, LoginResponse, ResetForgetPasswordPayload, ResetForgetPasswordResponse, SignupPayload, SignupResponse, UpdateAddressPayload, UpdateAddressResponse, UpdateOrderShippingPayload, UpdateOrderShippingResponse, UpdateUserPayload, UpdateUserResponse, VerifyOtpPayload, VerifyOtpResponse,} from "../Types";
import { Delete, Post, Put } from "./Methods/Index";
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

  // ************ Address ***********
  useCreateAddress: (token?: string, options?: AppMutationOptions<CreateAddressResponse, CreateAddressPayload>) =>useMutations<CreateAddressPayload, CreateAddressResponse>([KEYS.ADDRESS.ADD_ADDRESS], (input) => Post<CreateAddressPayload, CreateAddressResponse>(URL_KEYS.ADDRESS.ADD_ADDRESS, input, token), { invalidateQueryKeys: [[KEYS.ADDRESS.GET_ADDRESSES]], ...options },),
  useUpdateAddress: (token?: string, options?: AppMutationOptions<UpdateAddressResponse, UpdateAddressPayload>) =>useMutations<UpdateAddressPayload, UpdateAddressResponse>([KEYS.ADDRESS.UPDATE_ADDRESS], (input) => Put<UpdateAddressPayload, UpdateAddressResponse>(URL_KEYS.ADDRESS.UPDATE_ADDRESS, input, token), { invalidateQueryKeys: [[KEYS.ADDRESS.GET_ADDRESSES]], ...options },),
  useDeleteAddress: (token?: string, options?: AppMutationOptions<DeleteAddressResponse, { id: string }>) =>useMutations<{ id: string }, DeleteAddressResponse>([KEYS.ADDRESS.DELETE_ADDRESS], ({ id }) => Delete<DeleteAddressResponse, undefined>(`${URL_KEYS.ADDRESS.DELETE_ADDRESS}/${id}`, undefined, token), { invalidateQueryKeys: [[KEYS.ADDRESS.GET_ADDRESSES]], ...options },),

  // ************ Order ***********
  useCreateOrder: (token?: string, options?: AppMutationOptions<CreateOrderResponse, CreateOrderPayload>) =>useMutations<CreateOrderPayload, CreateOrderResponse>([KEYS.ORDER.ADD_ORDER], (input) => Post<CreateOrderPayload, CreateOrderResponse>(URL_KEYS.ORDER.ADD_ORDER, input, token), { invalidateQueryKeys: [[KEYS.ORDER.GET_ORDERS]], ...options },),
  useUpdateOrderShipping: (token?: string, options?: AppMutationOptions<UpdateOrderShippingResponse, UpdateOrderShippingPayload>) =>useMutations<UpdateOrderShippingPayload, UpdateOrderShippingResponse>([KEYS.ORDER.UPDATE_ORDER_SHIPPING], (input) => Put<UpdateOrderShippingPayload, UpdateOrderShippingResponse>(URL_KEYS.ORDER.UPDATE_ORDER_SHIPPING, input, token), { invalidateQueryKeys: [[KEYS.ORDER.GET_ORDERS]], ...options },),

  // ************ Newsletter ***********
  useCreateNewsletter: (options?: AppMutationOptions<CreateNewsletterResponse, CreateNewsletterPayload>) =>
    useMutations<CreateNewsletterPayload, CreateNewsletterResponse>([KEYS.NEWSLETTER.ADD_NEWSLETTER], (input) => Post<CreateNewsletterPayload, CreateNewsletterResponse>(URL_KEYS.NEWSLETTER.ADD, input), options),
};
