import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const About = () => {
  return (
    <div className="max-h-[400px] overflow-scroll p-1">
      <Label htmlFor="fullname" className="text-sm inline-block !mb-2">
        Profile Bio (About You)
      </Label>
      <Textarea rows={5} autoFocus />
    </div>
  );
};
