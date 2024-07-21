import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  passwordControl?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ passwordControl = false, className, type, ...props }, ref) => {
    const [customType, setCustomType] = React.useState(type);

    const toggleCustomTypeHandler = () => {
      if (passwordControl) {
        setCustomType((prev) => (prev === "password" ? "text" : "password"));
      }
    };
    return (
      <div
        className={cn(
          "flex items-center",
          passwordControl &&
            "border border-input rounded-md shadow-sm focus-within:outline-none focus-within:ring-1 focus-within:ring-ring pr-2"
        )}
      >
        <input
          type={passwordControl ? customType : type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            passwordControl &&
              "border-0 focus-visible:ring-0 rounded-none shadow-none",
            className
          )}
          ref={ref}
          {...props}
        />
        {passwordControl && (
          <div className="cursor-pointer" onClick={toggleCustomTypeHandler}>
            {customType === "password" ? (
              <EyeOff size={17} />
            ) : (
              <Eye size={17} />
            )}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
