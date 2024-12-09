import React from "react";
import { Link } from "react-router-dom";

const AuthLayout = ({ children }) => {
  return (
    <div
      className="flex flex-col h-full w-full auth-layout"
      id="auth-layout"
      style={{
        backgroundImage: `url('/login-bg.png')`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div
          className="bg-white flex flex-col p-8 rounded-lg gap-4 w-full max-w-[520px]"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
        >
          <div>
            <Link to="/">
              <div className="logo">Health Plus+</div>
            </Link>
          </div>
          <div className="space-y-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
