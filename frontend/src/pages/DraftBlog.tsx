import { Editor } from "@/components/Editor";
import { Sidebar } from "@/components/Sidebar";

export const DraftBlog = () => {
  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <Editor />
    </div>
  );
};
