import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ReservationForm() {
  const { restaurantId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    partySize: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the reservation data to your backend
    console.log('Reservation submitted:', { ...formData, restaurantId });
    // Show success message
    alert('Reservation submitted successfully!');
    // Clear form
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      partySize: 1
    });
  };

  // Get today's date in YYYY-MM-DD format for the date input min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="page-container">
      <div className="content-section">
        <h1>Make a Reservation</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit} className="reservation-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="time">Time</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="partySize">Number of People</label>
              <input
                type="number"
                id="partySize"
                name="partySize"
                value={formData.partySize}
                onChange={handleChange}
                min="1"
                max="20"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit Reservation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
