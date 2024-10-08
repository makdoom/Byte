import { marksStyle, plugins, tools } from "@/components/Editor/PluginsConfig";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getRequest } from "@/config/api";
import {
  PublishedBlogType,
  SinglePublishedBlog,
  SinglePublishedBlogType,
} from "@makdoom/byte-common";
import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

export const Blog = () => {
  const params = useParams();
  const [blog, setBlog] = useState<PublishedBlogType>({} as PublishedBlogType);

  const editor = useMemo(() => createYooptaEditor(), []);

  useEffect(() => {
    if (params.blogId) {
      const fetchBlog = async () => {
        try {
          const response = await getRequest<SinglePublishedBlogType>(
            `/blogs/makdom/${params.blogId}`,
            SinglePublishedBlog
          );
          const { message, statusCode, data } = response;
          if (statusCode === 200 && data) {
            setBlog(data);
            window.scrollTo({ behavior: "smooth", top: 0 });
          } else {
            toast.error(message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong while fetching blog");
        }
      };

      fetchBlog();
    }
  }, [params.blogId]);

  return (
    <div className="mt-16 flex-1 min-h-screen">
      <div className="md:max-w-screen-md mx-auto">
        <div>
          <div className="w-full h-[400px] rounded-md overflow-hidden">
            <img
              className="w-full h-full rounded-md object-cover"
              src={blog.coverImage}
              alt="thumbnail"
            />
          </div>

          <div className="px-10">
            <h2 className="text-center mt-8 font-extrabold text-4xl">
              {blog.title}
            </h2>

            <p className="text-center text-2xl mt-5 text-muted-foreground">
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

        {blog.content && (
          <div className="mt-8">
            <YooptaEditor
              key={blog.id}
              id={blog.id}
              editor={editor}
              plugins={plugins}
              tools={tools}
              readOnly
              marks={marksStyle}
              value={
                blog.content?.length ? JSON.parse(blog.content) : undefined
              }
              className="!m-0 !p-0"
              style={{
                width: "100%",
              }}
            />
          </div>
        )}

        <div className="my-8 border-y py-1 flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant={"ghost"} className="group flex items-center gap-2">
              <Heart
                size={22}
                className="text-muted-foreground group-hover:text-primary"
              />
              <span className="text-muted-foreground group-hover:text-primary">
                100
              </span>
            </Button>

            <Button variant={"ghost"} className="group flex items-center gap-2">
              <MessageCircle
                size={22}
                className="text-muted-foreground group-hover:text-primary"
              />
              <span className="text-muted-foreground group-hover:text-primary">
                20
              </span>
            </Button>
          </div>
          <Button variant={"ghost"} className="group flex items-center gap-2">
            <Bookmark
              size={22}
              className="text-muted-foreground group-hover:text-primary"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};
