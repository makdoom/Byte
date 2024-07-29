import { Route, Routes } from "react-router";
import { Home } from "@/pages/Home";
import { DraftBlog } from "@/pages/DraftBlog";
import { useAuthStore } from "@/store";
import { useLayoutEffect } from "react";
import { getRequest } from "@/config/api";
import { GetUserResSchema, GetUserResType } from "@makdoom/byte-common";
import { toast } from "sonner";

const App = () => {
  const { isLoading, setUserInfo, setLoading, setDefaultPage } = useAuthStore();

  useLayoutEffect(() => {
    (async () => {
      console.log("from app");
      try {
        setLoading(true);
        const response = await getRequest<GetUserResType>(
          "/auth/get-user",
          GetUserResSchema
        );
        const { data, statusCode, message } = response;
        if (statusCode === 200) {
          setUserInfo({
            id: data.id,
            email: data.email,
            name: data.name,
          });
          setDefaultPage("feeds");
        } else {
          toast.error(message);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        // console.log(error);
      }
    })();
  }, [setUserInfo, setLoading, setDefaultPage]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-[#f5f5f5] flex items-center justify-center"></div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/draft/:blogId" element={<DraftBlog />} />
    </Routes>
  );
};

export default App;
