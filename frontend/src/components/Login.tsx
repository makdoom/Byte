import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinInput, SignupInputType } from "@makdoom/medium-common";
import { Loader } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

type LoginPropTypes = {
  handleRenderComp: () => void;
};

export const Login = ({ handleRenderComp }: LoginPropTypes) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInputType>({ resolver: zodResolver(signinInput) });

  const loginUserHandler: SubmitHandler<SignupInputType> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
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
