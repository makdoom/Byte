import { BlogType } from "@makdoom/byte-common";
import { create } from "zustand";

type EditorChangeType = "title" | "subtitle" | "coverImage" | "content";
type EditorPayloadType = {
  type: EditorChangeType;
  data: string;
};

type BlogStore = {
  isSidebarOpen: boolean;
  blogList: BlogType[];

  draftsCount: number;
  pinnedCount: number;
  publishedCount: number;
  wordsCount: number;
  charCount: number;

  toggleSidebar: () => void;
  setBlogs: (payload: BlogType[]) => void;
  updateDraftBlogs: (payload: BlogType) => void;
  deleteDraft: (id: string) => void;
  addIntoPinnedBlogs: (blog: string) => void;
  updateEditorHandler: (id: string, payload: EditorPayloadType) => void;
  updateBlogWordCharCount: (wordsCount: number, charCount: number) => void;
};

export const useBlogStore = create<BlogStore>((set, get) => ({
  isSidebarOpen: true,
  blogList: [],
  draftsCount: 0,
  pinnedCount: 0,
  publishedCount: 0,
  wordsCount: 0,
  charCount: 0,

  toggleSidebar: () => {
    set({ isSidebarOpen: !get().isSidebarOpen });
  },
  updateDraftBlogs: (payload) => {
    set({
      blogList: [payload, ...get().blogList],
    });
  },
  setBlogs: (payload) => {
    const draftsCount = payload.filter((blog) => blog.isDraft).length;
    const pinnedCount = payload.filter((blog) => blog.isPinned).length;
    const publishedCount = payload.filter((blog) => blog.isPublished).length;
    set({
      blogList: payload,
      draftsCount,
      pinnedCount,
      publishedCount,
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
  updateEditorHandler: (id, payload) => {
    const blogList = get().blogList;
    const blogIdxToUpdate = blogList.findIndex((blog) => blog.id === id);
    if (blogIdxToUpdate > -1) {
      blogList[blogIdxToUpdate] = {
        ...blogList[blogIdxToUpdate],
        [payload.type]: payload.data,
      };
    }

    set({ blogList });
  },

  updateBlogWordCharCount: (wordsCount, charCount) => {
    set({ wordsCount, charCount });
  },
}));
