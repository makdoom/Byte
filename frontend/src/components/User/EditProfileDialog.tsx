import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { About } from "@/components/User/About";
import { PersonalDetails } from "@/components/User/PersonalDetails";
import { SocialLinks } from "@/components/User/SocialLinks";
import { TechStack } from "@/components/User/TechStack";
import { Pencil, X } from "lucide-react";

export const EditProfileDialog = () => {
  return (
    <DialogContent className="sm:max-w-screen-sm">
      <DialogTitle>Edit Information</DialogTitle>
      <div className="relative w-full">
        <div className="relative">
          <div className="relative rounded-sm overflow-hidden h-52">
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8NGslMjBkZXNrdG9wJTIwd2FsbGFwZXJ8ZW58MHx8MHx8fDA%3D"
              alt=""
            />

            <div className="absolute right-2 top-2 flex gap-2">
              <Button
                variant="secondary"
                className="rounded-full h-8 w-8 p-0 shadow-md"
              >
                <Pencil size={14} />
              </Button>

              <Button
                variant="destructive"
                className="rounded-full h-8 w-8 p-0 shadow-md"
              >
                <X size={14} />
              </Button>
            </div>
          </div>

          <div className="absolute top-[100%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <Avatar className="h-32 w-32 shadow-lg border-4 border-card">
                <AvatarImage
                  className="object-cover"
                  src="https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              </Avatar>

              <div className="absolute right-1 bottom-2">
                <Button className="rounded-full h-8 w-8 p-0 shadow-md">
                  <Pencil size={14} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 max-h-[400px] overflow-scroll">
          <Tabs defaultValue="personal-details" className="w-full p-4">
            <TabsList className="w-full flex h-full">
              <TabsTrigger
                value="personal-details"
                className="flex-1 text-sm p-2"
              >
                Personal Details
              </TabsTrigger>
              <TabsTrigger value="about" className="flex-1 text-sm p-2">
                About
              </TabsTrigger>
              <TabsTrigger value="tech" className="flex-1 text-sm p-2">
                Tech Stack
              </TabsTrigger>
              <TabsTrigger value="social" className="flex-1 text-sm p-2">
                Social
              </TabsTrigger>
            </TabsList>
            <TabsContent value="personal-details" className="mt-4">
              <PersonalDetails />
            </TabsContent>
            <TabsContent value="about" className="mt-4">
              <About />
            </TabsContent>
            <TabsContent value="tech" className="mt-4">
              <TechStack />
            </TabsContent>
            <TabsContent value="social" className="mt-4">
              <SocialLinks />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <DialogFooter className="mt-4">
        <Button variant="secondary">Cancel</Button>
        <Button>Update</Button>
      </DialogFooter>
    </DialogContent>
  );
};
