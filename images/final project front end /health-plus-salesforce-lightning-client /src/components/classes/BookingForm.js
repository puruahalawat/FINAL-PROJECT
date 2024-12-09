import React, { useState } from 'react';
import '../../styles/classes/BookingForm.css';

const BookingForm = ({ classInfo, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    member: {
      id: ''  // This will be selected from dropdown
    },
    status: 'ACTIVE'
  });

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch active members when component mounts
  React.useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/members/active', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch members');
      }
      
      const data = await response.json();
      setMembers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching members:', error);
      setError('Failed to load members');
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (loading) return <div className="loading">Loading members...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="booking-form-overlay">
      <div className="booking-form">
        <h2>Book Class: {classInfo.name}</h2>
        <div className="class-details">
          <p>Date: {new Date(classInfo.startTime).toLocaleDateString()}</p>
          <p>Time: {new Date(classInfo.startTime).toLocaleTimeString()} - 
             {new Date(classInfo.endTime).toLocaleTimeString()}</p>
          <p>Available Spots: {classInfo.capacity}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Member</label>
            <select
              value={formData.member.id}
              onChange={(e) => setFormData({
                ...formData,
                member: { id: e.target.value }
              })}
              required
            >
              <option value="">Select a member</option>
              {members.map(member => (
                <option key={member.id} value={member.id}>
                  {member.name} - {member.contact}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm; 