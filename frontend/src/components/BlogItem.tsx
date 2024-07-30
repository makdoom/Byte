// import { Button } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { cn } from "@/lib/utils";
import { BlogType } from "@makdoom/byte-common";
import {
  EllipsisVertical,
  FileText,
  PenOff,
  Pin,
  SquareArrowOutUpRight,
  Trash2,
} from "lucide-react";
import { useParams } from "react-router";

type BlogItemProps = {
  blog: BlogType;
  deleteBlogHandler: (id: string) => void;
  pinBlogHandler: (id: string, isPinned: boolean) => void;
};
export const BlogItem = ({
  blog,
  deleteBlogHandler,
  pinBlogHandler,
}: BlogItemProps) => {
  const params = useParams();

  return (
    <div
      className={cn(
        "relative px-1 rounded-sm cursor-pointer hover:bg-secondary flex items-center justify-between mb-1",
        params.blogId === blog.id ? "bg-secondary" : "bg-transparent"
      )}
    >
      <div className="flex gap-2 items-center flex-1 h-8">
        <FileText size={17} />
        <p className="text-sm">{blog.title}</p>
      </div>
      <div className="">
        <Menubar className="border-0 bg-transparent outline-none shadow-none h-8 p-0">
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer p-0" asChild>
              <Button variant="outline" className=" h-7 px-2" tabIndex={0}>
                <EllipsisVertical size={16} className="text-black" />
              </Button>
            </MenubarTrigger>
            <MenubarContent align="start" className="flex flex-col gap-1 mr-4">
              <MenubarItem
                className="cursor-pointer"
                onClick={() => pinBlogHandler(blog.id, !blog.isPinned)}
              >
                {blog.isPinned ? <PenOff size={16} /> : <Pin size={16} />}
                <span className="ml-2 ">Pin</span>
              </MenubarItem>
              <MenubarItem className="cursor-pointer">
                <SquareArrowOutUpRight size={16} />
                <span className="ml-2 ">Preview</span>
              </MenubarItem>
              <MenubarItem
                className="cursor-pointer"
                onClick={() => deleteBlogHandler(blog.id)}
              >
                <Trash2 size={16} className="text-destructive" />
                <span className="ml-2 text-destructive ">Delete</span>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
};
