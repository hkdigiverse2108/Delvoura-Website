import { KEYS, URL_KEYS } from "../Constants";
import { Get } from "./Methods/Index";
import { useQueries } from "./ReactQuery/Index";

export type SingleUserApiResponse = Record<string, unknown>;

export const Queries = {
  
  // ************ User ***********
  useGetSingleUser: (id?: string) =>useQueries<SingleUserApiResponse>([KEYS.USER.GET_SINGLE_USER_BY_ID, id],() =>Get<SingleUserApiResponse>(`${URL_KEYS.USER.GET_SINGLE_USER_BY_ID}/${id}`, ),{ enabled: !!id },),
};
