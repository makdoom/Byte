import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { About } from "@/components/User/About";
import { Badges } from "@/components/User/Badges";
import { BlogShowcase } from "@/components/User/BlogShowcase";
import { EditProfileDrawer } from "@/components/User/EditProfileDrawer";
import { TechStack } from "@/components/User/TechStack";
import { cn } from "@/lib/utils";
import { Award, Layers3, LucideIcon, Pencil, Rss, User } from "lucide-react";
import { ReactNode, useState } from "react";

type MenuType = { id: number; label: string; name: string; Icon: LucideIcon };

const menus: MenuType[] = [
  {
    id: 1,
    label: "About",
    name: "about",
    Icon: User,
  },
  {
    id: 2,
    label: "Blogs",
    name: "blogs",
    Icon: Rss,
  },
  {
    id: 3,
    label: "Tech Stack",
    name: "tech",
    Icon: Layers3,
  },
  {
    id: 4,
    label: "Badges",
    name: "badges",
    Icon: Award,
  },
];

type MenuEnums = "about" | "blogs" | "tech" | "badges";
type ComponentToRenderType = {
  [key: string]: ReactNode;
};

const ComponentToRender: ComponentToRenderType = {
  about: <About />,
  blogs: <BlogShowcase />,
  tech: <TechStack />,
  badges: <Badges />,
};

export const UserProfile = () => {
  const [selectedMenu, setSelectedMenu] = useState<MenuEnums>("about");
  const [openEditProfileDrawer, setOpenEditProfileDrawer] = useState(false);

  const menuClickHandler = (menuName: MenuEnums) => setSelectedMenu(menuName);

  return (
    <div className="mt-16 flex-1 min-h-screen">
      <div className="md:max-w-screen-xl mx-auto gap-6 border rounded-lg bg-card">
        <div className="h-80 rounded-tl-lg rounded-tr-lg relative">
          <img
            className="h-full w-full rounded-tl-lg rounded-tr-lg"
            src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8NGslMjBkZXNrdG9wJTIwd2FsbGFwZXJ8ZW58MHx8MHx8fDA%3D"
            alt=""
          />

          <div className="h-48 w-48 rounded-full overflow-hidden absolute left-4 -bottom-36 border-4 border-white bg-white">
            <img
              className="h-full w-full rounded-full object-contain"
              src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
        </div>

        <div className="ml-52 p-4 flex justify-between">
          <div>
            <div>
              <h2 className="text-xl font-bold">Makdoom Shaikh</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Software Developer 🧑‍💻 | React Developer 💙 | JavaScript 💯
              </p>
              <span className="text-sm text-muted-foreground">
                Mumbai, Maharashtra, India
              </span>
            </div>

            <div className="flex gap-8 mt-2">
              <div>
                <span className="text-sm text-muted-foreground">Followers</span>
                <p className="font-bold text-lg">2000</p>
              </div>

              <div>
                <span className="text-sm text-muted-foreground">Following</span>
                <p className="font-bold text-lg">100</p>
              </div>
            </div>
          </div>

          <Drawer
            open={openEditProfileDrawer}
            onOpenChange={setOpenEditProfileDrawer}
          >
            <DrawerTrigger
              asChild
              onClick={() => setOpenEditProfileDrawer(true)}
            >
              <Button>
                <Pencil size={16} className="mr-2" />
                Edit Profile
              </Button>
            </DrawerTrigger>
            <EditProfileDrawer
              isOpen={openEditProfileDrawer}
              toggleDrawer={setOpenEditProfileDrawer}
            />
          </Drawer>
        </div>

        <div className="mt-3 flex p-4 gap-2">
          <div className="flex-[0.15] rounded-lg p-2 bg-white">
            {menus.map((item) => (
              <div
                key={item.id}
                onClick={() => menuClickHandler(item.name as MenuEnums)}
                className={cn(
                  "w-full flex items-center gap-2 text-left mb-2 cursor-pointer hover:bg-secondary p-3 rounded-md text-sm",
                  selectedMenu === item.name
                    ? "bg-secondary font-semibold"
                    : "text-muted-foreground"
                )}
              >
                <item.Icon size={17} />
                <p>{item.label}</p>
              </div>
            ))}
          </div>
          <div className="flex-[0.85] bg-secondary p-4 rounded-lg">
            {ComponentToRender[selectedMenu]}
          </div>
        </div>
      </div>
    </div>
  );
};
