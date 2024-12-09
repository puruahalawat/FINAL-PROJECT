import React from "react";
import { cn } from "../utils";

const Input = React.forwardRef(
  (
    { className, containerClassName, type, label, labelClassName, ...props },
    ref
  ) => {
    return (
      <div className={cn("text-left", containerClassName)}>
        {label && (
          <label
            className={cn(
              "text-sm font-semibold tracking-normal text-dark leading-6 text-left",
              labelClassName
            )}
            htmlFor={props.name}
          >
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn("flex !h-10 text-input", className)}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export default Input;
