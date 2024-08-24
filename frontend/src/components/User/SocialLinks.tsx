import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserToEditType } from "@/utils/types";
import { ChangeEvent } from "react";

type SocialLinkPropsType = {
  user: UserToEditType | null;
  userChangeHandler: (
    event: ChangeEvent<HTMLInputElement>,
    isSocialLink: boolean
  ) => void;
};
export const SocialLinks = ({
  user,
  userChangeHandler,
}: SocialLinkPropsType) => {
  return (
    <div className="max-h-[400px] overflow-scroll grid grid-cols-2 p-1 gap-4">
      <div>
        <Label htmlFor="website" className="text-sm inline-block mb-2">
          Portfolio URL
        </Label>
        <Input
          name="portfolio"
          id="website"
          placeholder="https://www.johndoe.com"
          className="h-[44px]"
          value={user?.socialLinks?.portfolio}
          onChange={(event) => userChangeHandler(event, true)}
          autoFocus
        />
      </div>
      <div>
        <Label htmlFor="github" className="text-sm inline-block mb-2">
          Github Profile
        </Label>
        <Input
          name="github"
          id="github"
          placeholder="https://www.github.com/byte"
          className="h-[44px]"
          value={user?.socialLinks?.github}
          onChange={(event) => userChangeHandler(event, true)}
        />
      </div>
      <div>
        <Label htmlFor="linkedin" className="text-sm inline-block mb-2">
          Linkedin Profile
        </Label>
        <Input
          id="linkedin"
          name="linkedin"
          placeholder="https://www.linkedin.com/in/johndoe"
          className="h-[44px]"
          value={user?.socialLinks.linkedin}
          onChange={(event) => userChangeHandler(event, true)}
        />
      </div>
      <div>
        <Label htmlFor="twitter" className="text-sm inline-block mb-2">
          Twitter Profile
        </Label>
        <Input
          id="twitter"
          name="twitter"
          placeholder="https://www.twitter.com/johndoe"
          className="h-[44px]"
          value={user?.socialLinks.linkedin}
          onChange={(event) => userChangeHandler(event, true)}
        />
      </div>
      <div>
        <Label htmlFor="instagram" className="text-sm inline-block mb-2">
          Instagram Profile
        </Label>
        <Input
          id="instagram"
          name="instagram"
          placeholder="https://www.instagram.com/johndoe"
          className="h-[44px]"
          value={user?.socialLinks.instagram}
          onChange={(event) => userChangeHandler(event, true)}
        />
      </div>
      <div>
        <Label htmlFor="youtube" className="text-sm inline-block mb-2">
          Youtube Channel
        </Label>
        <Input
          id="youtube"
          name="youtube"
          placeholder="https://www.youtube.com/@johndoe"
          className="h-[44px]"
          value={user?.socialLinks.youtube}
          onChange={(event) => userChangeHandler(event, true)}
        />
      </div>
    </div>
  );
};
