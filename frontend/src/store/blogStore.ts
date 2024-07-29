import { BlogListType, BlogType } from "@makdoom/byte-common";
import { create } from "zustand";

type BlogStore = {
  isSidebarOpen: boolean;
  drafts: BlogType[];
  pinned: BlogType[];
  published: BlogType[];

  toggleSidebar: () => void;
  setBlogs: (payload: BlogListType) => void;
};

export const useBlogStore = create<BlogStore>((set, get) => ({
  isSidebarOpen: true,
  drafts: [],
  pinned: [],
  published: [],

  toggleSidebar: () => {
    set({ isSidebarOpen: !get().isSidebarOpen });
  },
  setBlogs: (payload: BlogListType) => {
    set({
      drafts: payload.drafts,
      pinned: payload.pinned,
      published: payload.published,
    });
  },
}));
