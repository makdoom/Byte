import { Button } from "@/components/ui/button";
import { Captions, Image } from "lucide-react";

export const BlockEditor = () => {
  return (
    <div className="">
      <div className=" h-[calc(100vh-90px)] overflow-scroll max-w-screen-xl m-auto no-scrollbar mt-5">
        <div className="max-w-[900px] m-auto mt-4">
          <div className="flex gap-3 items-center">
            <Button variant="ghost" className="text-muted-foreground">
              <Image size={17} />
              <p className="ml-1">Add Cover</p>
            </Button>

            <Button variant="ghost" className="text-muted-foreground">
              <Captions size={17} />
              <p className="ml-1">Add Subtitle</p>
            </Button>
          </div>

          
        </div>
      </div>
    </div>
  );
};
