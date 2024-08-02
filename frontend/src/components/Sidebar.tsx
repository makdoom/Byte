import { BlogItem } from "@/components/BlogItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postRequest } from "@/config/api";
import { cn } from "@/lib/utils";
import { useAuthStore, useBlogStore } from "@/store";
import {
  BlogResSchema,
  BlogResType,
  DeleteBlogPayload,
  DeleteBlogResSchema,
  DeleteBlogResType,
  DeleteBlogType,
  EmptyDraftSchema,
  EmptyDraftType,
  PinBlogPayload,
  PinBlogResSchema,
  PinBlogResType,
  PinBlogType,
} from "@makdoom/byte-common";
import { FilePlus2, MoveLeft, PanelLeftClose } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useBlogStore();
  const [openAccordion, setOpenAccordion] = useState("item-2");
  const { user } = useAuthStore();
  const {
    blogList,
    pinnedCount,
    draftsCount,
    updateDraftBlogs,
    deleteDraft,
    addIntoPinnedBlogs,
  } = useBlogStore();

  const navigate = useNavigate();

  const navigateToHome = () => navigate("/");

  const createNewBlogHandler = async () => {
    try {
      const payload = { userId: user?.id ?? "" };
      const response = await postRequest<EmptyDraftType, BlogResType>(
        "/blogs/new",
        payload,
        EmptyDraftSchema,
        BlogResSchema
      );
      const { data, statusCode, message } = response;
      if (statusCode === 200 && data) {
        updateDraftBlogs(data);
        navigate(`/draft/${data.id}`);
        toast.success("New empty draft added");
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Something went wrong while creating draft");
    }
  };

  const deleteBlogHandler = async (id: string) => {
    try {
      const response = await postRequest<DeleteBlogType, DeleteBlogResType>(
        "/blogs/delete-blog",
        { blogId: id },
        DeleteBlogPayload,
        DeleteBlogResSchema
      );
      const { statusCode, message } = response;
      if (statusCode === 200) {
        deleteDraft(id);
        toast.success("Blog deleted successfully");
      } else {
        toast.error(message);
      }
      console.log(response);
    } catch (error) {
      toast.error("Something went wrong while deleting blog");
    }
  };

  const pinBlogHandler = async (id: string, isPinned: boolean) => {
    try {
      const response = await postRequest<PinBlogType, PinBlogResType>(
        "/blogs/pin-blog",
        { blogId: id, isPinned },
        PinBlogPayload,
        PinBlogResSchema
      );
      const { statusCode, message, data } = response;
      if (statusCode === 200 && data) {
        addIntoPinnedBlogs(data.id);
        toast.success("Blog pinned successfully");
      } else {
        toast.error(message);
      }
      console.log(response);
    } catch (error) {
      toast.error("Something went wrong while deleting blog");
    }
  };

  const navigateToBlog = (id: string) => navigate(`/draft/${id}`);

  return (
    <div
      className={cn(
        "h-screen transition-all duration-300 ease-in-out",
        isSidebarOpen ? "w-[280px]" : "w-0"
      )}
    >
      <div
        className={cn(
          "h-screen border-r flex flex-col",
          isSidebarOpen ? "flex flex-col" : "hidden"
        )}
      >
        <div className="p-4 flex gap-4 items-center">
          <h5 className="text-2xl font-extrabold">B</h5>
          <p className="flex-1 text-sm font-medium">{user?.name}</p>
          <Button variant="ghost" className="h-8 p-2" onClick={toggleSidebar}>
            <PanelLeftClose size="18" />
          </Button>
        </div>

        <div className="p-4 pt-2">
          <Input autoFocus placeholder="Search Drafts" />
        </div>

        <div className="p-4 pt-2">
          <Button
            variant="ghost"
            className="w-full justify-start px-2 gap-2 font-medium"
            onClick={createNewBlogHandler}
          >
            <FilePlus2 size={17} />
            <p className="font-medium text-muted-foreground">New Draft</p>
          </Button>
        </div>

        <div className="flex-1 p-4 pt-2">
          <Accordion
            type="single"
            collapsible
            value={openAccordion}
            onValueChange={setOpenAccordion}
          >
            <AccordionItem className="border-0 mb-2" value="item-1">
              <AccordionTrigger className="text-muted-foreground hover:no-underline text-xs hover:text-primary">
                PINNED {pinnedCount ? `(${pinnedCount})` : ""}
              </AccordionTrigger>
              {blogList.length > 0 ? (
                <AccordionContent className="max-h-80 overflow-scroll no-scrollbar">
                  {blogList
                    .filter((blog) => blog.isPinned)
                    .map((blog) => (
                      <BlogItem
                        key={blog.id}
                        blog={blog}
                        deleteBlogHandler={deleteBlogHandler}
                        pinBlogHandler={pinBlogHandler}
                        navigateToBlog={navigateToBlog}
                      />
                    ))}
                </AccordionContent>
              ) : (
                <AccordionContent className="text-center text-muted-foreground text-sm font-normal">
                  Your pinned drafts from blog would appear here
                </AccordionContent>
              )}
            </AccordionItem>

            <AccordionItem className="border-0 mb-2" value="item-2">
              <AccordionTrigger className="text-muted-foreground hover:no-underline text-xs hover:text-primary">
                MY DRAFTS {draftsCount ? `(${draftsCount})` : ""}
              </AccordionTrigger>

              {blogList.length > 0 ? (
                <AccordionContent className="max-h-80 overflow-scroll no-scrollbar">
                  {blogList
                    .filter((blog) => blog.isDraft)
                    .map((blog) => (
                      <BlogItem
                        key={blog.id}
                        blog={blog}
                        deleteBlogHandler={deleteBlogHandler}
                        pinBlogHandler={pinBlogHandler}
                        navigateToBlog={navigateToBlog}
                      />
                    ))}
                </AccordionContent>
              ) : (
                <AccordionContent className="text-center text-muted-foreground text-sm font-normal">
                  You dont have any drafts{" "}
                </AccordionContent>
              )}
            </AccordionItem>

            <AccordionItem className="border-0" value="item-3">
              <AccordionTrigger className="text-muted-foreground hover:no-underline text-xs hover:text-primary">
                PUBLISHED
              </AccordionTrigger>
              <AccordionContent className="text-center text-muted-foreground text-sm font-normal">
                You have not published anything
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="p-4">
          <Button size="lg" className="w-full py-6" onClick={navigateToHome}>
            <MoveLeft />
            <p className="ml-2">Back to Byte</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
