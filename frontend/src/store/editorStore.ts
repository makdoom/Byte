import { create } from "zustand";

type EditorStore = {
  isSidebarOpen: boolean;

  toggleSidebar: () => void;
};

export const useEditorStore = create<EditorStore>((set, get) => ({
  isSidebarOpen: true,

  toggleSidebar: () => {
    set({ isSidebarOpen: !get().isSidebarOpen });
  },
}));
