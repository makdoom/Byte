import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@/styles/custom-editor.css";

import { Button } from "@/components/ui/button";
import { Captions, Image, X } from "lucide-react";
import {
  ChangeEvent,
  FocusEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CoverImageDialog } from "@/components/Editor/CoverImageDialog";
import { useParams } from "react-router";
import { useBlogStore } from "@/store";
import { BlogType } from "@makdoom/byte-common";

export const BlockEditor = () => {
  const params = useParams();
  const { blogList, updateEditorHandler } = useBlogStore();
  const [blog, setBlog] = useState<BlogType>({} as BlogType);
  const [coverImage, setCoverImage] = useState("");
  const [openCoverImgDialog, setOpenCoverImgDialog] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const editor = useCreateBlockNote(
    {
      initialContent: blog?.content?.length
        ? JSON.parse(blog.content)
        : undefined,
      uploadFile: async (file: File) => {
        console.log("hello", file);
        return "hello";
      },
    },
    [blog ? blog?.id : ""]
  );

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (value.length <= 100) {
      setBlog((prev) => ({ ...prev, title: value }));
      updateEditorHandler(blog?.id, {
        type: "title",
        data: value,
      });
    }
  };

  const titleBlurHandler = (e: FocusEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length === 0) {
      setBlog((prev) => ({ ...prev, title: "Untitled" }));
      updateEditorHandler(blog?.id, {
        type: "title",
        data: "Untitled",
      });
    }
  };

  const handleEditorChange = () => {
    updateEditorHandler(blog?.id, {
      type: "content",
      data: JSON.stringify(editor.document),
    });
  };

  const handleRemoveCover = () => setCoverImage("");

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [blog?.title]);

  useLayoutEffect(() => {
    if (params.blogId) {
      const currentBlog = blogList.find(
        (singleBlog) => singleBlog.id === params.blogId
      );
      if (currentBlog) {
        setBlog(currentBlog);
      }
    }
  }, [params, setBlog, blogList]);

  return (
    <div className="">
      <div className=" h-[calc(100vh-90px)] overflow-scroll max-w-screen-xl m-auto no-scrollbar mt-5">
        <div className="max-w-[900px] m-auto mt-4">
          <div className="flex gap-3 items-center">
            {!coverImage && (
              <Dialog
                open={openCoverImgDialog}
                onOpenChange={setOpenCoverImgDialog}
              >
                <DialogTrigger asChild>
                  <Button variant="ghost" className="text-muted-foreground">
                    <Image size={17} />
                    <p className="ml-1">Add Cover</p>
                  </Button>
                </DialogTrigger>
                <CoverImageDialog
                  setCoverImage={setCoverImage}
                  setOpenCoverImgDialog={setOpenCoverImgDialog}
                />
              </Dialog>
            )}

            <Button variant="ghost" className="text-muted-foreground">
              <Captions size={17} />
              <p className="ml-1">Add Subtitle</p>
            </Button>
          </div>

          {coverImage && (
            <div className="mt-3 relative">
              <Button
                variant="destructive"
                className="rounded-full absolute top-3 right-3 h-10 w-10 p-0"
                onClick={handleRemoveCover}
              >
                <X size={19} />
              </Button>

              <img
                src={coverImage}
                alt="cover"
                className="w-full h-80 rounded-md"
              />
            </div>
          )}

          <textarea
            ref={textareaRef}
            value={blog?.title}
            onChange={handleChange}
            onBlur={titleBlurHandler}
            placeholder="Blog Title..."
            rows={1}
            className="w-full resize-none overflow-hidden mt-4 font-bold text-4xl outline-none placeholder:text-muted-foreground"
          />

          <div className="relative !-left-12 mt-4">
            <BlockNoteView
              editor={editor}
              theme={"light"}
              onChange={handleEditorChange}
              className="text-primary"
            />
          </div>
          {/* {JSON.stringify(blocks, null, 2)} */}
        </div>
      </div>
    </div>
  );
};
