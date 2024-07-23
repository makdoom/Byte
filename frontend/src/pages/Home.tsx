import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import { Outlet, useLocation } from "react-router";

export const Home = () => {
  const { pathname } = useLocation();

  return (
    <div
      className={cn(
        "bg-[#f5f5f5] w-screen flex flex-col",
        pathname == "/" && "h-screen"
      )}
    >
      <div className="flex justify-center items-center">
        <Header />
      </div>

      <Outlet />
    </div>
  );
};
