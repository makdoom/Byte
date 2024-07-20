import { Login } from "@/components/Login";
import { Register } from "@/components/Register";
import { DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

export const Auth = () => {
  const [isLoginRender, setIsLoginRender] = useState(true);

  const handleRenderComp = () => setIsLoginRender((prev) => !prev);

  return (
    <DialogContent showCloseBtn={false} className="sm:max-w-[450px]">
      {isLoginRender ? (
        <Login handleRenderComp={handleRenderComp} />
      ) : (
        <Register handleRenderComp={handleRenderComp} />
      )}
    </DialogContent>
  );
};
