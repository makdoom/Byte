import { Route, Routes } from "react-router";
import { Home } from "@/pages/Home";
import { DraftBlog } from "@/pages/DraftBlog";
import { useAuthStore } from "@/store";
import { useLayoutEffect } from "react";
import axiosInstance from "@/config/api";

const App = () => {
  const { isLoading, setUserInfo, setLoading } = useAuthStore();

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
      <div className="w-screen h-screen bg-[#f5f5f5] flex items-center justify-center"></div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/draft" element={<DraftBlog />} />
    </Routes>
  );
};

export default App;
