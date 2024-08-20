import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const SocialLinks = () => {
  return (
    <div className="max-h-[400px] overflow-scroll grid grid-cols-2 p-1 gap-4">
      <div>
        <Label htmlFor="website" className="text-sm inline-block mb-2">
          Portfolio URL
        </Label>
        <Input
          id="website"
          placeholder="https://www.johndoe.com"
          className="h-[44px]"
          autoFocus
        />
      </div>
      <div>
        <Label htmlFor="github" className="text-sm inline-block mb-2">
          Github Profile
        </Label>
        <Input
          id="github"
          placeholder="https://www.github.com/byte"
          className="h-[44px]"
        />
      </div>
      <div>
        <Label htmlFor="linkedin" className="text-sm inline-block mb-2">
          Linkedin Profile
        </Label>
        <Input
          id="linkedin"
          placeholder="https://www.linkedin.com/in/johndoe"
          className="h-[44px]"
        />
      </div>
      <div>
        <Label htmlFor="twitter" className="text-sm inline-block mb-2">
          Twitter Profile
        </Label>
        <Input
          id="twitter"
          placeholder="https://www.twitter.com/johndoe"
          className="h-[44px]"
        />
      </div>
      <div>
        <Label htmlFor="instagram" className="text-sm inline-block mb-2">
          Instagram Profile
        </Label>
        <Input
          id="instagram"
          placeholder="https://www.instagram.com/johndoe"
          className="h-[44px]"
        />
      </div>
      <div>
        <Label htmlFor="youtube" className="text-sm inline-block mb-2">
          Youtube Channel
        </Label>
        <Input
          id="youtube"
          placeholder="https://www.youtube.com/@johndoe"
          className="h-[44px]"
        />
      </div>
    </div>
  );
};
