import React, { useState, useEffect } from "react";
import "../../styles/classes/ClassBooking.css";

const ClassBooking = ({ refreshTrigger, onSuccess }) => {
  const [members, setMembers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMembers();
    fetchClasses();
  }, [refreshTrigger]);

  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/members/active", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch members");
      }

      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error("Error fetching members:", error);
      setError("Failed to load members");
    }
  };

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/classes/upcoming", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch classes");
      }

      const data = await response.json();
      setClasses(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching classes:", error);
      setError("Failed to load classes");
      setLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/classes/${selectedClass}/book/${selectedMember}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        onSuccess();
        setSelectedMember("");
        setSelectedClass("");
      } else {
        throw new Error("Failed to book class");
      }
    } catch (error) {
      console.error("Error booking class:", error);
      setError("Failed to book class. Please try again.");
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="class-booking">
      <h2 className="text-xl">Book a Class</h2>
      <form onSubmit={handleBooking}>
        <div className="form-group">
          <label>Member</label>
          <select
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            required
          >
            <option value="">Select Member</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name} - {member.contact}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            required
          >
            <option value="">Select Class</option>
            {classes.map((class_) => (
              <option
                key={class_.id}
                value={class_.id}
                disabled={class_.availableSpots === 0}
              >
                {class_.name} - {new Date(class_.startTime).toLocaleString()}(
                {class_.availableSpots} spots available)
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="submit-btn"
          disabled={!selectedMember || !selectedClass}
        >
          Book Class
        </button>
      </form>

      <div className="bookings-list">
        <h3>Upcoming Classes</h3>
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Date & Time</th>
              <th>Instructor</th>
              <th>Available Spots</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((class_) => (
              <tr key={class_.id}>
                <td>{class_.name}</td>
                <td>{new Date(class_.startTime).toLocaleString()}</td>
                <td>{class_.instructor.name}</td>
                <td>
                  {class_.availableSpots}/{class_.capacity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassBooking;
