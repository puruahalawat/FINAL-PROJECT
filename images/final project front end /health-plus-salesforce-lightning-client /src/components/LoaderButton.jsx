import React from "react";
import { cn } from "../utils";
import Spinner from "react-spinner-material";

const LoaderButton = ({
  children,
  className,
  isLoading,
  disabled,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={isLoading || disabled}
      className={cn(
        "transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] ring-opacity-100 ring-[#F1F5F9] shadow-md outline-offset-2 font-semibold text-[0.938rem] leading-[1.5rem] py-3 px-7 bg-primary text-white rounded-md gap-2.5 items-center justify-center inline-flex",
        className
      )}
    >
      {isLoading ? (
        <Spinner radius={22} color={"#ffffff"} stroke={2} visible />
      ) : (
        children
      )}
    </button>
  );
};

export default LoaderButton;
