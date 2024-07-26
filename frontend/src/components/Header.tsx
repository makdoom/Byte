import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";
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
import { useAuthStore } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SquarePen } from "lucide-react";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { ProfileMenu } from "@/components/ProfileMenu";
import axiosInstance from "@/config/api";

export const Header = () => {
  const { isLoggedIn, logoutUser } = useAuthStore((state) => state);
  const [authDialog, setAuthDialog] = useState(false);

  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const navigateToHome = () => navigate("/");

  const closeAuthDialog = () => setAuthDialog(false);

  const logoutHandler = async () => {
    try {
      const response = await axiosInstance.get("/auth/logout");
      if (response.data.statusCode == 200) {
        logoutUser();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={cn(
        `w-full px-3 fixed top-0  z-10  flex justify-between items-center py-3 backdrop-blur-sm bg-white/30`,
        isLoggedIn ? "md:max-w-screen" : "md:max-w-screen-xl m-auto"
      )}
    >
      <h3
        className="text-xl sm:text-3xl tracking-normal sm:tracking-wide font-bold cursor-pointer"
        onClick={navigateToHome}
      >
        Byte
      </h3>

      {isLoggedIn ? (
        <div className="flex gap-2 items-center">
          <Button variant="ghost">
            <SquarePen size="19" />
            <p className="ml-2 font-normal">Write</p>
          </Button>

          <Menubar className="border-0 bg-transparent outline-none shadow-none">
            <MenubarMenu>
              <MenubarTrigger className="cursor-pointer p-0">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </MenubarTrigger>
              <ProfileMenu logoutHandler={logoutHandler} />
            </MenubarMenu>
          </Menubar>
        </div>
      ) : (
        <div className={cn(`flex gap-5 items-center`)}>
          {isDesktop ? (
            <Dialog open={authDialog} onOpenChange={setAuthDialog}>
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
              <Auth closeAuthDialog={closeAuthDialog} />
            </Dialog>
          ) : (
            <Drawer open={authDialog} onOpenChange={setAuthDialog}>
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
      )}
    </div>
  );
};
