import React, { useState } from "react";
import "../styles/Login.css";
import AuthLayout from "./AuthLayout";
import toast from "react-hot-toast";
import LoaderButton from "./LoaderButton";
import Input from "./Input";

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = Object.fromEntries(new FormData(e.currentTarget));
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/auth/login?email=${encodeURIComponent(
          credentials.email
        )}&password=${encodeURIComponent(credentials.password)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.role);
        onLogin(data);
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("There was an error trying to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <AuthLayout>
        <div className="flex flex-col gap-2">
          <h2 className="scroll-m-20 text-3xl font-semibold first:mt-0">
            Sign in
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <div className="flex flex-col gap-5">
            <Input
              name="email"
              required
              label="Email Address"
              placeholder="Enter email address"
              type="email"
            />
            <Input
              name="password"
              required
              label="Password"
              placeholder="Enter password"
              type="password"
            />
          </div>
          <LoaderButton
            type="submit"
            size="lg"
            isLoading={loading}
            className="login-button"
          >
            Sign in
          </LoaderButton>
        </form>
      </AuthLayout>
    </div>
  );
};

export default Login;
