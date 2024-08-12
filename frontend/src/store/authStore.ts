import { create } from "zustand";

type User = {
  id: string;
  email: string;
  name: string;
  username: string;
  initials?: string;
};

type DefaultPage = "home" | "feeds";

type authStore = {
  isLoading: boolean;
  isLoggedIn: boolean;
  defaultPage: DefaultPage;
  user: User | null;

  setLoading: (loading: boolean) => void;
  setDefaultPage: (page: DefaultPage) => void;
  setUserInfo: (user: User) => void;
  logoutUser: () => void;
};

export const useAuthStore = create<authStore>((set) => ({
  isLoading: false,
  defaultPage: "home",
  isLoggedIn: localStorage.getItem("accessToken") !== null,
  user: null,

  setLoading: (payload: boolean) => {
    set({ isLoading: payload });
  },
  setDefaultPage: (page: DefaultPage) => {
    set({ defaultPage: page });
  },
  setUserInfo: (userPayload: User) => {
    const initials = `${userPayload?.initials
      ?.split(" ")
      ?.at(0)
      ?.toUpperCase()}${userPayload?.initials
      ?.split(" ")
      ?.at(1)
      ?.toUpperCase()}`;

    set({ user: { ...userPayload, initials }, isLoggedIn: true });
  },
  logoutUser: () => {
    if (localStorage.getItem("accessToken")) {
      localStorage.removeItem("accessToken");
    }
    set({ isLoggedIn: false, user: null, defaultPage: "home" });
  },
}));
