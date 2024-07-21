// import { ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupInputType, signupInput } from "@makdoom/medium-common";
import { Loader } from "lucide-react";
// import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";

type RegisterPropTypes = {
  handleRenderComp: () => void;
};

export const Register = ({ handleRenderComp }: RegisterPropTypes) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInputType>({ resolver: zodResolver(signupInput) });

  const registerUserHandler: SubmitHandler<SignupInputType> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  return (
    <DialogHeader>
      <DialogTitle className="text-center text-xl">
        Create Account 🚀
      </DialogTitle>
      <DialogDescription className="text-center mt-1">
        Join Our Community Today
      </DialogDescription>

      <div className="!mt-8 w-[80%] mx-auto ">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(registerUserHandler)}
        >
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter full name"
              className="h-[40px]"
              autoFocus
              {...register("name")}
            />
          </div>
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
              {...register("password")}
            />
            {errors.password && (
              <span className="text-xs text-destructive">
                {errors.password.message}
              </span>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter Password"
              className="h-[40px]"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className="text-xs text-destructive">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <Button disabled={isSubmitting} className="h-[45px] mt-4">
            Signup{" "}
            {isSubmitting && <Loader size={20} className="animate-spin ml-2" />}
          </Button>
        </form>
        <p className="text-sm mt-4 text-center text-muted-foreground">
          Already have an account ?{" "}
          <span
            className="text-accent-foreground cursor-pointer"
            onClick={handleRenderComp}
          >
            Signin
          </span>
        </p>
      </div>
    </DialogHeader>
  );
};
