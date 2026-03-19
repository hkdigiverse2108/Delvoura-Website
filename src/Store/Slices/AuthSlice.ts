import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../Constants";
import type { AuthState, SigninPayload } from "../../Types";
import { notifySuccess } from "../../Attribute";


const safeJsonParse = (value: string | null) => {
  if (!value) return null;
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
};

const getStoredToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

const getStoredUser = () => {
  if (typeof window === "undefined") return null;
  return safeJsonParse(localStorage.getItem(STORAGE_KEYS.USER));
};

const storedToken = getStoredToken();
const storedUser = getStoredUser();

const initialState: AuthState = {
  token: storedToken,
  user: storedUser,
  isAuthenticated: !!storedToken,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignin: (state, action: PayloadAction<SigninPayload>) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.user = action.payload.user ?? null;
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.TOKEN, action.payload.token);
        if (action.payload.user) {
          localStorage.setItem(
            STORAGE_KEYS.USER,
            JSON.stringify(action.payload.user),
          );
        } else {
          localStorage.removeItem(STORAGE_KEYS.USER);
        }
      }
    },
    setUser: (state, action: PayloadAction<unknown>) => {
      state.user = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(action.payload));
      }
    },
    setSignOut: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        notifySuccess("Signed out successfully");
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    },
  },
});

export const { setSignOut, setUser, setSignin } = authSlice.actions;
export default authSlice.reducer;
