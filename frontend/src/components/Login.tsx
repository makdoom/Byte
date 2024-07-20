import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoginPropTypes = {
  handleRenderComp: () => void;
};

export const Login = ({ handleRenderComp }: LoginPropTypes) => {
  return (
    <DialogHeader>
      <DialogTitle className="text-center text-xl">Welcome Home 👋</DialogTitle>
      <DialogDescription className="text-center mt-1">
        Your Gateway to Development Resources
      </DialogDescription>

      <div className="!mt-8 w-[80%] mx-auto ">
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter email"
              className="h-[40px]"
              autoFocus
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Enter Password"
              className="h-[40px]"
            />
          </div>

          <Button className="h-[45px] mt-4">Signin</Button>
        </div>
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
