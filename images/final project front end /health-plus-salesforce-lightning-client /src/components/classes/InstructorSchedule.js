import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/calendar.css';
import '../../styles/classes/InstructorSchedule.css';

const InstructorSchedule = ({ refreshTrigger, onClassCreate }) => {
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstructors();
  }, []);

  useEffect(() => {
    if (selectedInstructor) {
      fetchInstructorSchedule();
    }
  }, [selectedInstructor, selectedDate, refreshTrigger]);

  const fetchInstructors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/users/instructors', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setInstructors(data);
    } catch (error) {
      console.error('Error fetching instructors:', error);
    }
  };

  const fetchInstructorSchedule = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:8080/classes/instructor/${selectedInstructor}/schedule?date=${selectedDate.toISOString()}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      const data = await response.json();
      setSchedule(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching schedule:', error);
      setLoading(false);
    }
  };

  return (
    <div className="instructor-schedule">
      <div className="schedule-header">
        <select
          value={selectedInstructor}
          onChange={(e) => setSelectedInstructor(e.target.value)}
          className="instructor-select"
        >
          <option value="">Select Instructor</option>
          {instructors.map(instructor => (
            <option key={instructor.id} value={instructor.id}>
              {instructor.name}
            </option>
          ))}
        </select>
        <button className="add-class-btn" onClick={onClassCreate}>
          Add New Class
        </button>
      </div>

      {selectedInstructor && (
        <div className="schedule-content">
          <div className="calendar-section">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              minDate={new Date()}
            />
          </div>

          <div className="schedule-list">
            <h3>Schedule for {selectedDate.toLocaleDateString()}</h3>
            {loading ? (
              <div className="loading">Loading schedule...</div>
            ) : schedule.length === 0 ? (
              <div className="no-classes">No classes scheduled for this date</div>
            ) : (
              <div className="time-slots">
                {schedule.map(slot => (
                  <div key={slot.id} className="schedule-slot">
                    <div className="time-range">
                      {new Date(slot.startTime).toLocaleTimeString()} - 
                      {new Date(slot.endTime).toLocaleTimeString()}
                    </div>
                    <div className="class-details">
                      <h4>{slot.name}</h4>
                      <p>Capacity: {slot.availableSpots}/{slot.capacity}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorSchedule; 