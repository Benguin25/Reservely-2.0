// Fixed version of ReservationForm component
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ReservationForm() {
  const { restaurantId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    partySize: 1,
    specialNotes: ''
  });
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get restaurants from localStorage
    const storedRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
    
    // Default restaurants as fallback
    const defaultRestaurants = [
      {
        id: 1,
        name: "La Bella Italia",
        description: "Authentic Italian cuisine in a cozy atmosphere.",
        cuisine: "Italian",
        address: "123 Main Street, Downtown, Toronto, ON M5V 2T6"
      },
      {
        id: 2,
        name: "Sushi Master",
        description: "Fresh sushi and Japanese delicacies.",
        cuisine: "Japanese",
        address: "456 Queen Street West, Toronto, ON M5V 2B3"
      },
      {
        id: 3,
        name: "The Grill House",
        description: "Premium steaks and grilled specialties.",
        cuisine: "Steakhouse",
        address: "789 King Street East, Toronto, ON M5A 1N2"
      },
      {
        id: 4,
        name: "Thai Spice",
        description: "Authentic Thai flavors with a modern presentation.",
        cuisine: "Thai",
        address: "321 Yonge Street, Toronto, ON M5B 1R8"
      },
      {
        id: 5,
        name: "Mediterranean Delight",
        description: "Fresh Mediterranean dishes.",
        cuisine: "Mediterranean",
        address: "567 College Street, Toronto, ON M6G 1B2"
      }
    ];
    
    // Use stored restaurants if they exist, otherwise use default
    const allRestaurants = storedRestaurants.length > 0 
      ? storedRestaurants 
      : defaultRestaurants;
      
    // Find the restaurant with the matching ID
    const foundRestaurant = allRestaurants.find(r => r.id === parseInt(restaurantId));
    setRestaurant(foundRestaurant);
    setLoading(false);
  }, [restaurantId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new reservation object
    const newReservation = {
      id: Date.now(), // Use timestamp as id
      ...formData,
      status: 'confirmed', // All reservations are automatically confirmed
      restaurantId: parseInt(restaurantId)
    };
    
    // Get existing reservations for this restaurant
    const existingReservations = JSON.parse(localStorage.getItem(\eservations_\\) || '[]');
    
    // Add the new reservation
    const updatedReservations = [...existingReservations, newReservation];
    
    // Save back to localStorage
    localStorage.setItem(\eservations_\\, JSON.stringify(updatedReservations));
    
    // Show success message
    alert('Reservation submitted successfully!');
    
    // Clear form
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      partySize: 1,
      specialNotes: ''
    });
  };

  // Get today's date in YYYY-MM-DD format for the date input min attribute
  const today = new Date().toISOString().split('T')[0];

  if (loading) {
    return (
      <div className="loading">Loading...</div>
    );
  }

  if (!restaurant) {
    return (
      <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <div className="content-section" style={{ textAlign: 'center', width: '100%' }}>
          <h1>Restaurant Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'flex-start',
      minHeight: '80vh',
      padding: '40px 0',
      width: '100vw'  // Full viewport width
    }}>
      <div className="content-section" style={{ 
        width: '100%',
        margin: '0',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px'
      }}>
        <div style={{ textAlign: 'center', width: '100%', padding: '0 20px' }}>
          <h1 style={{ 
            fontSize: '3rem',
            marginBottom: '30px',
            color: 'var(--accent-blue)'
          }}>Make a Reservation</h1>
          <div className="restaurant-details" style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: 'var(--accent-pink)',
              fontSize: '2.2rem',
              marginBottom: '15px'
            }}>{restaurant.name}</h2>
            <p style={{ 
              color: 'var(--text-secondary)',
              fontSize: '1.3rem',
              marginBottom: '8px'
            }}>{restaurant.cuisine} Cuisine</p>
            <p style={{ 
              color: 'var(--text-secondary)',
              fontSize: '1.3rem'
            }}> {restaurant.address}</p>
          </div>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit} className="reservation-form">
            <div className="form-group" style={{ fontSize: '1.1rem' }}>
              <label htmlFor="name" style={{ marginBottom: '10px', display: 'block' }}>Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group" style={{ fontSize: '1.1rem' }}>
              <label htmlFor="email" style={{ marginBottom: '10px', display: 'block' }}>Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group" style={{ fontSize: '1.1rem' }}>
              <label htmlFor="phone" style={{ marginBottom: '10px', display: 'block' }}>Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div className="form-group" style={{ fontSize: '1.1rem' }}>
                <label htmlFor="date" style={{ marginBottom: '10px', display: 'block' }}>Date</label>
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

              <div className="form-group" style={{ fontSize: '1.1rem' }}>
                <label htmlFor="time" style={{ marginBottom: '10px', display: 'block' }}>Time</label>
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

            <div className="form-group" style={{ fontSize: '1.1rem' }}>
              <label htmlFor="partySize" style={{ marginBottom: '10px', display: 'block' }}>Number of People</label>
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

            <div className="form-group" style={{ fontSize: '1.1rem' }}>
              <label htmlFor="specialNotes" style={{ marginBottom: '10px', display: 'block' }}>Special Requests / Notes</label>
              <textarea
                id="specialNotes"
                name="specialNotes"
                value={formData.specialNotes}
                onChange={handleChange}
                placeholder="Enter any special requests or dietary requirements..."
                style={{ 
                  minHeight: '120px',
                  resize: 'vertical'
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ 
              width: '100%', 
              marginTop: '10px',
              padding: '16px',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}>
              Submit Reservation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
