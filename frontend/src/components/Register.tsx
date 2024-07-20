import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type RegisterPropTypes = {
  handleRenderComp: () => void;
};

export const Register = ({ handleRenderComp }: RegisterPropTypes) => {
  return (
    <DialogHeader>
      <DialogTitle className="text-center text-xl">
        Create Account 🚀
      </DialogTitle>
      <DialogDescription className="text-center mt-1">
        Join Our Community Today
      </DialogDescription>

      <div className="!mt-8 w-[80%] mx-auto ">
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter full name"
              className="h-[40px]"
              autoFocus
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter email" className="h-[40px]" />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Enter Password"
              className="h-[40px]"
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              placeholder="Re-enter Password"
              className="h-[40px]"
            />
          </div>

          <Button className="h-[45px] mt-4">Signup</Button>
        </div>
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
