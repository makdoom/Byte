import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserToEditType } from "@/utils/types";
import { ChangeEvent } from "react";

type AboutPropsType = {
  user: UserToEditType | null;
  userChangeHandler: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

export const About = ({ user, userChangeHandler }: AboutPropsType) => {
  return (
    <div className="max-h-[400px] overflow-scroll p-1">
      <Label htmlFor="fullname" className="text-sm inline-block !mb-2">
        Profile Bio (About You)
      </Label>
      <Textarea
        name="bio"
        rows={5}
        value={user?.bio}
        autoFocus
        onChange={userChangeHandler}
      />
    </div>
  );
};
