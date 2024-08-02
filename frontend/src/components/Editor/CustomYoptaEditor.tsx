import { CoverImageDialog } from "@/components/Editor/CoverImageDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useBlogStore } from "@/store";
import { BlogType } from "@makdoom/byte-common";
import { Captions, Image, X } from "lucide-react";
import {
  ChangeEvent,
  FocusEvent,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router";
import ActionMenuList, {
  DefaultActionMenuRender,
} from "@yoopta/action-menu-list";
import Blockquote from "@yoopta/blockquote";
import Callout from "@yoopta/callout";
import Code from "@yoopta/code";
import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import { HeadingOne, HeadingThree, HeadingTwo } from "@yoopta/headings";
import LinkTool, { DefaultLinkToolRender } from "@yoopta/link-tool";
import { BulletedList, NumberedList, TodoList } from "@yoopta/lists";
import {
  Bold,
  CodeMark,
  Highlight,
  Italic,
  Strike,
  Underline,
} from "@yoopta/marks";
import Paragraph from "@yoopta/paragraph";
import Toolbar, { DefaultToolbarRender } from "@yoopta/toolbar";
import Embed from "@yoopta/embed";
import Link from "@yoopta/link";

const plugins = [
  Paragraph,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Code,
  Blockquote,
  Callout,
  NumberedList,
  BulletedList,
  TodoList,
  Embed,
  Link,
];

const TOOLS = {
  ActionMenu: {
    render: DefaultActionMenuRender,
    tool: ActionMenuList,
  },
  Toolbar: {
    render: DefaultToolbarRender,
    tool: Toolbar,
  },
  LinkTool: {
    render: DefaultLinkToolRender,
    tool: LinkTool,
  },
};

const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

export const CustomYoptaEditor = () => {
  const params = useParams();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [blog, setBlog] = useState<BlogType>({} as BlogType);
  const [openCoverImgDialog, setOpenCoverImgDialog] = useState(false);

  const { blogList, updateEditorHandler } = useBlogStore();

  const editor = useMemo(() => createYooptaEditor(), []);

  const handleRemoveCover = () => console.log("should remove cover image");

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

            <Button variant="ghost" className="text-muted-foreground ">
              <Captions size={17} />
              <p className="ml-1">Add Subtitle</p>
            </Button>
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

          <div className="relative mt-4">
            <YooptaEditor
              editor={editor}
              plugins={plugins}
              tools={TOOLS}
              marks={MARKS}
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
