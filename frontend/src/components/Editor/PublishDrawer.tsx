import { Button } from "@/components/ui/button";
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CloudUpload, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const PublishDrawer = () => {
  const [coverImg64, setCoverImg64] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setCoverImg64(reader.result?.toString());
          }
        };
        reader.readAsDataURL(file);
      }
    },
    [setCoverImg64]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".png", ".JPEG", ".gif"],
    },
    onDrop: onDrop,
  });

  return (
    <DrawerContent className="p-4 px-16">
      <DrawerHeader>
        <DrawerTitle className="text-2xl">Publish Blog</DrawerTitle>
        <DrawerDescription className="hidden" />
      </DrawerHeader>
      <div className="flex p-3 gap-16">
        <div className="flex flex-[0.5] flex-col gap-3">
          <p className="text-base text-muted-foreground">
            Upload an image to show when your blog appears online or on social
            media. If there’s no image, the cover image will be used instead.
          </p>
          <div
            {...getRootProps()}
            className={cn(
              " hover:bg-secondary rounded-md cursor-pointer flex flex-col items-center justify-center gap-4 border border-dashed border-muted-foreground group",
              !coverImg64 && "py-8"
            )}
          >
            {coverImg64 ? (
              <div className="h-64 overflow-hidden relative">
                <Button
                  variant="destructive"
                  className="rounded-full h-7 w-7 p-0 absolute top-2 right-2"
                  //   onClick={handleRemoveCover}
                >
                  <X size={16} />
                </Button>
                <img src={coverImg64} alt="cover" className="object-cover" />
              </div>
            ) : (
              <div className="h-48 flex justify-center items-center flex-col">
                <input className="hidden" {...getInputProps()} />
                <div className="flex flex-col items-center justify-center">
                  <CloudUpload size={35} />
                  <h5 className="mt-2 font-medium">
                    Choose a file or drag and drop it here
                  </h5>
                  <p className="mt-1 text-sm text-muted-foreground">
                    JPG, JPEG, PNG and GIF formats upto 5MB
                  </p>
                </div>

                <Button
                  variant="secondary"
                  className="mt-3 group-hover:bg-white"
                >
                  Browse Files
                </Button>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold mt-2">Blog Title</h2>
            <p className="text-muted-foreground mt-1">Blog Subtitle</p>
          </div>
        </div>

        <div className="flex-[0.5]">
          <h2 className="text-xl font-medium">Select Tags</h2>
          <p className="text-muted-foreground mt-4">
            Add or change topics (up to 5) so readers know what your story is
            about
          </p>

          <Input placeholder="Add a topic ..." className="h-12 text-md mt-2" />
        </div>
      </div>
      <div className="flex justify-end item-center gap-4">
        <Button size={"lg"} className="py-6" variant="secondary">
          Cancel
        </Button>
        <Button size={"lg"} className="py-6">
          Publish Now
        </Button>
      </div>
    </DrawerContent>
  );
};
