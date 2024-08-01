import { BlogType } from "@makdoom/byte-common";
import { create } from "zustand";

type EditorChangeType = "title" | "subtitle" | "coverImage" | "content";
type EditorPayloadType = {
  type: EditorChangeType;
  payload: string;
};

type BlogStore = {
  isSidebarOpen: boolean;
  blogList: BlogType[];

  draftsCount: number;
  pinnedCount: number;
  publishedCount: number;

  toggleSidebar: () => void;
  setBlogs: (payload: BlogType[]) => void;
  updateDraftBlogs: (payload: BlogType) => void;
  deleteDraft: (id: string) => void;
  addIntoPinnedBlogs: (blog: string) => void;
  updateEditorHandler: (id: string, payload: EditorPayloadType) => void;
};

export const useBlogStore = create<BlogStore>((set, get) => ({
  isSidebarOpen: true,
  blogList: [],
  draftsCount: 0,
  pinnedCount: 0,
  publishedCount: 0,

  toggleSidebar: () => {
    set({ isSidebarOpen: !get().isSidebarOpen });
  },
  updateDraftBlogs: (payload) => {
    set({
      blogList: [...get().blogList, payload],
    });
  },
  setBlogs: (payload) => {
    set({
      blogList: payload,
    });
  },
  deleteDraft: (id) => {
    const blogList = get().blogList.filter((blog) => blog.id !== id);
    const draftsCount = blogList.filter((blog) => blog.isDraft).length;
    const pinnedCount = blogList.filter((blog) => blog.isPinned).length;
    const publishedCount = blogList.filter((blog) => blog.isPublished).length;

    set({
      blogList: blogList,
      draftsCount,
      pinnedCount,
      publishedCount,
    });
  },
  addIntoPinnedBlogs: (id) => {
    const blogList = get().blogList;
    const blogIndex = blogList.findIndex((blog) => blog.id === id);
    if (blogIndex > -1) {
      blogList[blogIndex] = {
        ...blogList[blogIndex],
        isPinned: !blogList[blogIndex].isPinned,
      };
    }

    set({
      blogList,
      pinnedCount: blogList.filter((blog) => blog.isPinned).length,
    });
  },
  updateEditorHandler: (type, payload) => {
    console.log(type, payload);
  },
}));
