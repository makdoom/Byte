import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { CloudUpload, X } from "lucide-react";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type coverImageDialog = {
  setCoverImage: (base64: string) => void;
  setOpenCoverImgDialog: Dispatch<SetStateAction<boolean>>;
};

export const CoverImageDialog = ({
  setCoverImage,
  setOpenCoverImgDialog,
}: coverImageDialog) => {
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

  const uploadHandler = () => {
    setOpenCoverImgDialog(false);
    setCoverImage(coverImg64);
  };

  const cancelHandler = () => {
    setOpenCoverImgDialog(false);
  };

  const handleRemoveCover = () => setCoverImage("");

  return (
    <DialogContent showCloseBtn={false} className="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle className="">Upload Cover Image</DialogTitle>
        <DialogDescription className="hidden" />
      </DialogHeader>

      <div
        {...getRootProps()}
        className={cn(
          "cursor-pointer flex flex-col items-center justify-center gap-4 border border-dashed",
          !coverImg64 && "py-8"
        )}
      >
        {coverImg64 ? (
          <div className="h-72 overflow-hidden relative">
            <Button
              variant="destructive"
              className="rounded-full h-7 w-7 p-0 absolute top-2 right-2"
              onClick={handleRemoveCover}
            >
              <X size={16} />
            </Button>
            <img src={coverImg64} alt="cover" className="object-cover" />
          </div>
        ) : (
          <>
            <input className="hidden" {...getInputProps()} />
            <div className="flex flex-col items-center justify-center">
              <CloudUpload size={35} />
              <h5 className="mt-2 font-medium">
                Choose a file or drag and drop it here
              </h5>
              <p className="mt-1 text-sm text-muted-foreground">
                JPG, JPEG, PNG and GIF formats upto 50MB
              </p>
            </div>

            <Button variant="secondary" className="mt-3">
              Browse Files
            </Button>
          </>
        )}
      </div>

      <div className="flex justify-end item-center gap-4">
        <Button variant="secondary" onClick={cancelHandler}>
          Cancel
        </Button>
        <Button onClick={uploadHandler}>Upload</Button>
      </div>
    </DialogContent>
  );
};
