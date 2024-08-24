import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "@/components/ui/menubar";
import { postRequest } from "@/config/api";
import { useAuthStore } from "@/store";
import {
  BlogResSchema,
  BlogResType,
  EmptyDraftSchema,
  EmptyDraftType,
} from "@makdoom/byte-common";
import {
  BadgeHelp,
  BookmarkCheck,
  CircleHelp,
  CircleUserRound,
  LogOut,
  NotebookText,
} from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type ProfileMenuProps = {
  logoutHandler: () => void;
};
export const ProfileMenu = ({ logoutHandler }: ProfileMenuProps) => {
  const { user } = useAuthStore();

  const navigate = useNavigate();

  const createDraftHandler = async () => {
    try {
      const payload = { userId: user?.id ?? "" };
      const response = await postRequest<EmptyDraftType, BlogResType>(
        "/blogs/create-draft",
        payload,
        EmptyDraftSchema,
        BlogResSchema
      );
      const { data, statusCode, message } = response;
      if (statusCode === 200) {
        navigate(`/draft/${data?.id}`);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Something went wrong while creating draft");
    }
  };

  return (
    <MenubarContent align="start" className="flex flex-col gap-1 mr-4">
      <MenubarItem>
        <div className="flex gap-3 items-center">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{user?.email[0].toUpperCase()}</AvatarFallback>
          </Avatar>

          <div>
            <h5 className="text-[14px] font-medium">{user?.name}</h5>
            <p className=" text-[12px] font-normal text-muted-foreground">
              @{user?.username}
            </p>
          </div>
        </div>
      </MenubarItem>
      <MenubarSeparator />

      <MenubarItem
        className="flex item-center gap-3 cursor-pointer"
        onClick={createDraftHandler}
      >
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
