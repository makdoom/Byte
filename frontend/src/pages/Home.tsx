import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import { Feeds } from "@/pages/Feeds";
import { Landing } from "@/pages/Landing";
import { useAuthStore } from "@/store";

export const Home = () => {
  const { isLoggedIn } = useAuthStore();

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
