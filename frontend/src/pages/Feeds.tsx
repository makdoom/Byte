import { FeedCard } from "@/components/FeedCard";
import { getRequest } from "@/config/api";
import { useBlogStore } from "@/store";
import {
  AllPublishedBlogResSchema,
  AllPublishedBlogResType,
} from "@makdoom/byte-common";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const Feeds = () => {
  const { feedsList, setFeedsList } = useBlogStore();

  const navigate = useNavigate();

  const navigateToBlog = (blogId: string) =>
    navigate(`/blog/makdoom/${blogId}`);

  const navigateToUserProfile = (userId: string) => {
    console.log(userId);
    navigate(`/${userId}`);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getRequest<AllPublishedBlogResType>(
          "/blogs",
          AllPublishedBlogResSchema
        );
        const { data, statusCode, message } = response;
        if (statusCode === 200 && data?.length) {
          setFeedsList(data);
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong while fetching blogs list");
      }
    })();
  }, [setFeedsList]);

  return (
    <div className="mt-20 flex-1 min-h-screen">
      <div className="md:max-w-[1200px] mx-auto flex gap-6">
        <div className="flex-[0.65]">
          {feedsList.map((blog) => (
            <FeedCard
              key={blog.id}
              blog={blog}
              navigateToBlog={navigateToBlog}
              navigateToUserProfile={navigateToUserProfile}
            />
          ))}
        </div>
        <div className="border flex-[0.35]">Right</div>
      </div>
    </div>
  );
};
