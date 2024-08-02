import { Login } from "@/components/Auth/Login";
import { Register } from "@/components/Auth/Register";
import { DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

type AuthPropTypes = {
  closeAuthDialog: () => void;
};

export const Auth = ({ closeAuthDialog }: AuthPropTypes) => {
  const [isLoginRender, setIsLoginRender] = useState(true);

  const handleRenderComp = () => setIsLoginRender((prev) => !prev);

  return (
    <DialogContent showCloseBtn={false} className="sm:max-w-[450px]">
      {isLoginRender ? (
        <Login
          handleRenderComp={handleRenderComp}
          closeAuthDialog={closeAuthDialog}
        />
      ) : (
        <Register
          handleRenderComp={handleRenderComp}
          closeAuthDialog={closeAuthDialog}
        />
      )}
    </DialogContent>
  );
};
