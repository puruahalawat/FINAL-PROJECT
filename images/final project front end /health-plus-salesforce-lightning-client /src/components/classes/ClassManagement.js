import React, { useState } from "react";
import ClassSchedule from "./ClassSchedule";
import ClassForm from "./ClassForm";
import ClassBooking from "./ClassBooking";
import BookingList from "./BookingList";
import "../../styles/classes/ClassManagement.css";

const ClassManagement = () => {
  const [activeView, setActiveView] = useState("schedule");
  const [selectedClass, setSelectedClass] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const userRole = localStorage.getItem("userRole");
  const canManageClasses = ["STAFF", "ADMIN", "INSTRUCTOR"].includes(
    userRole?.toUpperCase()
  );

  console.log("User Role:", userRole);
  console.log("Can Manage Classes:", canManageClasses);

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
    setSelectedClass(null);
    setActiveView("schedule");
  };

  const handleClassSelect = (class_) => {
    setSelectedClass(class_);
    setActiveView("create");
  };

  return (
    <div className="class-management p-4 space-y-8">
      <div className="class-management-header">
        <h1 className="text-2xl">Class Management</h1>
        <div className="view-controls">
          <button
            className={`view-btn ${activeView === "schedule" ? "active" : ""}`}
            onClick={() => {
              setActiveView("schedule");
              setSelectedClass(null);
            }}
          >
            Class Schedule
          </button>
          <button
            className={`view-btn ${activeView === "create" ? "active" : ""}`}
            onClick={() => {
              setActiveView("create");
              setSelectedClass(null);
            }}
          >
            Create Class
          </button>
          <button
            className={`view-btn ${
              activeView === "bookingList" ? "active" : ""
            }`}
            onClick={() => setActiveView("bookingList")}
          >
            Manage Bookings
          </button>
          {canManageClasses && (
            <button
              className={`view-btn ${activeView === "booking" ? "active" : ""}`}
              onClick={() => setActiveView("booking")}
            >
              Class Bookings
            </button>
          )}
        </div>
      </div>

      {activeView === "schedule" && (
        <ClassSchedule
          onClassSelect={handleClassSelect}
          refreshTrigger={refreshTrigger}
          canManageClasses={canManageClasses}
        />
      )}

      {activeView === "create" && (
        <ClassForm
          onSuccess={handleRefresh}
          classToEdit={selectedClass}
          onCancel={() => {
            setSelectedClass(null);
            setActiveView("schedule");
          }}
        />
      )}

      {activeView === "booking" && canManageClasses && (
        <ClassBooking
          refreshTrigger={refreshTrigger}
          onSuccess={handleRefresh}
        />
      )}

      {activeView === "bookingList" && (
        <BookingList
          refreshTrigger={refreshTrigger}
          onSuccess={handleRefresh}
          canManageClasses={canManageClasses}
        />
      )}
    </div>
  );
};

export default ClassManagement;
