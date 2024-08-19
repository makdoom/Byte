import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogTitle,
  //   DialogDescription,
  //   DialogHeader,
  //   DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const EditProfileDialog = () => {
  return (
    <DialogContent className="sm:max-w-screen-sm">
      <DialogTitle>Edit Information</DialogTitle>
      <div className="relative w-full">
        <div className="relative">
          <div className="rounded-sm overflow-hidden h-52">
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8NGslMjBkZXNrdG9wJTIwd2FsbGFwZXJ8ZW58MHx8MHx8fDA%3D"
              alt=""
            />
          </div>

          <div className="absolute top-[100%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Avatar className="h-28 w-28 shadow-lg border-4 border-card">
              <AvatarImage
                className="object-cover"
                src="https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </Avatar>
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
              <div className="max-h-[400px] overflow-scroll grid grid-cols-2 p-1 gap-4">
                <div>
                  <Label htmlFor="fullname" className="text-xs mb-1">
                    Full Name
                  </Label>
                  <Input
                    id="fullname"
                    placeholder="Enter full name"
                    className="h-[40px]"
                    autoFocus
                  />
                </div>
                <div>
                  <Label htmlFor="tagline" className="text-xs mb-1">
                    Tagline
                  </Label>
                  <Input
                    id="tagline"
                    placeholder="Software Engineer @"
                    className="h-[40px]"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-xs mb-1">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="makshaikh99@gmail.com"
                    className="h-[40px]"
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="text-xs mb-1">
                    Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="Location"
                    className="h-[40px]"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="about">
              <div className="mt-6">
                <span className="p-2 bg-secondary rounded-md text-sm px-3">
                  Javascript
                </span>
              </div>
            </TabsContent>
            <TabsContent value="tech"></TabsContent>
            <TabsContent value="social"></TabsContent>
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
