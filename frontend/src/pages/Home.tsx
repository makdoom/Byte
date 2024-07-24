import { Header } from "@/components/Header";
import axiosInstance from "@/config/api";
import { cn } from "@/lib/utils";
import { Feeds } from "@/pages/Feeds";
import { Landing } from "@/pages/Landing";
import { useAuthStore } from "@/store";
// import { Loader } from "lucide-react";
import { useLayoutEffect } from "react";

export const Home = () => {
  const { isLoading, isLoggedIn, setUserInfo, setLoading } = useAuthStore();

  useLayoutEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/auth/get-user");
        if (response.data?.isAuthorized) {
          setUserInfo(response.data?.data);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    })();
  }, [setUserInfo, setLoading]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-[#f5f5f5] flex items-center justify-center">
        {/* <Loader size={20} className="animate-spin" /> */}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-[#f5f5f5] w-screen flex flex-col",
        !isLoggedIn && "h-screen"
      )}
    >
      <div className="flex justify-center items-center">
        <Header />
      </div>
      {isLoggedIn ? <Feeds /> : <Landing />}
    </div>
  );
};
