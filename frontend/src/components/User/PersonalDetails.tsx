import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const PersonalDetails = () => {
  return (
    <div className="max-h-[400px] overflow-scroll grid grid-cols-2 p-1 gap-4">
      <div>
        <Label htmlFor="fullname" className="text-sm inline-block mb-2">
          Full Name
        </Label>
        <Input
          id="fullname"
          placeholder="Enter full name"
          className="h-[44px]"
          autoFocus
        />
      </div>
      <div>
        <Label htmlFor="tagline" className="text-sm inline-block mb-2">
          Tagline
        </Label>
        <Input
          id="tagline"
          placeholder="Software Engineer @"
          className="h-[44px]"
        />
      </div>
      <div>
        <Label htmlFor="email" className="text-sm inline-block mb-2">
          Email
        </Label>
        <Input
          id="email"
          placeholder="makshaikh99@gmail.com"
          className="h-[44px]"
          disabled
        />
      </div>
      <div>
        <Label htmlFor="location" className="text-sm inline-block mb-2">
          Location
        </Label>
        <Input id="location" placeholder="Location" className="h-[44px]" />
      </div>
    </div>
  );
};
