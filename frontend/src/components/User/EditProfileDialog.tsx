import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { About } from "@/components/User/About";
import { PersonalDetails } from "@/components/User/PersonalDetails";
import { SocialLinks } from "@/components/User/SocialLinks";
import { TechStack } from "@/components/User/TechStack";
import { postRequest } from "@/config/api";
import { createFormData } from "@/utils";
import { UserToEditSchema, UserToEditType } from "@/utils/types";
import {
  UploadSingleFileRes,
  UploadSingleImageResType,
  UploadSingleImageSchema,
  UploadSingleImageType,
  UserProfileRes,
  UserProfileResTpe,
  UserProfileType,
} from "@makdoom/byte-common";
import { Loader, Pencil, X } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type EditProfileDialogPropsType = {
  user: UserProfileType | null;
  updateUser: (updatedUserObj: UserProfileType) => void;
};

export const EditProfileDialog = ({
  user,
  updateUser,
}: EditProfileDialogPropsType) => {
  const [updateProfileLoading, setUpdateProfileLoading] = useState(false);
  const [userToEdit, setUserToEdit] = useState<UserToEditType>(
    {} as UserToEditType
  );
  const coverImageRef = useRef<HTMLInputElement>(null);
  const avatarImageRef = useRef<HTMLInputElement>(null);
  const [showSpinner, setShowSpinner] = useState({ show: false, openFor: "" });

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>,
    type: "profileURL" | "coverImage"
  ) => {
    const imageFile = event.target.files?.[0];
    if (!imageFile) return;

    let publicId: string = "";
    if (type === "profileURL") {
      if (typeof userToEdit.profileURL === "string" && userToEdit.profileURL) {
        publicId = userToEdit.profileURL.includes("/")
          ? userToEdit.profileURL.split("/").pop() || ""
          : "";
      }
    } else {
      if (typeof userToEdit.coverImage === "string" && userToEdit.coverImage) {
        publicId = userToEdit.coverImage.includes("/")
          ? userToEdit.coverImage.split("/").pop() || ""
          : "";
      }
    }
    try {
      setShowSpinner({ show: true, openFor: type });
      const formData = createFormData({
        image: imageFile,
        data: { publicId: publicId },
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
      setShowSpinner({ show: false, openFor: "" });
      const { data, statusCode, message } = response;
      if (statusCode === 200 && data) {
        setUserToEdit((prev) => ({ ...prev, [type]: data.fileURL }));
      } else {
        toast.error(message);
      }
    } catch (error) {
      setShowSpinner({ show: false, openFor: "" });
      toast.error("something went wrong while updating user cover image");
    }
  };

  const userChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    isSocialLink: boolean = false
  ) => {
    const { name, value } = event.target;
    if (isSocialLink) {
      setUserToEdit((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [name]: value,
        },
      }));
    } else {
      setUserToEdit((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const updateHandler = async () => {
    try {
      setUpdateProfileLoading(true);
      const response = await postRequest<UserToEditType, UserProfileResTpe>(
        "/user/updateUserProfile",
        userToEdit,
        UserToEditSchema,
        UserProfileRes
      );
      setUpdateProfileLoading(false);

      const { statusCode, data, message } = response;
      if (statusCode == 200 && data) {
        updateUser(data);
        toast.success("Profile updated successfully");
      } else {
        toast.error(message);
      }
    } catch (error) {
      setUpdateProfileLoading(false);

      toast.error("Error while updating user information");
    }
  };

  useEffect(() => {
    if (user) {
      setUserToEdit({
        name: user.name,
        bio: user.bio,
        email: user.email,
        coverImage: user.coverImage,
        profileTagline: user.profileTagline,
        profileURL: user.profileURL,
        techStack: user.techStack,
        location: user.location,
        socialLinks: {
          portfolio: user.socialLinks?.portfolio
            ? user.socialLinks?.portfolio
            : "",
          github: user.socialLinks?.github ? user.socialLinks?.github : "",
          linkedin: user.socialLinks?.linkedin
            ? user.socialLinks?.linkedin
            : "",
          twitter: user.socialLinks?.twitter ? user.socialLinks?.twitter : "",
          instagram: user.socialLinks?.instagram
            ? user.socialLinks?.instagram
            : "",
          youtube: user.socialLinks?.youtube ? user.socialLinks?.youtube : "",
        },
      });
    }
  }, [user]);

  console.log(userToEdit);
  return (
    <DialogContent className="sm:max-w-screen-sm">
      <DialogTitle>Edit Information</DialogTitle>
      <DialogDescription className="hidden" />
      <div className="relative w-full">
        <div className="relative">
          <div className="relative rounded-sm overflow-hidden h-52">
            {userToEdit?.coverImage ? (
              <img
                className="w-full h-full object-cover"
                src={userToEdit?.coverImage}
                alt="cover"
              />
            ) : (
              <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 h-full w-full"></div>
            )}

            <div className="absolute right-2 top-2 flex gap-2">
              <Button
                className="rounded-full h-8 w-8 p-0 shadow-lg"
                onClick={() => coverImageRef.current?.click()}
              >
                <input
                  type="file"
                  className="hidden"
                  ref={coverImageRef}
                  onChange={(event) => handleImageChange(event, "coverImage")}
                />
                {showSpinner.show && showSpinner.openFor === "coverImage" ? (
                  <Loader className="animate-spin" size={14} />
                ) : (
                  <Pencil size={14} />
                )}
              </Button>

              {userToEdit?.coverImage && (
                <Button
                  variant="destructive"
                  className="rounded-full h-8 w-8 p-0 shadow-md"
                >
                  <X size={14} />
                </Button>
              )}
            </div>
          </div>

          <div className="absolute top-[100%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <Avatar className="h-32 w-32 shadow-lg border-4 border-card">
                <AvatarImage
                  className="object-cover"
                  src={userToEdit.profileURL}
                />
                <AvatarFallback className="text-5xl font-semibold">
                  {userToEdit?.name?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="absolute right-1 bottom-2">
                <Button
                  className="rounded-full h-8 w-8 p-0 shadow-md"
                  onClick={() => avatarImageRef.current?.click()}
                >
                  <input
                    type="file"
                    className="hidden"
                    ref={avatarImageRef}
                    onChange={(event) => handleImageChange(event, "profileURL")}
                  />
                  {showSpinner.show && showSpinner.openFor === "profileURL" ? (
                    <Loader className="animate-spin" size={14} />
                  ) : (
                    <Pencil size={14} />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 max-h-[400px] overflow-scroll">
          <Tabs defaultValue="personal-details" className="w-full p-4">
            <TabsList className="w-full flex h-full">
              <TabsTrigger
                value="personal-details"
                className="flex-1 text-sm p-2"
              >
                Personal Details
              </TabsTrigger>
              <TabsTrigger value="about" className="flex-1 text-sm p-2">
                About
              </TabsTrigger>
              <TabsTrigger value="tech" className="flex-1 text-sm p-2">
                Tech Stack
              </TabsTrigger>
              <TabsTrigger value="social" className="flex-1 text-sm p-2">
                Social
              </TabsTrigger>
            </TabsList>
            <TabsContent value="personal-details" className="mt-4">
              <PersonalDetails
                user={userToEdit}
                userChangeHandler={userChangeHandler}
              />
            </TabsContent>
            <TabsContent value="about" className="mt-4">
              <About user={userToEdit} userChangeHandler={userChangeHandler} />
            </TabsContent>
            <TabsContent value="tech" className="mt-4">
              <TechStack
                user={userToEdit}
                userChangeHandler={userChangeHandler}
              />
            </TabsContent>
            <TabsContent value="social" className="mt-4">
              <SocialLinks
                user={userToEdit}
                userChangeHandler={userChangeHandler}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <DialogFooter className="mt-4">
        <Button variant="secondary">Cancel</Button>
        <Button onClick={updateHandler}>
          {updateProfileLoading && (
            <Loader size={16} className="animate-spin mr-2" />
          )}
          Update
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
