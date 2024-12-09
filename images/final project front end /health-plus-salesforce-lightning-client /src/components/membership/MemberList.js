import React, { useState, useEffect } from "react";
import { membershipPlans } from "../../utils/membershipPlans";
import "../../styles/membership/MemberList.css";

const MemberList = ({ onSelectMember, refreshTrigger, canManageMembers }) => {
  const [members, setMembers] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    membershipPlan: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, [refreshTrigger]);

  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/members", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Raw member data:", data);

      const mappedData = data.map((member) => ({
        ...member,
        membershipPlanName:
          membershipPlans[member.membershipPlan] || "Unknown Plan",
      }));
      console.log("Mapped data:", mappedData);
      setMembers(mappedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching members:", error);
      setLoading(false);
    }
  };

  const filteredMembers = members.filter((member) => {
    console.log("Filtering member:", member);
    console.log("Current status filter:", filters.status);

    const searchMatch =
      member.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      member.contact.includes(filters.search.toLowerCase());
    const statusMatch =
      !filters.status ||
      member.status.toLowerCase() === filters.status.toLowerCase();
    const planMatch =
      !filters.membershipPlan ||
      member.membershipPlanName === filters.membershipPlan;

    console.log("Status match:", statusMatch);

    return searchMatch && statusMatch && planMatch;
  });

  return (
    <div className="member-list">
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or contact"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="search-input"
        />
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="filter-select"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <select
          value={filters.membershipPlan}
          onChange={(e) =>
            setFilters({ ...filters, membershipPlan: e.target.value })
          }
          className="filter-select"
        >
          <option value="">All Plans</option>
          <option value="Basic Plan">Basic Plan</option>
          <option value="Standard Plan">Standard Plan</option>
          <option value="Premium Plan">Premium Plan</option>
          <option value="Family Plan">Family Plan</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading members...</div>
      ) : (
        <table className="members-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact#</th>
              <th>Status</th>
              <th>Plan</th>
              <th>Expiry Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.contact}</td>
                <td>
                  <span
                    className={`status-badge ${member.status.toLowerCase()}`}
                  >
                    {member.status}
                  </span>
                </td>
                <td>{member.membershipPlanName}</td>
                <td>{new Date(member.endDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => onSelectMember(member)}
                  >
                    {canManageMembers ? "Edit Profile" : "View Profile"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MemberList;
