import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserToEditType } from "@/utils/types";
import { ChangeEvent } from "react";

type PersonalDetailsPropsType = {
  user: UserToEditType | null;
  userChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const PersonalDetails = ({
  user,
  userChangeHandler,
}: PersonalDetailsPropsType) => {
  return (
    <div className="max-h-[400px] overflow-scroll grid grid-cols-2 p-1 gap-4">
      <div>
        <Label htmlFor="fullname" className="text-sm inline-block mb-2">
          Full Name
        </Label>
        <Input
          id="fullname"
          name="name"
          placeholder="Enter full name"
          className="h-[44px]"
          autoFocus
          value={user?.name}
          onChange={userChangeHandler}
        />
      </div>
      <div>
        <Label htmlFor="tagline" className="text-sm inline-block mb-2">
          Tagline
        </Label>
        <Input
          id="tagline"
          name="profileTagline"
          placeholder="Software Engineer @"
          className="h-[44px]"
          value={user?.profileTagline}
          onChange={userChangeHandler}
        />
      </div>
      <div>
        <Label htmlFor="email" className="text-sm inline-block mb-2">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          placeholder="makshaikh99@gmail.com"
          className="h-[44px]"
          disabled
          value={user?.email}
          onChange={userChangeHandler}
        />
      </div>
      <div>
        <Label htmlFor="location" className="text-sm inline-block mb-2">
          Location
        </Label>
        <Input
          id="location"
          name="location"
          placeholder="Location"
          className="h-[44px]"
          value={user?.location}
          onChange={userChangeHandler}
        />
      </div>
    </div>
  );
};
