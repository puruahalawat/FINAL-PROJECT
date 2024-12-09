import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/calendar.css';
import '../../styles/classes/ClassSchedule.css';
import BookingForm from './BookingForm';

const ClassSchedule = ({ onClassSelect, refreshTrigger, canManageClasses }) => {
  const [classes, setClasses] = useState([]);
  const [instructors, setInstructors] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [classDateMap, setClassDateMap] = useState(new Set());
  const [selectedClassForBooking, setSelectedClassForBooking] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, [refreshTrigger]);

  const fetchInstructors = async (instructorIds) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/staff/instructors', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      // Create a map of instructor IDs to instructor names
      const instructorMap = {};
      data.forEach(instructor => {
        instructorMap[instructor.id] = instructor.name;
      });
      
      setInstructors(instructorMap);
    } catch (error) {
      console.error('Error fetching instructors:', error);
    }
  };

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/classes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      // Get unique instructor IDs from classes
      const instructorIds = [...new Set(data.map(class_ => class_.instructor))];
      await fetchInstructors(instructorIds);
      
      setClasses(data);
      
      const datesWithClasses = new Set(
        data.map(class_ => new Date(class_.startTime).toISOString().split('T')[0])
      );
      setClassDateMap(datesWithClasses);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching classes:', error);
      setLoading(false);
    }
  };

  const filteredClasses = classes.filter(class_ => {
    const classDate = new Date(class_.startTime);
    return classDate.toDateString() === selectedDate.toDateString();
  });

  const handleBookingClick = (classInfo) => {
    setSelectedClassForBooking(classInfo);
  };

  const handleBookingSubmit = async (bookingData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/classes/${selectedClassForBooking.id}/bookings`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to book class');
      }

      await fetchClasses();
      setSelectedClassForBooking(null);
      alert('Class booked successfully!');
    } catch (error) {
      console.error('Error booking class:', error);
      alert('Failed to book class. Please try again.');
    }
  };

  const getTileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      if (classDateMap.has(dateStr)) {
        return 'has-classes';
      }
    }
    return null;
  };

  return (
    <div className="class-schedule">
      <div className="schedule-container">
        <div className="calendar-section">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            minDate={new Date()}
            tileClassName={getTileClassName}
          />
        </div>

        <div className="classes-list">
          <h2>Classes for {selectedDate.toLocaleDateString()}</h2>
          {loading ? (
            <div className="loading">Loading classes...</div>
          ) : filteredClasses.length === 0 ? (
            <div className="no-classes">No classes scheduled for this date</div>
          ) : (
            filteredClasses.map(class_ => (
              <div key={class_.id} className="class-card">
                <div className="class-info">
                  <h3>{class_.name}</h3>
                  <p>Instructor: {instructors[class_.instructor] || 'Unknown'}</p>
                  <p>Time: {new Date(class_.startTime).toLocaleTimeString()} - 
                     {new Date(class_.endTime).toLocaleTimeString()}</p>
                  <p>Available Spots: {class_.availableSpots}/{class_.capacity}</p>
                </div>
                <div className="class-actions">
                  {canManageClasses ? (
                    <button 
                      className="edit-btn"
                      onClick={() => onClassSelect(class_)}
                    >
                      Edit Class
                    </button>
                  ) : (
                    <button 
                      className="book-btn"
                      onClick={() => handleBookingClick(class_)}
                      disabled={class_.capacity <= 0}
                    >
                      {class_.capacity <= 0 ? 'Full' : 'Book Class'}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {selectedClassForBooking && (
        <BookingForm
          classInfo={selectedClassForBooking}
          onSubmit={handleBookingSubmit}
          onCancel={() => setSelectedClassForBooking(null)}
        />
      )}
    </div>
  );
};

export default ClassSchedule; 