import React, { useState } from "react";
import { membershipPlans } from "../../utils/membershipPlans";
import "../../styles/membership/MemberProfile.css";

const MemberProfile = ({ member, onBack, onUpdate, canEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMember, setEditedMember] = useState({
    ...member,
    membershipPlanName:
      membershipPlans[member.membershipPlan] || "Unknown Plan",
  });

  const fetchUpdatedMember = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/members/${member.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const updatedMember = await response.json();
        setEditedMember({
          ...updatedMember,
          membershipPlanName:
            membershipPlans[updatedMember.membershipPlan] || "Unknown Plan",
        });
        onUpdate(updatedMember); // Notify parent component
      }
    } catch (error) {
      console.error("Error fetching updated member:", error);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = {
        id: editedMember.id,
        name: editedMember.name,
        contact: editedMember.contact,
        membershipPlan: editedMember.membershipPlan,
        status: editedMember.status,
        startDate: editedMember.startDate,
        endDate: editedMember.endDate,
      };

      const response = await fetch(
        `http://localhost:8080/members/${member.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setIsEditing(false);
        await fetchUpdatedMember(); // Fetch fresh data after successful update
      }
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  // Format date to YYYY-MM-DD for input type="date"
  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div>
      <button className="back-btn" onClick={onBack}>
        ← Back to List
      </button>

      <div className="profile-header">
        <h2 className="text-2xl">{member.name}'s Profile</h2>
        {canEdit && (
          <button
            className={isEditing ? "save-btn" : "edit-btn"}
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        )}
      </div>

      <div className="space-y-12">
        <div className="profile-section">
          <h3 className="text-xl">Personal Information</h3>
          {isEditing ? (
            <>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={editedMember.name}
                  onChange={(e) =>
                    setEditedMember({ ...editedMember, name: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Contact Number</label>
                <input
                  type="tel"
                  value={editedMember.contact}
                  onChange={(e) =>
                    setEditedMember({
                      ...editedMember,
                      contact: e.target.value,
                    })
                  }
                />
              </div>
            </>
          ) : (
            <>
              <p>
                <strong>Name:</strong> {member.name}
              </p>
              <p>
                <strong>Contact#:</strong> {member.contact}
              </p>
            </>
          )}
        </div>
        <div className="profile-section">
          <h3 className="text-xl">Membership Details</h3>
          {isEditing ? (
            <>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={editedMember.status}
                  onChange={(e) =>
                    setEditedMember({ ...editedMember, status: e.target.value })
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="form-group">
                <label>Membership Plan</label>
                <select
                  value={editedMember.membershipPlan}
                  onChange={(e) =>
                    setEditedMember({
                      ...editedMember,
                      membershipPlan: parseInt(e.target.value),
                      membershipPlanName: membershipPlans[e.target.value],
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
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={formatDateForInput(editedMember.startDate)}
                  disabled
                  className="disabled-input"
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  value={formatDateForInput(editedMember.endDate)}
                  onChange={(e) =>
                    setEditedMember({
                      ...editedMember,
                      endDate: e.target.value,
                    })
                  }
                  min={formatDateForInput(editedMember.startDate)}
                />
              </div>
            </>
          ) : (
            <>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`status-badge ${member.status.toLowerCase()}`}>
                  {member.status}
                </span>
              </p>
              <p>
                <strong>Plan:</strong>{" "}
                {membershipPlans[member.membershipPlan] || "Unknown Plan"}
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                {new Date(member.startDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Expiry Date:</strong>{" "}
                {new Date(member.endDate).toLocaleDateString()}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
