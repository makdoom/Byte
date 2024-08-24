import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserToEditType } from "@/utils/types";
import { ChangeEvent } from "react";

type TechstackPropsType = {
  user: UserToEditType | null;
  userChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const TechStack = ({ user, userChangeHandler }: TechstackPropsType) => {
  return (
    <div className="max-h-[400px] overflow-scroll p-1">
      <div>
        <Label htmlFor="techstack" className="text-sm inline-block mb-2">
          Tech Stack
        </Label>
        <Input
          id="techstack"
          name="techStack"
          placeholder="Technologies, Topics more..."
          className="h-[44px]"
          value={user?.techStack}
          onChange={userChangeHandler}
          autoFocus
        />

        <span className="text-muted-foreground text-xs mt-2">
          Add technologies, topics comma (,) separated
        </span>
      </div>
    </div>
  );
};
