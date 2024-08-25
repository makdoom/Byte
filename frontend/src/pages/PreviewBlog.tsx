import { marksStyle, plugins, tools } from "@/components/Editor/PluginsConfig";
import { Button } from "@/components/ui/button";
import { useBlogStore } from "@/store";
import { BlogType } from "@makdoom/byte-common";
import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import { MoveLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

export const PreviewBlog = () => {
  const params = useParams();
  const [blog, setBlog] = useState<BlogType>({} as BlogType);

  const { blogList } = useBlogStore();
  const editor = useMemo(() => createYooptaEditor(), []);
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  useEffect(() => {
    if (params.blogId) {
      const currentBlog = blogList.find(
        (singleBlog) => singleBlog.id === params.blogId
      );
      if (currentBlog) {
        setBlog(currentBlog);
      } else {
        navigate(-1);
      }
    }
  }, [params, setBlog, blogList, navigate]);

  return (
    <div className="relative w-full h-full p-4">
      <div className="fixed top-4 left-4 z-10">
        <Button size="lg" className="px-4" onClick={goBack}>
          <MoveLeft size={16} />
          <p className="ml-2 text-sm">Back</p>
        </Button>
      </div>
      <div className="max-w-[900px] m-auto">
        <div className="my-10">
          <div className="max-h-[500px] rounded-md overflow-hidden">
            <img
              src={blog.coverImage}
              alt="cover"
              className="w-full rounded-md"
            />
          </div>

          <div className="my-6 text-center">
            <h2 className="text-3xl font-semibold">{blog.title}</h2>
            {blog.subtitle && (
              <p className="text-xl text-muted-foreground font-semibold mt-3">
                {blog.subtitle}
              </p>
            )}
          </div>

          <YooptaEditor
            key={blog?.id}
            editor={editor}
            plugins={plugins}
            tools={tools}
            readOnly
            marks={marksStyle}
            value={blog.content?.length ? JSON.parse(blog.content) : undefined}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};
