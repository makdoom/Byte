import { create } from "zustand";

type User = {
  id: string;
  email: string;
  name: string;
};

type authStore = {
  isLoading: boolean;
  isLoggedIn: boolean;
  user: User | null;

  setLoading: (loading: boolean) => void;
  setUserInfo: (user: User) => void;
  logoutUser: () => void;
};

export const useAuthStore = create<authStore>((set) => ({
  isLoading: false,
  isLoggedIn: localStorage.getItem("accessToken") !== null,
  user: null,

  setLoading: (payload: boolean) => {
    set({ isLoading: payload });
  },
  setUserInfo: (userPayload: User) => {
    set({ user: userPayload, isLoggedIn: true });
  },
  logoutUser: () => {
    if (localStorage.getItem("accessToken")) {
      localStorage.removeItem("accessToken");
    }
    set({ isLoggedIn: false, user: null });
  },
}));
