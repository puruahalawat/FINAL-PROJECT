import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import Dashboard from "./Dashboard";
import MembershipManagement from "./membership/MembershipManagement";
import ClassManagement from "./classes/ClassManagement";

const MainLayout = ({ userRole, onLogout }) => {
  const location = useLocation();
  return (
    <div className="bg-slate-50 h-screen">
      <Header isAuth onLogout={onLogout} userRole={userRole} />
      <div className="flex min-h-[80vh]">
        <Sidebar
          active={
            location.pathname.replace("/app", "") === ""
              ? "dashboard"
              : location.pathname.replace("/app/", "")
          }
        />
        <div
          id="main-content"
          className="w-full relative overflow-y-auto min-h-[77vh]"
        >
          <main className="py-6 px-4 space-y-10">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/members" element={<MembershipManagement />} />
              <Route path="/classes" element={<ClassManagement />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
      <Footer isAdmin />
    </div>
  );
};

export default MainLayout;
