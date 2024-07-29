import { Editor } from "@/components/Editor";
import { Sidebar } from "@/components/Sidebar";
import { getRequest } from "@/config/api";
import { useAuthStore, useBlogStore } from "@/store";
import { AllBlogResSchema, AllBlogResType } from "@makdoom/byte-common";
import { useLayoutEffect } from "react";
import { toast } from "sonner";

export const DraftBlog = () => {
  const { user } = useAuthStore();
  const { setBlogs } = useBlogStore();

  useLayoutEffect(() => {
    if (user) {
      (async () => {
        try {
          const response = await getRequest<AllBlogResType>(
            "/blogs/all-blogs",
            AllBlogResSchema
          );
          const { statusCode, message, data } = response;
          if (statusCode === 200) {
            setBlogs(data);
          } else {
            toast.error(message);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [user, setBlogs]);

  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <Editor />
    </div>
  );
};
