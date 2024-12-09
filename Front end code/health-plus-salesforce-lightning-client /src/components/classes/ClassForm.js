import React, { useState, useEffect } from "react";
import "../../styles/classes/ClassForm.css";
import Input from "../Input";

const ClassForm = ({ onSuccess, classToEdit, onCancel }) => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    instructorId: "",
    startTime: "",
    endTime: "",
    capacity: "",
  });

  useEffect(() => {
    fetchInstructors();
    if (classToEdit) {
      setFormData({
        name: classToEdit.name,
        instructorId: classToEdit.instructor.toString(),
        startTime: formatDateTime(classToEdit.startTime),
        endTime: formatDateTime(classToEdit.endTime),
        capacity: classToEdit.capacity,
      });
    }
  }, [classToEdit]);

  const fetchInstructors = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/staff/instructors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch instructors");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setInstructors(data);
      } else {
        console.error("Received non-array data:", data);
        setInstructors([]);
      }
    } catch (error) {
      console.error("Error fetching instructors:", error);
      setError("Failed to load instructors. Please try again later.");
      setInstructors([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return "";
    const date = new Date(dateTimeStr);
    return date.toISOString().slice(0, 16); // Format: "YYYY-MM-DDThh:mm"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const url = classToEdit
        ? `http://localhost:8080/classes/${classToEdit.id}`
        : "http://localhost:8080/classes";

      const payload = {
        name: formData.name,
        instructor: parseInt(formData.instructorId),
        startTime: formData.startTime,
        endTime: formData.endTime,
        capacity: parseInt(formData.capacity),
      };

      console.log(payload);

      const response = await fetch(url, {
        method: classToEdit ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        onSuccess();
      } else {
        throw new Error("Failed to save class");
      }
    } catch (error) {
      console.error("Error saving class:", error);
      setError("Failed to save class. Please try again.");
    }
  };

  if (loading) {
    return <div className="loading">Loading form...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={onCancel} className="cancel-btn">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="class-form">
      <h2 className="text-xl">
        {classToEdit ? "Edit Class" : "Create New Class"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Class Name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          placeholder="Enter class name"
        />
        <div className="form-group">
          <label>Instructor</label>
          <select
            value={formData.instructorId}
            onChange={(e) =>
              setFormData({ ...formData, instructorId: e.target.value })
            }
            required
          >
            <option value="">Select Instructor</option>
            {instructors.length > 0 ? (
              instructors.map((instructor) => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.name}
                </option>
              ))
            ) : (
              <option disabled>No instructors available</option>
            )}
          </select>
        </div>

        <div className="form-row">
          <Input
            label="Start Time"
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={(e) =>
              setFormData({ ...formData, startTime: e.target.value })
            }
            min={new Date().toISOString().slice(0, 16)}
            required
          />
          <Input
            label="End Time"
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={(e) =>
              setFormData({ ...formData, endTime: e.target.value })
            }
            min={formData.startTime}
            required
          />
        </div>
        <Input
          label="Capacity"
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={(e) =>
            setFormData({ ...formData, capacity: e.target.value })
          }
          min="1"
          required
        />
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            {classToEdit ? "Update Class" : "Create Class"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClassForm;
