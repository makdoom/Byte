import { ProfileMenu } from "@/components/ProfileMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { cn } from "@/lib/utils";
import { useBlogStore } from "@/store";
import { PanelLeftOpen } from "lucide-react";

export const EditorHeader = () => {
  const { isSidebarOpen, toggleSidebar } = useBlogStore();

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

        <div>
          <p className="text-muted-foreground text-xs">
            <span className="font-medium">200</span> Words
          </p>
          <p className="text-muted-foreground text-xs">
            <span className="font-medium">1097</span> Characters
          </p>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <Button variant="secondary">Preview</Button>
        <Button variant="default">Publish</Button>

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
