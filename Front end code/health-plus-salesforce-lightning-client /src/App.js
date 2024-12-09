import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import "./App.css";
import { Toaster } from "react-hot-toast";
import MainLayout from "./components/MainLayout";
import Landing from "./components/Landing";
import ChatBot from "./components/ChatBot";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    if (token) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUserRole(userData.role);
    setTimeout(() => {
      window.location.href = "/app";
    }, 500);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setIsAuthenticated(false);
    setUserRole(null);
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="*"
            element={<Landing isAuthenticated={isAuthenticated} />}
          />
          {isAuthenticated ? (
            <Route
              path="/app/*"
              element={
                <MainLayout onLogout={handleLogout} userRole={userRole} />
              }
            />
          ) : (
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          )}
        </Routes>
      </Router>
      <Toaster />
      <ChatBot />
    </>
  );
}

export default App;
