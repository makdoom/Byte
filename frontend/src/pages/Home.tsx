import { Header } from "@/components/Header";
import { Outlet } from "react-router";

export const Home = () => {
  return (
    <div className={"bg-[#f5f5f5] h-screen w-screen flex flex-col"}>
      <Header />
      <Outlet />
    </div>
  );
};
