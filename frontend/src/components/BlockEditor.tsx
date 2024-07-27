import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@/styles/custom-editor.css";

import { Button } from "@/components/ui/button";
import { Captions, Image, X } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CoverImageDialog } from "@/components/CoverImageDialog";
// import { Block } from "@blocknote/core";

export const BlockEditor = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [openCoverImgDialog, setOpenCoverImgDialog] = useState(false);
  // const [blocks, setBlocks] = useState<Block[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const editor = useCreateBlockNote({
    initialContent: undefined,
    uploadFile: async (file: File) => {
      console.log("hello", file);
      return "hello";
    },
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 100) {
      setBlogTitle(e.target.value);
    }
  };

  const handleRemoveCover = () => setCoverImage("");

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [blogTitle]);

  return (
    <div className="">
      <div className=" h-[calc(100vh-90px)] overflow-scroll max-w-screen-xl m-auto no-scrollbar mt-5">
        <div className="max-w-[900px] m-auto mt-4">
          <div className="flex gap-3 items-center">
            {!coverImage && (
              <Dialog
                open={openCoverImgDialog}
                onOpenChange={setOpenCoverImgDialog}
              >
                <DialogTrigger asChild>
                  <Button variant="ghost" className="text-muted-foreground">
                    <Image size={17} />
                    <p className="ml-1">Add Cover</p>
                  </Button>
                </DialogTrigger>
                <CoverImageDialog
                  setCoverImage={setCoverImage}
                  setOpenCoverImgDialog={setOpenCoverImgDialog}
                />
              </Dialog>
            )}

            <Button variant="ghost" className="text-muted-foreground">
              <Captions size={17} />
              <p className="ml-1">Add Subtitle</p>
            </Button>
          </div>

          {coverImage && (
            <div className="mt-3 relative">
              <Button
                variant="destructive"
                className="rounded-full absolute top-3 right-3 h-10 w-10 p-0"
                onClick={handleRemoveCover}
              >
                <X size={19} />
              </Button>

              <img
                src={coverImage}
                alt="cover"
                className="w-full h-80 rounded-md"
              />
            </div>
          )}

          <textarea
            ref={textareaRef}
            value={blogTitle}
            onChange={handleChange}
            placeholder="Blog Title..."
            rows={1}
            className="w-full resize-none overflow-hidden mt-4 font-bold text-4xl outline-none placeholder:text-muted-foreground"
          />

          <div className="relative !-left-12 mt-4">
            <BlockNoteView
              editor={editor}
              theme={"light"}
              // onChange={() => {
              //   setBlocks(editor.document);
              // }}
              className="text-primary"
            />
          </div>
          {/* {JSON.stringify(blocks, null, 2)} */}
        </div>
      </div>
    </div>
  );
};
