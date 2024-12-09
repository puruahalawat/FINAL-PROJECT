import React, { useState, useEffect } from "react";
import "../../styles/classes/BookingList.css";

const BookingList = ({ refreshTrigger, onSuccess, canManageClasses }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all, active, cancelled

  useEffect(() => {
    fetchBookings();
  }, [refreshTrigger]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/classes/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      setBookings(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to load bookings");
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/classes/bookings/${bookingId}/cancel`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel booking");
      }

      await fetchBookings();
      alert("Booking cancelled successfully");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true;
    return booking.status.toLowerCase() === filter;
  });

  if (loading) return <div className="loading">Loading bookings...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="booking-list">
      <div className="booking-list-header">
        <h2 className="text-xl font-bold">Class Bookings</h2>
        <div className="filter-controls">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Bookings</option>
            <option value="active">Active</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <table className="bookings-table">
        <thead>
          <tr>
            <th>Class</th>
            <th>Member</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            {canManageClasses && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredBookings.length === 0 ? (
            <tr>
              <td
                colSpan={canManageClasses ? "6" : "5"}
                className="no-bookings"
              >
                No bookings found
              </td>
            </tr>
          ) : (
            filteredBookings.map((booking) => (
              <tr key={booking.id} className={booking.status.toLowerCase()}>
                <td>{booking.classEntity.name}</td>
                <td>{booking.member.name}</td>
                <td>
                  {new Date(booking.classEntity.startTime).toLocaleDateString()}
                </td>
                <td>
                  {new Date(booking.classEntity.startTime).toLocaleTimeString()}{" "}
                  -{new Date(booking.classEntity.endTime).toLocaleTimeString()}
                </td>
                <td>
                  <span
                    className={`status-badge ${booking.status.toLowerCase()}`}
                  >
                    {booking.status}
                  </span>
                </td>
                {canManageClasses && (
                  <td>
                    {booking.status === "ACTIVE" && (
                      <button
                        className="cancel-btn"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;
