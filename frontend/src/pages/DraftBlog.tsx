import { Editor } from "@/components/Editor";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { getRequest } from "@/config/api";
import { useAuthStore, useBlogStore } from "@/store";
import { AllBlogResSchema, AllBlogResType } from "@makdoom/byte-common";
import { useLayoutEffect } from "react";
import { toast } from "sonner";

export const DraftBlog = () => {
  const { user } = useAuthStore();
  const { setBlogs, blogList } = useBlogStore();

  useLayoutEffect(() => {
    if (user && !blogList.length) {
      (async () => {
        try {
          const response = await getRequest<AllBlogResType>(
            "/blogs/drafts",
            AllBlogResSchema
          );
          const { statusCode, message, data } = response;
          if (statusCode === 200 && data) {
            setBlogs(data);
          } else {
            toast.error(message);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [user, setBlogs, blogList]);

  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <Editor />
    </div>
  );
};
