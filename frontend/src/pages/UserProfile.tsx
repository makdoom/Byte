import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditProfileDialog } from "@/components/User/EditProfileDialog";
import { postRequest } from "@/config/api";
import { useAuthStore } from "@/store";
import {
  UserProfilePayload,
  UserProfilePayloadType,
  UserProfileRes,
  UserProfileResTpe,
  UserProfileType,
} from "@makdoom/byte-common";
import {
  ExternalLink,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Pencil,
  Twitter,
  UserRoundPlus,
  Youtube,
} from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { toast } from "sonner";

export const UserProfile = () => {
  // TODO: Need to handle loading skelton state
  const { user: loggedInUser } = useAuthStore((state) => state);
  const location = useLocation();
  const { id, username } = location.state;
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const updateUser = (updatedUserObj: UserProfileType) => {
    setUserProfile(updatedUserObj);
    setOpenDialog(false);
  };

  useEffect(() => {
    if (id && username) {
      (async () => {
        try {
          const payload = {
            userId: id,
            username,
          };
          const response = await postRequest<
            UserProfilePayloadType,
            UserProfileResTpe
          >(
            "/user/getUserProfile",
            payload,
            UserProfilePayload,
            UserProfileRes
          );

          const { statusCode, message, data } = response;
          if (statusCode === 200 && data) {
            setUserProfile(data);
          } else {
            toast.error(message);
          }
        } catch (error) {
          toast.error("Error while fetching user information");
        }
      })();
    }
  }, [id, username]);

  return (
    <div className="pt-16 pb-4 flex-1 min-h-screen w-full px-8 flex gap-3">
      <div className="flex-[0.33] bg-card rounded-md border">
        <div>
          <div className="relative">
            <div className="relative rounded-tl-md rounded-tr-md overflow-hidden h-40">
              {userProfile?.coverImage ? (
                <img
                  className="w-full h-full object-cover"
                  src={userProfile.coverImage}
                  alt="cover"
                />
              ) : (
                <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 h-full w-full"></div>
              )}
            </div>
            <div className="absolute left-4 -bottom-12">
              <Avatar className="h-24 w-24 shadow-lg border-4 border-card bg-card">
                <AvatarImage
                  className="object-cover"
                  src={userProfile?.profileURL}
                />
                <AvatarFallback className="font-bold text-4xl">
                  {userProfile?.name?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {userProfile && (
            <div className="flex justify-end p-2 px-4">
              {loggedInUser?.id === userProfile?.id ? (
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogTrigger asChild>
                    <Button size={"sm"}>
                      <Pencil size={12} className="mr-2" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  {userProfile && (
                    <EditProfileDialog
                      user={userProfile}
                      updateUser={updateUser}
                    />
                  )}
                </Dialog>
              ) : (
                <Button size={"sm"}>
                  <UserRoundPlus size={14} className="mr-2" />
                  Follow
                </Button>
              )}
            </div>
          )}

          <div className="px-4 mt-2 flex flex-col gap-4">
            <div>
              <div className="flex gap-2 items-center">
                <p className="font-semibold">{userProfile?.name}</p>
                <span className="text-xs text-muted-foreground">
                  @{userProfile?.username}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {userProfile?.profileTagline}
              </p>
              <div className="flex items-center justify-between my-2">
                <span className="text-sm text-muted-foreground">
                  {userProfile?.location}
                </span>
                <span className="text-sm text-muted-foreground">
                  Joined {moment(userProfile?.createdAt).year()}
                </span>
                {userProfile?.socialLinks?.portfolio && (
                  <a
                    href={userProfile.socialLinks.portfolio}
                    target="_blank"
                    className="text-blue-700 flex items-center"
                  >
                    <span className="text-sm">Portfolio</span>
                    <ExternalLink size="15" className="ml-2 underline" />
                  </a>
                )}
              </div>

              <div className=" flex mt-3 gap-4">
                <div className="flex gap-1">
                  <p className="font-bold text-sm">2000</p>
                  <span className="text-sm text-muted-foreground">
                    Followers
                  </span>
                </div>

                <div className="flex gap-1">
                  <p className="font-bold text-sm">100</p>
                  <span className="text-sm text-muted-foreground">
                    Following
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="w-full flex ">
                  <TabsTrigger value="about" className="flex-1 text-sm">
                    About
                  </TabsTrigger>
                  <TabsTrigger value="tech" className="flex-1 text-sm">
                    Tech Stack
                  </TabsTrigger>
                  <TabsTrigger value="social" className="flex-1 text-sm">
                    Social
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="mt-6 px-2">
                  <p className="text-base/7">
                    Heya 👋 This is Makdoom Shaikh, Frontend Web Developer who
                    is passionate about the JavaScript web technologies building
                    websites and web applications. I have done my internship at
                    Digital Solution Media as Frontend Developer. I love to
                    build beautiful and responsive websites using modern HTML5,
                    CSS3, JavaScript and React. I can develop Responsive Web
                    Apps (React). I have also hands-on experience in JavaScript,
                    React and Redux ( State Management ).
                  </p>
                </TabsContent>
                <TabsContent value="tech">
                  <div className="mt-6">
                    {userProfile?.techStack.split(",").map((item, index) => (
                      <span
                        key={index}
                        className="p-2 bg-secondary rounded-md text-sm px-3 mx-2"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="social">
                  <div className="mt-6 grid grid-cols-2 gap-4 px-4 items-center">
                    <a
                      href={userProfile?.socialLinks?.portfolio}
                      target="_blank"
                      className="flex items-center gap-3 cursor-pointer "
                    >
                      <Globe size="17" className="" />
                      <span className="text-sm">Portfolio</span>
                    </a>

                    <a
                      href={userProfile?.socialLinks?.github}
                      target="_blank"
                      className="flex items-center gap-3 cursor-pointer "
                    >
                      <Github size={20} className="" />
                      <span className="text-sm">Github</span>
                    </a>

                    <a
                      href={userProfile?.socialLinks?.linkedin}
                      target="_blank"
                      className="flex items-center gap-3 cursor-pointer "
                    >
                      <Linkedin size={20} className="" />
                      <span className="text-sm">Linkedin</span>
                    </a>

                    <a
                      href={userProfile?.socialLinks?.twitter}
                      target="_blank"
                      className="flex items-center gap-3 cursor-pointer "
                    >
                      <Twitter size={18} className="" />
                      <span className="text-sm">Twitter</span>
                    </a>

                    <a
                      href={userProfile?.socialLinks?.youtube}
                      target="_blank"
                      className="flex items-center gap-3 cursor-pointer "
                    >
                      <Youtube size="17" className="" />
                      <span className="text-sm">Youtube</span>
                    </a>

                    <a
                      href={userProfile?.socialLinks?.instagram}
                      target="_blank"
                      className="flex items-center gap-3 cursor-pointer "
                    >
                      <Instagram size="17" className="" />
                      <span className="text-sm">Instagram</span>
                    </a>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-[0.67] bg-card rounded-md border">right</div>
    </div>
  );
};
