import { Button } from "@/components/ui/button";
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { postRequest } from "@/config/api";
import { cn } from "@/lib/utils";
import { useBlogStore } from "@/store";
import {
  BlogResData,
  BlogType,
  PublishedBlogResSchema,
  PublishedBlogResType,
} from "@makdoom/byte-common";
import { CloudUpload, X } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

type PublishDrawerProps = {
  openPublishDrawer: boolean;
  setOpenPublishDrawer: Dispatch<SetStateAction<boolean>>;
};

export const PublishDrawer = ({
  openPublishDrawer,
  setOpenPublishDrawer,
}: PublishDrawerProps) => {
  const [coverImg64, setCoverImg64] = useState("");
  const [blog, setBlog] = useState<BlogType>({} as BlogType);
  const params = useParams();
  const { blogList } = useBlogStore();

  const navigate = useNavigate();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setCoverImg64(reader.result?.toString());
          }
        };
        reader.readAsDataURL(file);
      }
    },
    [setCoverImg64]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".png", ".JPEG", ".gif"],
    },
    onDrop: onDrop,
  });

  const publishBlog = async () => {
    if (!blog) return;

    try {
      const payload: BlogType = {
        ...blog,
        isPublished: true,
        isDraft: false,
        isPinned: false,
      };
      const response = await postRequest<BlogType, PublishedBlogResType>(
        "/blogs/publish",
        payload,
        BlogResData,
        PublishedBlogResSchema
      );
      const { statusCode, message } = response;
      if (statusCode === 200) {
        toast.success(message);
        setOpenPublishDrawer(false);
        navigate(`/`);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Something went wrong while publishing blog");
    }
  };

  useEffect(() => {
    if (params.blogId && openPublishDrawer) {
      const currentBlog = blogList.find(
        (singleBlog) => singleBlog.id === params.blogId
      );
      if (currentBlog) {
        setBlog(currentBlog);
      }
    }
  }, [params?.blogId, setBlog, blogList, openPublishDrawer]);

  return (
    <DrawerContent className="p-4 px-16">
      <DrawerHeader>
        <DrawerTitle className="text-2xl">Publish Blog</DrawerTitle>
        <DrawerDescription className="hidden" />
      </DrawerHeader>
      <div className="flex p-3 gap-16">
        <div className="flex flex-[0.5] flex-col gap-3">
          <p className="text-base text-muted-foreground">
            Upload an image to show when your blog appears online or on social
            media. If there’s no image, the cover image will be used instead.
          </p>

          {blog.coverImage ? (
            <div className="h-64 overflow-hidden rounded-md">
              <img
                src={blog.coverImage}
                alt="cover"
                className="w-full h-full"
              />
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={cn(
                "hover:bg-secondary rounded-md cursor-pointer flex flex-col items-center justify-center gap-4 border border-dashed border-muted-foreground group",
                !coverImg64 && "py-8"
              )}
            >
              {coverImg64 ? (
                <div className="h-64 overflow-hidden relative">
                  <Button
                    variant="destructive"
                    className="rounded-full h-7 w-7 p-0 absolute top-2 right-2"
                    //   onClick={handleRemoveCover}
                  >
                    <X size={16} />
                  </Button>
                  <img src={coverImg64} alt="cover" className="object-cover" />
                </div>
              ) : (
                <div className="h-48 flex justify-center items-center flex-col">
                  <input className="hidden" {...getInputProps()} />
                  <div className="flex flex-col items-center justify-center">
                    <CloudUpload size={35} />
                    <h5 className="mt-2 font-medium">
                      Choose a file or drag and drop it here
                    </h5>
                    <p className="mt-1 text-sm text-muted-foreground">
                      JPG, JPEG, PNG and GIF formats upto 5MB
                    </p>
                  </div>

                  <Button
                    variant="secondary"
                    className="mt-3 group-hover:bg-white"
                  >
                    Browse Files
                  </Button>
                </div>
              )}
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold mt-2">{blog.title}</h2>
            <p className="text-muted-foreground mt-1">{blog.subtitle}</p>
          </div>
        </div>

        <div className="flex-[0.5]">
          <h2 className="text-xl font-medium">Select Tags</h2>
          <p className="text-muted-foreground mt-4">
            Add or change topics (up to 5) so readers know what your story is
            about
          </p>

          <Input placeholder="Add a topic ..." className="h-12 text-md mt-2" />
        </div>
      </div>
      <div className="flex justify-end item-center gap-4">
        <Button
          size={"lg"}
          className="py-6"
          variant="secondary"
          onClick={() => setOpenPublishDrawer(false)}
        >
          Cancel
        </Button>
        <Button size={"lg"} className="py-6" onClick={publishBlog}>
          Publish Now
        </Button>
      </div>
    </DrawerContent>
  );
};
