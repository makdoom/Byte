import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Auth } from "@/components/Auth";

export const Header = () => {
  const [open, setOpen] = useState(false);

  const navigat = useNavigate();
  const { pathname } = useLocation();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const navigateToHome = () => {
    navigat("/");
  };

  return (
    <div
      className={cn(
        `w-full px-3 fixed top-0  z-10  flex justify-between items-center py-3 backdrop-blur-sm bg-white/30`,
        pathname !== "/" ? "md:max-w-screen" : "md:max-w-screen-xl m-auto"
      )}
    >
      <h3
        className="text-xl sm:text-3xl tracking-normal sm:tracking-wide font-bold cursor-pointer"
        onClick={navigateToHome}
      >
        Byte
      </h3>

      <div className={cn(`flex gap-5 items-center`)}>
        {isDesktop ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="text-muted-foreground">
                Signin
              </Button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <Button variant="default" className="text-xs">
                Get Started
              </Button>
            </DialogTrigger>
            {/* <Login /> */}
            <Auth />
          </Dialog>
        ) : (
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" className="text-muted-foreground">
                Signin
              </Button>
            </DrawerTrigger>
            <DrawerTrigger asChild>
              <Button variant="default" className="text-xs">
                Get Started
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="text-left">
                <DrawerTitle>Edit profile</DrawerTitle>
                <DrawerDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DrawerDescription>
              </DrawerHeader>
              <h1>Login</h1>
              {/* <ProfileForm className="px-4" /> */}
              <DrawerFooter className="pt-2">
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
        {/* <Button variant="ghost" className="text-muted-foreground">
          Signin
        </Button>
            <Button variant="default" className="text-xs">
              Get Started
            </Button> */}
      </div>
    </div>
  );
};
