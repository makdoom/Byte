import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postRequest } from "@/config/api";
import { useAuthStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SiginResSchema,
  SiginResType,
  SigninReqSchema,
  SigninReqType,
} from "@makdoom/byte-common";
import { Loader } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type LoginPropTypes = {
  handleRenderComp: () => void;
  closeAuthDialog: () => void;
};

export const Login = ({
  handleRenderComp,
  closeAuthDialog,
}: LoginPropTypes) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninReqType>({ resolver: zodResolver(SigninReqSchema) });
  const { setUserInfo, setDefaultPage } = useAuthStore((state) => state);

  const loginUserHandler: SubmitHandler<SigninReqType> = async (
    payloadData
  ) => {
    try {
      const response = await postRequest<SigninReqType, SiginResType>(
        "/auth/signin",
        payloadData,
        SigninReqSchema,
        SiginResSchema
      );
      const { data, statusCode, message } = response;
      if (statusCode === 200 && data) {
        localStorage.setItem("accessToken", data.accessToken);
        const { name, email, id } = data;
        setUserInfo({ name, email, id });
        setDefaultPage("feeds");
        closeAuthDialog();
      } else {
        toast.error(message || "Something went wrong while signin user");
      }
    } catch (error) {
      toast.error('"Something went wrong while signin user"');
    }
    // try {
    //   const response = await axiosInstance.post("/auth/signin", data);
    //   const { statusCode, message, accessToken = "" } = response.data;
    //   if (statusCode !== 200) return toast.error(message);

    //   // If user created successfully
    //   localStorage.setItem("accessToken", accessToken);
    //   const { name, email, id } = response.data.data;
    //   setUserInfo({ name, email, id });
    //   closeAuthDialog();
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Something went wrong while resgistering user");
    // }
  };
  return (
    <DialogHeader>
      <DialogTitle className="text-center text-xl">Welcome Home 👋</DialogTitle>
      <DialogDescription className="text-center mt-1">
        Your Gateway to Development Resources
      </DialogDescription>

      <div className="!mt-8 w-[80%] mx-auto ">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(loginUserHandler)}
        >
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter email"
              className="h-[40px]"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-xs text-destructive">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              className="h-[40px]"
              passwordControl
              {...register("password")}
            />
            {errors.password && (
              <span className="text-xs text-destructive">
                {errors.password.message}
              </span>
            )}
          </div>

          <Button disabled={isSubmitting} className="h-[45px] mt-4">
            Signin{" "}
            {isSubmitting && <Loader size={20} className="animate-spin ml-2" />}
          </Button>
        </form>
        <p className="text-sm mt-4 text-center text-muted-foreground">
          Don't have an account ?{" "}
          <span
            className="text-accent-foreground cursor-pointer"
            onClick={handleRenderComp}
          >
            Create One
          </span>
        </p>
      </div>
    </DialogHeader>
  );
};
