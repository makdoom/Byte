import { BlogItem } from "@/components/BlogItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuthStore, useBlogStore } from "@/store";
import { FilePlus2, MoveLeft, PanelLeftClose } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export const Sidebar = () => {
  const { user } = useAuthStore();
  const { drafts } = useBlogStore();
  const { isSidebarOpen, toggleSidebar } = useBlogStore();
  const [openAccordion, setOpenAccordion] = useState("item-2");

  const navigate = useNavigate();

  const navigateToHome = () => navigate("/");

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
          <h5 className="text-xl font-bold">B</h5>
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
                PINNED
              </AccordionTrigger>
              <AccordionContent className="text-center text-muted-foreground text-sm font-normal">
                Your pinned drafts from blog would appear here
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="border-0 mb-2" value="item-2">
              <AccordionTrigger className="text-muted-foreground hover:no-underline text-xs hover:text-primary">
                MY DRAFTS {drafts.length ? `(${drafts.length})` : ""}
              </AccordionTrigger>

              {drafts.length > 0 ? (
                <AccordionContent>
                  {drafts.map((blog) => (
                    <BlogItem key={blog.id} blog={blog} />
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
