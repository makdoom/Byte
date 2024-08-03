import { PublishDrawer } from "@/components/Editor/PublishDrawer";
import { ProfileMenu } from "@/components/ProfileMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { cn } from "@/lib/utils";
import { useBlogStore } from "@/store";
import { PanelLeftOpen } from "lucide-react";
import { useNavigate, useParams } from "react-router";

export const EditorHeader = () => {
  const params = useParams();
  const { isSidebarOpen, toggleSidebar, wordsCount, charCount } =
    useBlogStore();

  const navigate = useNavigate();

  const previewHandler = () => {
    navigate(`/preview/${params.blogId}`);
  };

  return (
    <div className={cn("flex items-center justify-between")}>
      <div className="flex gap-4">
        <Button
          variant="ghost"
          className={cn("h-8 p-2", isSidebarOpen ? "hidden" : "block")}
          onClick={toggleSidebar}
        >
          <PanelLeftOpen size="18" />
        </Button>

        {wordsCount && charCount ? (
          <div>
            <p className="text-muted-foreground text-xs">
              <span className="font-medium">{wordsCount}</span> Words
            </p>
            <p className="text-muted-foreground text-xs">
              <span className="font-medium">{charCount}</span> Characters
            </p>
          </div>
        ) : null}
      </div>

      <div className="flex gap-4 items-center">
        <Button variant="secondary" onClick={previewHandler}>
          Preview
        </Button>
        <Drawer

        // open={openCoverImgDialog}
        // onOpenChange={setOpenCoverImgDialog}
        >
          <DrawerTrigger asChild>
            <Button variant="default">Publish</Button>
          </DrawerTrigger>
          <PublishDrawer />
        </Drawer>

        <Menubar className="border-0 bg-transparent outline-none shadow-none">
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer p-0">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </MenubarTrigger>
            <ProfileMenu logoutHandler={() => {}} />
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
};
