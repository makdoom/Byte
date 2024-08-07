import { marksStyle, plugins, tools } from "@/components/Editor/PluginsConfig";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useBlogStore } from "@/store";
import { PublishedBlogType } from "@makdoom/byte-common";
import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";

export const Blog = () => {
  const params = useParams();
  const { feedsList } = useBlogStore();
  const [blog, setBlog] = useState<PublishedBlogType>({} as PublishedBlogType);

  const editor = useMemo(() => createYooptaEditor(), []);

  console.log(blog);
  useEffect(() => {
    if (params.blogId) {
      const currentBlog = feedsList.find((blog) => blog.id == params.blogId);
      console.log(currentBlog);
      if (currentBlog) {
        setBlog(currentBlog);
      }
    }
  }, [params.blogId, feedsList]);

  return (
    <div className="mt-16 flex-1 min-h-screen">
      <div className="md:max-w-screen-md mx-auto">
        <div>
          <div className="w-full h-[400px] rounded-md overflow-hidden">
            <img
              className="w-full h-full rounded-md object-cover"
              src="https://pbs.twimg.com/media/GUTXmQxb0AAvccD?format=jpg&name=4096x4096"
              alt="thumbnail"
            />
          </div>

          <div className="px-10">
            <h2 className="text-center mt-8 font-extrabold text-4xl">
              {blog.title}
            </h2>

            <p className="text-center text-2xl mt-4 text-muted-foreground">
              {blog.subtitle}
            </p>

            <div className="flex gap-4 justify-center mt-8 items-center">
              <Avatar className="h-12 w-12">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <p className="font-semibold text-lg">{blog.author?.name}</p>
              <div>
                <p className="text-muted-foreground text-lg">
                  {moment(blog.createdAt).format("LL")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <YooptaEditor
            key={blog.id}
            id={blog.id}
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
