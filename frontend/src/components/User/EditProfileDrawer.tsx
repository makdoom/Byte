import { Button } from "@/components/ui/button";
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  //   DrawerDescription,
  //   DrawerHeader,
  //   DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type EditProfileDrawerProps = {
  isOpen: boolean;
  toggleDrawer: Dispatch<SetStateAction<boolean>>;
};
export const EditProfileDrawer = ({ toggleDrawer }: EditProfileDrawerProps) => {
  return (
    <DrawerContent className="p-4 px-48 max-h-screen">
      <DrawerHeader className="px-0 hidden">
        <DrawerTitle className="text-2xl">Edit Profile</DrawerTitle>
        <DrawerDescription className="hidden" />
      </DrawerHeader>
      <ScrollArea className="p-4 px-2 max-h-[80vh] overflow-auto no-scrollbar">
        <div className="no-scrollbar">
          <div className="h-72 rounded-tl-lg rounded-tr-lg relative">
            <img
              className="h-full w-full rounded-tl-lg rounded-tr-lg object-cover"
              src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8NGslMjBkZXNrdG9wJTIwd2FsbGFwZXJ8ZW58MHx8MHx8fDA%3D"
              alt=""
            />

            <div className="absolute right-4 top-4 flex gap-3">
              <div>
                <Button
                  variant="ghost"
                  className="p-0 h-10 w-10 flex items-center justify-center rounded-full bg-accent shadow-md"
                >
                  <Pencil className="text-primary" size={17} />
                </Button>
              </div>
              <div>
                <Button
                  variant="ghost"
                  className="p-0 h-10 w-10 flex items-center justify-center rounded-full bg-accent shadow-md"
                >
                  <X className="text-primary" size={17} />
                </Button>
              </div>
            </div>

            <div className="absolute left-4 -bottom-16">
              <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-card bg-card shadow-md">
                <img
                  className="h-full w-full rounded-full object-contain"
                  src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </div>
              <Button
                variant="ghost"
                className="bg-secondary shadow-md h-10 w-10 p-0 rounded-full absolute z-20 right-0 bottom-4"
              >
                <Pencil size="17" className="text-black" />
              </Button>
            </div>
          </div>

          <div className="mt-24 mb-4 grid grid-cols-2 gap-8 h-full px-2">
            <div>
              <h4 className="text-xl font-bold text-muted-foreground mb-4">
                Basic Information
              </h4>
              <div className="mb-4">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  placeholder="Full Name"
                  className="h-[45px]"
                  autoFocus
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="tagline">Profile Tagline</Label>
                <Input
                  id="tagline"
                  placeholder="Software Engineer @"
                  className="h-[45px]"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Location"
                  className="h-[45px]"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="bio">Profile Bio (About You)</Label>
                <Textarea
                  id="bio"
                  placeholder="Something about yourself..."
                  rows={6}
                  className="resize-none"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="tech">Tech Stack</Label>
                <Textarea
                  id="tech"
                  placeholder="Javascript, Typescript, React ..."
                  rows={5}
                  className="resize-none"
                />
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold text-muted-foreground mb-4">
                Social Information
              </h4>
              <div className="mb-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Email"
                  className="h-[45px]"
                  value="makshaikh99@gmail.com"
                  disabled
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="website">Portfolio</Label>
                <Input
                  id="website"
                  placeholder="https://www.user.com"
                  className="h-[45px]"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="gitub">Github Profile</Label>
                <Input
                  id="gitub"
                  placeholder="https://wwww.github.com/user"
                  className="h-[45px]"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="linkedin">Linkedin Profile</Label>
                <Input
                  id="linkedin"
                  placeholder="https://www.linkedin.com/user"
                  className="h-[45px]"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="twitter">Twitter (X) Profile</Label>
                <Input
                  id="twitter"
                  placeholder="https://www.twitter.com/user"
                  className="h-[45px]"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="youtube">Youtube Channel</Label>
                <Input
                  id="youtube"
                  placeholder="https://www.youtube.com/channel/channel-name"
                  className="h-[45px]"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="instagram">Instagram Profile</Label>
                <Input
                  id="instagram"
                  placeholder="https://www.instagram.com/user"
                  className="h-[45px]"
                />
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
      <div className="flex justify-end gap-4 py-4 px-2">
        <Button
          variant="secondary"
          size="lg"
          className="py-6 px-8"
          onClick={() => toggleDrawer(false)}
        >
          Cancel
        </Button>
        <Button size="lg" className="py-6 px-8">
          Update
        </Button>
      </div>
    </DrawerContent>
  );
};
