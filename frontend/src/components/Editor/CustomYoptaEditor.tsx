import { CoverImageDialog } from "@/components/Editor/CoverImageDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useBlogStore } from "@/store";
import { BlogType } from "@makdoom/byte-common";
import { Captions, Image, X } from "lucide-react";
import {
  ChangeEvent,
  FocusEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router";

import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import { marksStyle, plugins, tools } from "@/components/Editor/PluginsConfig";
import { getsWordsCharCounts } from "@/utils";

export const CustomYoptaEditor = () => {
  const params = useParams();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [blog, setBlog] = useState<BlogType>({} as BlogType);
  const [openCoverImgDialog, setOpenCoverImgDialog] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  const { blogList, updateEditorHandler, updateBlogWordCharCount } =
    useBlogStore();

  const editor = useMemo(() => createYooptaEditor(), []);

  const handleRemoveCover = () => console.log("should remove cover image");

  const toggleSubtitle = () => {
    if (showSubtitle) {
      setBlog((prev) => ({ ...prev, subtitle: "" }));
      updateEditorHandler(blog?.id, {
        type: "subtitle",
        data: "",
      });
      setShowSubtitle(false);
      textareaRef.current?.focus();
    } else {
      setShowSubtitle(true);
    }
  };

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

  const handleSubtitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBlog((prev) => ({ ...prev, subtitle: e.target.value }));
    updateEditorHandler(blog?.id, {
      type: "subtitle",
      data: e.target.value,
    });
  };

  useEffect(() => {
    const handleEditorChange = (value: string) => {
      const stringifiedValue = JSON.stringify(value);
      setBlog((prev) => ({ ...prev, content: stringifiedValue }));
      updateEditorHandler(blog?.id, {
        type: "content",
        data: stringifiedValue,
      });

      const { wordsCount, charCounts } = getsWordsCharCounts(stringifiedValue);
      updateBlogWordCharCount(wordsCount, charCounts);
    };

    editor.on("change", handleEditorChange);

    return () => {
      editor.off("change", handleEditorChange);
    };
  }, [editor, blog?.id, updateEditorHandler, updateBlogWordCharCount]);

  useEffect(() => {
    if (params.blogId) {
      setShowSubtitle(false);
      const currentBlog = blogList.find(
        (singleBlog) => singleBlog.id === params.blogId
      );
      if (currentBlog) {
        setBlog(currentBlog);
      }
    }
  }, [params?.blogId, setBlog, blogList]);

  return (
    <div className="">
      <div className=" h-[calc(100vh-90px)] overflow-scroll max-w-screen-xl m-auto no-scrollbar mt-5">
        <div className="max-w-[900px] m-auto mt-4">
          <div className="flex gap-3 items-center">
            {!blog.coverImage && (
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
                  setCoverImage={(url) => console.log(url)}
                  setOpenCoverImgDialog={setOpenCoverImgDialog}
                />
              </Dialog>
            )}

            {!blog.subtitle && !showSubtitle && (
              <Button
                variant="ghost"
                className="text-muted-foreground "
                onClick={toggleSubtitle}
              >
                <Captions size={17} />
                <p className="ml-1">Add Subtitle</p>
              </Button>
            )}
          </div>

          {blog.coverImage && (
            <div className="mt-3 relative">
              <Button
                variant="destructive"
                className="rounded-full absolute top-3 right-3 h-10 w-10 p-0"
                onClick={handleRemoveCover}
              >
                <X size={19} />
              </Button>

              <img
                src={blog.coverImage}
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
            className="leading-normal w-full resize-none overflow-hidden mt-4 font-bold text-4xl outline-none placeholder:text-muted-foreground"
          />

          {(blog.subtitle || showSubtitle) && (
            <div className="flex justify-between items-center">
              <input
                placeholder="Blog Subtitle"
                onChange={handleSubtitleChange}
                autoFocus
                value={blog.subtitle}
                className=" flex-1 px-1 leading-normal border-none shadow-none w-full mt-2 font-semibold text-muted-foreground text-2xl outline-none placeholder:text-muted-foreground"
              />

              <Button variant="ghost" className="px-2" onClick={toggleSubtitle}>
                <X size={19} />
              </Button>
            </div>
          )}

          <div className="relative mt-4">
            <YooptaEditor
              id={blog.id}
              key={blog.id}
              editor={editor}
              plugins={plugins}
              tools={tools}
              marks={marksStyle}
              value={
                blog.content?.length ? JSON.parse(blog.content) : undefined
              }
              placeholder="Enter text or type '/' for commands"
              style={{ width: "100%", backgroundColor: "red" }}
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
};
