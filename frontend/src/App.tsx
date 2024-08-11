import { Route, Routes } from "react-router";
import { Home } from "@/pages/Home";
import { DraftBlog } from "@/pages/DraftBlog";
import { useAuthStore } from "@/store";
import { useLayoutEffect } from "react";
import { getRequest } from "@/config/api";
import { GetUserResSchema, GetUserResType } from "@makdoom/byte-common";
import { toast } from "sonner";
import { PreviewBlog } from "@/pages/PreviewBlog";
import { Blog } from "@/pages/Blog";
import { Feeds } from "@/pages/Feeds";
import { UserProfile } from "@/pages/UserProfile";

const App = () => {
  const { isLoading, setUserInfo, setLoading, setDefaultPage } = useAuthStore();

  useLayoutEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await getRequest<GetUserResType>(
          "/auth/get-user",
          GetUserResSchema
        );
        const { data, statusCode, message } = response;
        if (statusCode === 200 && data) {
          setUserInfo({
            id: data?.id,
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
      <div className="w-screen h-screen bg-secondary flex items-center justify-center"></div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" index element={<Feeds />} />
        <Route path="/blog/:username/:blogId" element={<Blog />} />
        <Route path="/:username" element={<UserProfile />} />
      </Route>

      <Route path="/draft/:blogId" element={<DraftBlog />} />
      <Route path="/preview/:blogId" element={<PreviewBlog />} />
    </Routes>
  );
};

export default App;
