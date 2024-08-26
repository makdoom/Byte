import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
// import { Feeds } from "@/pages/Feeds";
import { Landing } from "@/pages/Landing";
import { useAuthStore } from "@/store";
import { Outlet } from "react-router";

export const Home = () => {
  const { defaultPage } = useAuthStore();

  return (
    <div
      className={cn(
        "bg-[#f9fafb] w-screen flex flex-col",
        defaultPage === "home" && "h-screen"
      )}
    >
      <div className="flex justify-center items-center">
        <Header />
      </div>
      {defaultPage === "feeds" ? <Outlet /> : <Landing />}
    </div>
  );
};
