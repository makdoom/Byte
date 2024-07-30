import { BlogListType, BlogType } from "@makdoom/byte-common";
import { create } from "zustand";

type BlogStore = {
  isSidebarOpen: boolean;
  drafts: BlogType[];
  pinned: BlogType[];
  published: BlogType[];

  toggleSidebar: () => void;
  setBlogs: (payload: BlogListType) => void;
  updateDraftBlogs: (payload: BlogType) => void;
  deleteDraft: (id: string) => void;
  addIntoPinnedBlogs: (blog: BlogType) => void;
};

export const useBlogStore = create<BlogStore>((set, get) => ({
  isSidebarOpen: true,
  drafts: [],
  pinned: [],
  published: [],

  toggleSidebar: () => {
    set({ isSidebarOpen: !get().isSidebarOpen });
  },
  updateDraftBlogs: (payload: BlogType) => {
    set({
      drafts: [...get().drafts, payload],
    });
  },
  setBlogs: (payload: BlogListType) => {
    set({
      drafts: payload.drafts,
      pinned: payload.pinned,
      published: payload.published,
    });
  },
  deleteDraft: (id: string) => {
    set({ drafts: get().drafts.filter((blog) => blog.id !== id) });
  },
  addIntoPinnedBlogs: (blog: BlogType) => {
    const localDrafts = get().drafts;
    const blogIdx = localDrafts.findIndex(
      (singleBlog) => singleBlog.id === blog.id
    );
    if (blogIdx > -1) {
      localDrafts[blogIdx] = blog;
    }
    set({ drafts: localDrafts, pinned: [...get().pinned, blog] });
  },
}));
