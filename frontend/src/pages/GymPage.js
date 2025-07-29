import React, { useEffect, useState } from "react";
import './GymPage.css';
import axios from 'axios';

const GymManagement = () => {
  const [gymData, setGymData] = useState(initialGymData());
  const [gymList, setGymList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const API_BASE = 'http://localhost:5000/api/gym';

  useEffect(() => {
    fetchGyms();
  }, []);

  function initialGymData() {
    return {
      name: "",
      ownerName: "",
      coachName: "",
      address: "",
      pincode: "",
      phone: "",
    };
  }

 
const fetchGyms = async () => {
  try {
    const response = await axios.get(`${API_BASE}/getGym`);
    setGymList(response.data);
  } catch (error) {
    console.error("Error fetching gyms:", error.message);
    alert("Failed to fetch gym list.");
  }
};

  const handleChange = (e) => {
    setGymData({ ...gymData, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return Object.values(gymData).every(field => field.trim() !== "");
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      if (editMode) {
        await axios.put(`${API_BASE}/gymUpdate/${editId}`, gymData);
        alert("Gym updated successfully.");
      } else {
        const response = await axios.post(`${API_BASE}/gymCreate`, gymData);
        setGymList([...gymList, response.data]);
        alert("Gym added successfully.");
      }
      handleClear();
      fetchGyms();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit data.");
    }
  };

  const handleEdit = (gym) => {
    setGymData(gym);
    setEditMode(true);
    setEditId(gym.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/gymDelete/${id}`);
      alert("Gym deleted.");
      fetchGyms();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete gym.");
    }
  };

  const handleClear = () => {
    setGymData(initialGymData());
    setEditMode(false);
    setEditId(null);
  };

  return (
    <div className="gym-container">
      <h2>Gym Management</h2>

      <div className="form-section">
        <h3>{editMode ? "Edit Gym" : "Add New Gym"}</h3>
        <input name="name" placeholder="Gym Name" value={gymData.name} onChange={handleChange} />
        <input name="ownerName" placeholder="Owner Name" value={gymData.ownerName} onChange={handleChange} />
        <input name="coachName" placeholder="Coach Name" value={gymData.coachName} onChange={handleChange} />
        <input name="address" placeholder="Address" value={gymData.address} onChange={handleChange} />
        <input name="pincode" placeholder="Pincode" value={gymData.pincode} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={gymData.phone} onChange={handleChange} />

        <div className="button-group">
          <button onClick={handleSubmit}>
            {editMode ? "Update Gym" : "Add Gym"}
          </button>
          <button onClick={handleClear}>Clear</button>
        </div>
      </div>

      <div className="table-section">
        <h3>Existing Gyms</h3>
        <table>
          <thead>
            <tr>
              <th>Gym Name</th>
              <th>Owner Name</th>
              <th>Coach Name</th>
              <th>Address</th>
              <th>Pincode</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {gymList.map((gym) => (
              <tr key={gym.id}>
                <td>{gym.name}</td>
                <td>{gym.ownerName}</td>
                <td>{gym.coachName}</td>
                <td>{gym.address}</td>
                <td>{gym.pincode}</td>
                <td>{gym.phone}</td>
                <td>
                  <button onClick={() => handleEdit(gym)}>Edit</button>
                  <button onClick={() => handleDelete(gym.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GymManagement;
