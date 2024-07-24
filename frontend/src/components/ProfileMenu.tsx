import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "@/components/ui/menubar";
import { useAuthStore } from "@/store";
import {
  BadgeHelp,
  BookmarkCheck,
  CircleHelp,
  CircleUserRound,
  LogOut,
  NotebookText,
} from "lucide-react";

type ProfileMenuProps = {
  logoutHandler: () => void;
};
export const ProfileMenu = ({ logoutHandler }: ProfileMenuProps) => {
  const { user } = useAuthStore();
  return (
    <MenubarContent align="start" className="flex flex-col gap-1 mr-4">
      <MenubarItem>
        <div className="flex gap-3 items-center">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>

          <div>
            <h5 className="text-[14px] font-medium">{user?.name}</h5>
            <p className=" text-[12px] font-normal text-muted-foreground">
              @{user?.email.split("@")?.at(0)}
            </p>
          </div>
        </div>
      </MenubarItem>
      <MenubarSeparator />

      <MenubarItem className="flex item-center gap-3 cursor-pointer">
        <NotebookText size={19} />
        My Drafts
      </MenubarItem>
      <MenubarItem className="flex item-center gap-3 cursor-pointer">
        <BookmarkCheck size={19} />
        Bookmarks
      </MenubarItem>
      <MenubarItem className="flex item-center gap-3 cursor-pointer">
        <CircleUserRound size={19} />
        Account Settings
      </MenubarItem>
      <MenubarSeparator />

      <MenubarItem className="flex item-center gap-3 cursor-pointer">
        <CircleHelp size={19} />
        Support & Feedback
      </MenubarItem>
      <MenubarItem className="flex item-center gap-3 cursor-pointer">
        <BadgeHelp size={19} />
        Help
      </MenubarItem>
      <MenubarSeparator />

      <MenubarItem
        className="flex item-center gap-3 cursor-pointer"
        onClick={logoutHandler}
      >
        <LogOut size={19} className="text-destructive" />
        <span className="text-destructive"> Sign Out </span>
      </MenubarItem>
    </MenubarContent>
  );
};
