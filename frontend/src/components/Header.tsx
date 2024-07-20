import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Header = () => {
  return (
    <div
      className={cn(
        `w-full md:max-w-screen-xl m-auto flex justify-between items-center py-3`
      )}
    >
      <h3 className="text-2xl tracking-wide font-bold cursor-pointer">Byte</h3>

      <div className={cn(`flex gap-5 items-center`)}>
        <Button variant="ghost">Signin</Button>
        <Button variant="default" className="text-xs">
          Get Started
        </Button>
      </div>
    </div>
  );
};
