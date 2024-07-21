import { create } from "zustand";

type User = {
  firstname: string;
  email: string;
};

type authStore = {
  isLoggedIn: boolean;
  user: User | null;

  setUserInfo: (user: User) => void;
  logoutUser: () => void;
};

export const useAuthStore = create<authStore>((set) => ({
  isLoggedIn: localStorage.getItem("token") !== null,
  user: null,

  setUserInfo: (userPayload: User) => {
    set({ user: userPayload, isLoggedIn: true });
  },
  logoutUser: () => {
    if (localStorage.getItem("token")) localStorage.removeItem("token");
    set({ isLoggedIn: false, user: null });
  },
}));
