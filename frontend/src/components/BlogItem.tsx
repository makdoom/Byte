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
import { EllipsisVertical, FileText } from "lucide-react";
import { useParams } from "react-router";

type BlogItemProps = {
  blog: BlogType;
};
export const BlogItem = ({ blog }: BlogItemProps) => {
  const params = useParams();

  return (
    <div
      className={cn(
        "group px-1 rounded-sm cursor-pointer hover:bg-secondary flex items-center justify-between",
        params.blogId === blog.id ? "bg-secondary" : "bg-transparent"
      )}
    >
      <div className="flex gap-2 items-center flex-1 h-8">
        <FileText size={17} />
        <p className="text-sm">{blog.title}</p>
      </div>
      <div className="group-hover:block group-focus-within:block">
        <Menubar className="border-0 bg-transparent outline-none shadow-none h-8 p-0">
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer p-0" asChild>
              <Button variant="outline" className=" h-7 px-2 ">
                <EllipsisVertical size={16} className="text-black" />
              </Button>
            </MenubarTrigger>
            <MenubarContent align="start" className="flex flex-col gap-1 mr-4">
              <MenubarItem>Pin</MenubarItem>
              <MenubarItem>Preview</MenubarItem>
              <MenubarItem>Delete</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
};
