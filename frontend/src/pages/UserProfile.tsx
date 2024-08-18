import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ExternalLink,
  Github,
  Globe,
  Linkedin,
  Pencil,
  Twitter,
  Youtube,
} from "lucide-react";

export const UserProfile = () => {
  return (
    <div className="pt-16 pb-4 flex-1 min-h-screen w-full px-8 flex gap-3">
      <div className="flex-[0.3] bg-card rounded-md">
        <div>
          <div className="relative">
            <div className="relative rounded-tl-md rounded-tr-md overflow-hidden h-40">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8NGslMjBkZXNrdG9wJTIwd2FsbGFwZXJ8ZW58MHx8MHx8fDA%3D"
                alt=""
              />
            </div>
            <div className="absolute left-4 -bottom-12">
              <Avatar className="h-24 w-24 shadow-lg border-4 border-card">
                <AvatarImage
                  className="object-cover"
                  src="https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              </Avatar>
              {/* <img
                src="https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              /> */}
            </div>
          </div>

          <div className="flex justify-end p-2 px-4">
            <Button size={"sm"}>
              <Pencil size={12} className="mr-2" />
              Edit
            </Button>
          </div>

          <div className="px-4 mt-2 flex flex-col gap-4">
            <div>
              <div className="flex gap-2 items-center">
                <p className="font-semibold">Makdoom Shaikh</p>
                <span className="text-xs text-muted-foreground">@makdoom</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Coding the future, one project at a time
              </p>
              <div className="flex items-center justify-between my-2">
                <span className="text-sm text-muted-foreground">
                  Mumbai, India
                </span>
                <span className="text-sm text-muted-foreground">
                  Joined 2021
                </span>
                <Button
                  variant="link"
                  className="text-blue-700 hover:no-underline"
                >
                  Portfolio{" "}
                  <ExternalLink size="15" className="ml-2 underline" />
                </Button>
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
              <Tabs defaultValue="about" className="w-[400px]">
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
                  <p className="font-normal text-muted-foreground">
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
                    <span className="p-2 bg-secondary rounded-md text-sm px-3">
                      Javascript
                    </span>
                  </div>
                </TabsContent>
                <TabsContent value="social">
                  <div className="mt-6 grid grid-cols-2 gap-4 px-4">
                    <Button
                      variant="ghost"
                      className="flex items-center gap-3 cursor-pointer "
                    >
                      <Globe size="17" className="" />
                      <span className="text-sm">Portfolio</span>
                    </Button>

                    <Button
                      variant="ghost"
                      className="flex items-center gap-3 cursor-pointer "
                    >
                      <Github size={20} className="" />
                      <span className="text-sm">Github</span>
                    </Button>

                    <Button
                      variant="ghost"
                      className="flex items-center gap-3 cursor-pointer "
                    >
                      <Linkedin size={20} className="" />
                      <span className="text-sm">Linkedin</span>
                    </Button>

                    <Button
                      variant="ghost"
                      className="flex items-center gap-3 cursor-pointer "
                    >
                      <Twitter size={18} className="" />
                      <span className="text-sm">Twitter</span>
                    </Button>

                    <Button
                      variant="ghost"
                      className="flex items-center gap-3 cursor-pointer "
                    >
                      <Youtube size="17" className="" />
                      <span className="text-sm">Youtube</span>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-[0.7] bg-card rounded-md">right</div>
    </div>
  );
};

// import { Button } from "@/components/ui/button";
// import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
// import { About } from "@/components/User/About";
// import { Badges } from "@/components/User/Badges";
// import { BlogShowcase } from "@/components/User/BlogShowcase";
// import { EditProfileDrawer } from "@/components/User/EditProfileDrawer";
// import { TechStack } from "@/components/User/TechStack";
// import { getRequest } from "@/config/api";
// import { cn } from "@/lib/utils";
// import { UserProfileRes, UserProfileResTpe } from "@makdoom/byte-common";
// import { Award, Layers3, LucideIcon, Pencil, Rss, User } from "lucide-react";
// import { ReactNode, useEffect, useState } from "react";
// import { toast } from "sonner";

// type MenuType = { id: number; label: string; name: string; Icon: LucideIcon };

// const menus: MenuType[] = [
//   {
//     id: 1,
//     label: "About",
//     name: "about",
//     Icon: User,
//   },
//   {
//     id: 2,
//     label: "Blogs",
//     name: "blogs",
//     Icon: Rss,
//   },
//   {
//     id: 3,
//     label: "Tech Stack",
//     name: "tech",
//     Icon: Layers3,
//   },
//   {
//     id: 4,
//     label: "Badges",
//     name: "badges",
//     Icon: Award,
//   },
// ];

// type MenuEnums = "about" | "blogs" | "tech" | "badges";
// type ComponentToRenderType = {
//   [key: string]: ReactNode;
// };

// const ComponentToRender: ComponentToRenderType = {
//   about: <About />,
//   blogs: <BlogShowcase />,
//   tech: <TechStack />,
//   badges: <Badges />,
// };

// export const UserProfile = () => {
//   const [selectedMenu, setSelectedMenu] = useState<MenuEnums>("about");
//   const [openEditProfileDrawer, setOpenEditProfileDrawer] = useState(false);

//   const menuClickHandler = (menuName: MenuEnums) => setSelectedMenu(menuName);

//   useEffect(() => {
//     (async () => {
//       try {
//         const response = await getRequest<UserProfileResTpe>(
//           "/user/get-user",
//           UserProfileRes
//         );
//         const { statusCode, message, data } = response;
//         if (statusCode === 200 && data) {
//           console.log(data);
//         } else {
//           toast.error(message);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     })();
//   }, []);

//   return (
//     <div className="mt-16 flex-1 min-h-screen">
//       <div className="md:max-w-screen-xl mx-auto gap-6 border rounded-lg bg-card">
//         <div className="h-80 rounded-tl-lg rounded-tr-lg relative">
//           <img
//             className="h-full w-full rounded-tl-lg rounded-tr-lg"
//             src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8NGslMjBkZXNrdG9wJTIwd2FsbGFwZXJ8ZW58MHx8MHx8fDA%3D"
//             alt=""
//           />

//           <div className="h-48 w-48 rounded-full overflow-hidden absolute left-4 -bottom-36 border-4 border-white bg-white">
//             <img
//               className="h-full w-full rounded-full object-contain"
//               src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//               alt=""
//             />
//           </div>
//         </div>

//         <div className="ml-52 p-4 flex justify-between">
//           <div>
//             <div>
//               <h2 className="text-xl font-bold">Makdoom Shaikh</h2>
//               <p className="mt-1 text-sm text-muted-foreground">
//                 Software Developer 🧑‍💻 | React Developer 💙 | JavaScript 💯
//               </p>
//               <span className="text-sm text-muted-foreground">
//                 Mumbai, Maharashtra, India
//               </span>
//             </div>

//             <div className="flex gap-8 mt-2">
//               <div>
//                 <span className="text-sm text-muted-foreground">Followers</span>
//                 <p className="font-bold text-lg">2000</p>
//               </div>

//               <div>
//                 <span className="text-sm text-muted-foreground">Following</span>
//                 <p className="font-bold text-lg">100</p>
//               </div>
//             </div>
//           </div>

//           <Drawer
//             open={openEditProfileDrawer}
//             onOpenChange={setOpenEditProfileDrawer}
//           >
//             <DrawerTrigger
//               asChild
//               onClick={() => setOpenEditProfileDrawer(true)}
//             >
//               <Button>
//                 <Pencil size={16} className="mr-2" />
//                 Edit Profile
//               </Button>
//             </DrawerTrigger>
//             <EditProfileDrawer
//               isOpen={openEditProfileDrawer}
//               toggleDrawer={setOpenEditProfileDrawer}
//             />
//           </Drawer>
//         </div>

//         <div className="mt-3 flex p-4 gap-2">
//           <div className="flex-[0.15] rounded-lg p-2 bg-white">
//             {menus.map((item) => (
//               <div
//                 key={item.id}
//                 onClick={() => menuClickHandler(item.name as MenuEnums)}
//                 className={cn(
//                   "w-full flex items-center gap-2 text-left mb-2 cursor-pointer hover:bg-secondary p-3 rounded-md text-sm",
//                   selectedMenu === item.name
//                     ? "bg-secondary font-semibold"
//                     : "text-muted-foreground"
//                 )}
//               >
//                 <item.Icon size={17} />
//                 <p>{item.label}</p>
//               </div>
//             ))}
//           </div>
//           <div className="flex-[0.85] bg-secondary p-4 rounded-lg">
//             {ComponentToRender[selectedMenu]}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
