import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { postRequest } from "@/config/api";
import { cn } from "@/lib/utils";
import { createFormData } from "@/utils";
import {
  UploadSingleFileRes,
  UploadSingleImageResType,
  UploadSingleImageSchema,
  UploadSingleImageType,
} from "@makdoom/byte-common";
import { CloudUpload, Loader, X } from "lucide-react";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

type coverImageDialog = {
  setCoverImage: (base64: string) => void;
  setOpenCoverImgDialog: Dispatch<SetStateAction<boolean>>;
};

export const CoverImageDialog = ({
  setCoverImage,
  setOpenCoverImgDialog,
}: coverImageDialog) => {
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [previewImageURL, setPreviewImageURL] = useState("");
  const [isImageUploading, setIsImageUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setCoverImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPreviewImageURL(reader.result?.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".png", ".JPEG", ".gif"],
    },
    onDrop: onDrop,
  });

  const uploadHandler = async () => {
    try {
      if (!coverImageFile) return;

      setIsImageUploading(true);
      const formData = createFormData({
        image: coverImageFile,
        data: { publicId: "hello" },
      });

      const response = await postRequest<
        UploadSingleImageType,
        UploadSingleImageResType
      >(
        "/misc/uploadImage",
        formData,
        UploadSingleImageSchema,
        UploadSingleFileRes
      );
      setIsImageUploading(false);
      const { data, statusCode, message } = response;
      if (statusCode === 200 && data) {
        setOpenCoverImgDialog(false);
        setCoverImage(data.fileURL);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Error while uploading image");
    }
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
          !previewImageURL && "py-8"
        )}
      >
        {previewImageURL ? (
          <div className="h-72 overflow-hidden relative">
            <Button
              variant="destructive"
              className="rounded-full h-7 w-7 p-0 absolute top-2 right-2"
              onClick={handleRemoveCover}
            >
              <X size={16} />
            </Button>
            <img src={previewImageURL} alt="cover" className="object-cover" />
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
        <Button onClick={uploadHandler}>
          {isImageUploading && (
            <Loader size={16} className="animate-spin mr-2" />
          )}
          Upload
        </Button>
      </div>
    </DialogContent>
  );
};
