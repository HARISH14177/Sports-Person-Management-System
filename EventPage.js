import React, { useEffect, useState } from "react";
import './EventPage.css';
import axios from 'axios';

const EventManagement = () => {
  const [eventData, setEventData] = useState(initialEventData());
  const [eventList, setEventList] = useState([]);
  const [gymList, setGymList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const API_BASE = 'http://localhost:5000/api/event';
  const GYM_API_BASE = 'http://localhost:5000/api/gym';

  useEffect(() => {
    fetchEvents();
    fetchGyms();
  }, []);

  function initialEventData() {
    return {
      name: "",
      location: "",
      date: "",
      time: "",
      organiserGymId: "",
    };
  }

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_BASE}/getAllEvents`);
      setEventList(response.data);
    } catch (error) {
      console.error("Error fetching events:", error.message);
      alert("Failed to fetch event list.");
    }
  };

  const fetchGyms = async () => {
    try {
      const response = await axios.get(`${GYM_API_BASE}/getGym`);
      setGymList(response.data);
    } catch (error) {
      console.error("Error fetching gyms:", error.message);
      alert("Failed to fetch gym list.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'organiserGymId') {
      setEventData({ ...eventData, [name]: parseInt(value) });
    } else {
      setEventData({ ...eventData, [name]: value });
    }
  };

  const isFormValid = () => {
    return Object.values(eventData).every(field => 
      field !== "" && field !== null && field !== undefined
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      if (editMode) {
        await axios.put(`${API_BASE}/updateEvent/${editId}`, eventData);
        alert("Event updated successfully.");
      } else {
        const response = await axios.post(`${API_BASE}/createEvent`, eventData);
        setEventList([...eventList, response.data]);
        alert("Event added successfully.");
      }
      handleClear();
      fetchEvents();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit data.");
    }
  };

  const handleEdit = (event) => {
    // Format date for input field (YYYY-MM-DD)
    const formattedDate = new Date(event.date).toISOString().split('T')[0];
    
    setEventData({
      ...event,
      date: formattedDate,
      organiserGymId: event.organiserGymId
    });
    setEditMode(true);
    setEditId(event.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`${API_BASE}/deleteEvent/${id}`);
        alert("Event deleted successfully.");
        fetchEvents();
      } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete event.");
      }
    }
  };

  const handleClear = () => {
    setEventData(initialEventData());
    setEditMode(false);
    setEditId(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getGymName = (gymId) => {
    const gym = gymList.find(g => g.id === gymId);
    return gym ? gym.name : 'Unknown Gym';
  };

  return (
    <div className="event-container">
      <h2>Event Management</h2>

      <div className="form-section">
        <h3>{editMode ? "Edit Event" : "Add New Event"}</h3>
        
        <input 
          name="name" 
          placeholder="Event Name" 
          value={eventData.name} 
          onChange={handleChange} 
        />
        
        <input 
          name="location" 
          placeholder="Location" 
          value={eventData.location} 
          onChange={handleChange} 
        />
        
        <input 
          name="date" 
          type="date" 
          placeholder="Date" 
          value={eventData.date} 
          onChange={handleChange} 
        />
        
        <input 
          name="time" 
          type="time" 
          placeholder="Time" 
          value={eventData.time} 
          onChange={handleChange} 
        />
        
        <select 
          name="organiserGymId" 
          value={eventData.organiserGymId} 
          onChange={handleChange}
        >
          <option value="">Select Organiser Gym</option>
          {gymList.map((gym) => (
            <option key={gym.id} value={gym.id}>
              {gym.name}
            </option>
          ))}
        </select>

        <div className="button-group">
          <button onClick={handleSubmit}>
            {editMode ? "Update Event" : "Add Event"}
          </button>
          <button onClick={handleClear}>Clear</button>
        </div>
      </div>

      <div className="table-section">
        <h3>Existing Events</h3>
        <table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Organiser Gym</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {eventList.map((event) => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>{event.location}</td>
                <td>{formatDate(event.date)}</td>
                <td>{event.time}</td>
                <td>{event.organiserGym ? event.organiserGym.name : getGymName(event.organiserGymId)}</td>
                <td>
                  <button onClick={() => handleEdit(event)}>Edit</button>
                  <button onClick={() => handleDelete(event.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventManagement;