import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../utils";

const Footer = ({ isAdmin }) => {
  return (
    <footer>
      <div
        className={cn(
          "w-full mx-auto px-8 sm:px-12",
          isAdmin ? "" : "max-w-screen-xl "
        )}
      >
        <div className="flex-shrink-0 relative flex pt-8 items-center flex-row justify-between gap-8 sm:gap-0 w-full border-t border-t-neutral-200">
          <Link
            aria-label="Home"
            className="items-center flex flex-shrink-0"
            href="/"
          >
            <div className="logo">Health Plus+</div>
          </Link>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Health Plus+ All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
