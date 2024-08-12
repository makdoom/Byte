import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PublishedBlogType } from "@makdoom/byte-common";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import moment from "moment";

type FeedCardPropsType = {
  blog: PublishedBlogType;
  navigateToBlog: (blogId: string) => void;
  navigateToUserProfile: (userId: string) => void;
};

export const FeedCard = ({
  blog,
  navigateToBlog,
  navigateToUserProfile,
}: FeedCardPropsType) => {
  return (
    <div className="bg-card rounded-lg p-4 mb-4">
      <div className="flex items-center gap-3">
        <Avatar
          className="cursor-pointer"
          onClick={() => navigateToUserProfile(blog.author.username)}
        >
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div>
          <h4
            className="text-sm font-medium cursor-pointer hover:underline"
            onClick={() => navigateToUserProfile(blog.author.username)}
          >
            {blog.author.name}
          </h4>
          <p
            className="text-xs text-muted-foreground cursor-pointer"
            onClick={() => navigateToUserProfile(blog.author.id)}
          >
            @{blog.author.username} - {moment(blog.publishedAt).fromNow()}
          </p>
        </div>
      </div>

      <div
        className="flex mt-4 justify-between cursor-pointer"
        onClick={() => navigateToBlog(blog.id)}
      >
        <div className="max-w-lg">
          <h3 className="font-semibold text-xl ">{blog.title}</h3>
          {blog.subtitle && (
            <p className="text-muted-foreground mt-1">
              {blog?.subtitle?.length > 120
                ? `${blog.subtitle.slice(0, 120)}...`
                : blog.subtitle}
            </p>
          )}
        </div>
        <div className="w-44 rounded-md">
          <img
            className="w-full h-full rounded-md"
            src="https://pbs.twimg.com/media/GUTXmQxb0AAvccD?format=jpg&name=4096x4096"
            alt="thumbnail"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <Button variant={"ghost"} className="flex items-center gap-2">
            <Heart size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground text-xs">100</span>
          </Button>

          <Button variant={"ghost"} className="flex items-center gap-2">
            <MessageCircle size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground text-xs">20</span>
          </Button>
        </div>

        <Button variant="ghost">
          <Bookmark size={16} className="text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
};
