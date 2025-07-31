import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './athlete.css'; // We'll create this for styling

const Athlete = () => {
  const [athletes, setAthletes] = useState([]);
  const [events, setEvents] = useState([]);
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [categoryResult, setCategoryResult] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    age: '',
    weight: '',
    gender: 'male',
    weightCategory: '',
    aadharNumber: '',
    mobile: '',
    eventId: '',
    gymId: ''
  });

  // API base URL - adjust according to your backend
  const API_BASE = 'http://localhost:3000/api'; // Update this to match your backend URL

  useEffect(() => {
    fetchAthletes();
    fetchEvents();
    fetchGyms();
  }, []);

  const fetchAthletes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/getAllAthlete`);
      setAthletes(response.data);
    } catch (err) {
      setError('Failed to fetch athletes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      // Assuming you have an events endpoint
      const response = await axios.get(`${API_BASE}/events`);
      setEvents(response.data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    }
  };

  const fetchGyms = async () => {
    try {
      // Assuming you have a gyms endpoint
      const response = await axios.get(`${API_BASE}/gyms`);
      setGyms(response.data);
    } catch (err) {
      console.error('Failed to fetch gyms:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-calculate age from DOB
    if (name === 'dob' && value) {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        setFormData(prev => ({ ...prev, age: age - 1 }));
      } else {
        setFormData(prev => ({ ...prev, age }));
      }
    }
  };

  const getAthleteCategory = async () => {
    if (!formData.age || !formData.gender || !formData.weight) {
      setError('Please fill in age, gender, and weight to get category');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE}/athleteCategory`, {
        age: parseInt(formData.age),
        gender: formData.gender,
        weight: parseFloat(formData.weight)
      });
      setCategoryResult(response.data.category);
      setFormData(prev => ({ ...prev, weightCategory: response.data.category }));
    } catch (err) {
      setError('Failed to get athlete category');
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (editingId) {
        await axios.put(`${API_BASE}/updateAthlete/${editingId}`, formData);
        setSuccess('Athlete updated successfully!');
      } else {
        await axios.post(`${API_BASE}/createAthelete`, formData);
        setSuccess('Athlete created successfully!');
      }
      
      resetForm();
      fetchAthletes();
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (athlete) => {
    setFormData({
      name: athlete.name,
      dob: athlete.dob ? athlete.dob.split('T')[0] : '',
      age: athlete.age,
      weight: athlete.weight,
      gender: athlete.gender,
      weightCategory: athlete.weightCategory,
      aadharNumber: athlete.aadharNumber,
      mobile: athlete.mobile,
      eventId: athlete.eventId,
      gymId: athlete.gymId
    });
    setEditingId(athlete.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this athlete?')) return;

    try {
      setLoading(true);
      await axios.delete(`${API_BASE}/deleteAthlete/${id}`);
      setSuccess('Athlete deleted successfully!');
      fetchAthletes();
    } catch (err) {
      setError('Failed to delete athlete');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      dob: '',
      age: '',
      weight: '',
      gender: 'male',
      weightCategory: '',
      aadharNumber: '',
      mobile: '',
      eventId: '',
      gymId: ''
    });
    setEditingId(null);
    setShowForm(false);
    setCategoryResult('');
  };

  return (
    <div className="athlete-container">
      <div className="athlete-header">
        <h1>Athlete Management</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Athlete'}
        </button>
      </div>

      {/* Alert Messages */}
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Athlete Form */}
      {showForm && (
        <div className="athlete-form-container">
          <h2>{editingId ? 'Edit Athlete' : 'Add New Athlete'}</h2>
          <form onSubmit={handleSubmit} className="athlete-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="dob">Date of Birth *</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="gender">Gender *</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="weight">Weight (kg) *</label>
                <input
                  type="number"
                  step="0.1"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="weightCategory">Weight Category</label>
                <div className="category-input-group">
                  <input
                    type="text"
                    id="weightCategory"
                    name="weightCategory"
                    value={formData.weightCategory}
                    onChange={handleInputChange}
                    readOnly
                  />
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={getAthleteCategory}
                  >
                    Get Category
                  </button>
                </div>
                {categoryResult && (
                  <small className="category-result">Category: {categoryResult}</small>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="aadharNumber">Aadhar Number *</label>
                <input
                  type="text"
                  id="aadharNumber"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleInputChange}
                  pattern="[0-9]{12}"
                  title="Please enter a valid 12-digit Aadhar number"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobile">Mobile Number *</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit mobile number"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="eventId">Event *</label>
                <select
                  id="eventId"
                  name="eventId"
                  value={formData.eventId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Event</option>
                  {events.map(event => (
                    <option key={event.id} value={event.id}>
                      {event.name} - {new Date(event.date).toLocaleDateString()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="gymId">Gym *</label>
                <select
                  id="gymId"
                  name="gymId"
                  value={formData.gymId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Gym</option>
                  {gyms.map(gym => (
                    <option key={gym.id} value={gym.id}>
                      {gym.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Saving...' : (editingId ? 'Update Athlete' : 'Create Athlete')}
              </button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Athletes List */}
      <div className="athletes-list">
        <h2>Athletes List</h2>
        {loading && <div className="loading">Loading...</div>}
        
        {athletes.length === 0 && !loading ? (
          <div className="no-data">No athletes found</div>
        ) : (
          <div className="athletes-grid">
            {athletes.map(athlete => (
              <div key={athlete.id} className="athlete-card">
                <div className="athlete-info">
                  <h3>{athlete.name}</h3>
                  <p><strong>Age:</strong> {athlete.age}</p>
                  <p><strong>Gender:</strong> {athlete.gender}</p>
                  <p><strong>Weight:</strong> {athlete.weight} kg</p>
                  <p><strong>Category:</strong> {athlete.weightCategory}</p>
                  <p><strong>Mobile:</strong> {athlete.mobile}</p>
                  <p><strong>Gym:</strong> {athlete.gym?.name || 'N/A'}</p>
                  <p><strong>Event:</strong> {athlete.event?.name || 'N/A'}</p>
                </div>
                <div className="athlete-actions">
                  <button 
                    className="btn btn-edit"
                    onClick={() => handleEdit(athlete)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-delete"
                    onClick={() => handleDelete(athlete.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Athlete;