import React, { useState } from "react";
import { membershipPlans } from "../../utils/membershipPlans";
import "../../styles/membership/MemberEnrollment.css";
import Input from "../Input";

const MemberEnrollment = ({ onClose, onSuccess }) => {
  const currentDate = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    membershipPlan: 1,
    startDate: currentDate,
    endDate: "",
    status: "Active",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/members", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error creating member:", error);
    }
  };

  return (
    <div>
      <div className="enrollment-header">
        <h2 className="text-2xl">New Member Enrollment</h2>
        <div>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="name"
            label="Name"
            required
            placeholder="Enter name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            name="contact"
            label="Contact Number"
            required
            type="tel"
            placeholder="Enter contact number"
            value={formData.contact}
            onChange={(e) =>
              setFormData({ ...formData, contact: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Membership Plan</label>
          <select
            value={formData.membershipPlan}
            onChange={(e) =>
              setFormData({
                ...formData,
                membershipPlan: parseInt(e.target.value),
              })
            }
          >
            {Object.entries(membershipPlans).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="startDate"
            label="Start Date"
            type="date"
            value={formData.startDate}
            onChange={(e) => {
              const newStartDate = e.target.value;
              setFormData((prev) => ({
                ...prev,
                startDate: newStartDate,
                // Clear end date if it's before new start date
                endDate:
                  prev.endDate && prev.endDate < newStartDate
                    ? ""
                    : prev.endDate,
              }));
            }}
            max={currentDate}
            required
          />
          <Input
            name="endDate"
            label="End Date"
            type="date"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
            min={formData.startDate} // Prevent selecting date before start date
            required
          />
        </div>
        <Input
          name="status"
          label="Status"
          disabled
          value="Active"
          className="disabled-input"
        />
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Enroll Member
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberEnrollment;
