import React, { useState } from "react";
import MemberList from "./MemberList";
import MemberProfile from "./MemberProfile";
import MemberEnrollment from "./MemberEnrollment";
import "../../styles/membership/MembershipManagement.css";
import LoaderButton from "../LoaderButton";

const MembershipManagement = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const userRole = localStorage.getItem("userRole");
  const canManageMembers = ["STAFF", "ADMIN"].includes(userRole?.toUpperCase());

  const handleMemberUpdate = async (updatedMember) => {
    setSelectedMember(updatedMember);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="membership-management p-4 space-y-8">
      {showEnrollment ? (
        <MemberEnrollment
          onClose={() => setShowEnrollment(false)}
          onSuccess={() => {
            setShowEnrollment(false);
            setRefreshTrigger((prev) => prev + 1);
          }}
        />
      ) : selectedMember ? (
        <MemberProfile
          member={selectedMember}
          onBack={() => setSelectedMember(null)}
          onUpdate={handleMemberUpdate}
          canEdit={canManageMembers}
        />
      ) : (
        <>
          <div className="membership-header flex items-center justify-between w-full">
            <h1 className="text-2xl">Membership Management</h1>
            {canManageMembers && (
              <div>
                <LoaderButton
                  className="add-member-btn"
                  onClick={() => setShowEnrollment(true)}
                >
                  Add New Member
                </LoaderButton>
              </div>
            )}
          </div>
          <MemberList
            onSelectMember={setSelectedMember}
            refreshTrigger={refreshTrigger}
            canManageMembers={canManageMembers}
          />
        </>
      )}
    </div>
  );
};

export default MembershipManagement;
