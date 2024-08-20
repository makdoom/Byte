import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const TechStack = () => {
  return (
    <div className="max-h-[400px] overflow-scroll p-1">
      <div>
        <Label htmlFor="techstack" className="text-sm inline-block mb-2">
          Tech Stack
        </Label>
        <Input
          id="techstack"
          placeholder="Technologies, Topics more..."
          className="h-[44px]"
          autoFocus
        />

        <span className="text-muted-foreground text-xs mt-2">
          Add technologies, topics comma (,) separated
        </span>
      </div>
    </div>
  );
};
