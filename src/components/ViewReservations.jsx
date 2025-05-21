import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ViewReservations() {
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Get owned restaurant ID
    const ownedRestaurantId = localStorage.getItem('ownedRestaurantId');
    setRestaurantId(ownedRestaurantId);
    
    // Get reservations from localStorage if they exist
    const storedReservations = JSON.parse(localStorage.getItem(`reservations_${ownedRestaurantId}`) || '[]');
    
    // If no reservations exist yet, create some demo reservations
    if (storedReservations.length === 0) {
      const today = new Date();
      
      // Create date for tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      
      // Create date for next week
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      
      const demoReservations = [
        {
          id: 1,
          name: 'John Smith',
          email: 'john@example.com',
          phone: '555-123-4567',
          date: today.toISOString().split('T')[0],
          time: '19:00',
          partySize: 2,
          specialNotes: 'No nuts please, allergy.',
          status: 'confirmed',
          table: 'Table 1'
        },
        {
          id: 2,
          name: 'Mary Johnson',
          email: 'mary@example.com',
          phone: '555-987-6543',
          date: tomorrow.toISOString().split('T')[0],
          time: '20:30',
          partySize: 4,
          specialNotes: 'Birthday celebration',
          status: 'confirmed',
          table: 'Table 2'
        },
        {
          id: 3,
          name: 'Robert Williams',
          email: 'robert@example.com',
          phone: '555-456-7890',
          date: nextWeek.toISOString().split('T')[0],
          time: '18:00',
          partySize: 6,
          specialNotes: '',
          status: 'pending',
          table: 'Table 3'
        }
      ];
      
      setReservations(demoReservations);
      localStorage.setItem(`reservations_${ownedRestaurantId}`, JSON.stringify(demoReservations));
    } else {
      setReservations(storedReservations);
    }
    
    setIsLoading(false);
  }, [navigate]);

  // Filter reservations based on status
  const filteredReservations = filterStatus === 'all' 
    ? reservations
    : reservations.filter(r => r.status === filterStatus);

  const updateReservationStatus = (id, newStatus) => {
    const updatedReservations = reservations.map(reservation => 
      reservation.id === id ? { ...reservation, status: newStatus } : reservation
    );
    
    setReservations(updatedReservations);
    localStorage.setItem(`reservations_${restaurantId}`, JSON.stringify(updatedReservations));
  };

  const deleteReservation = (id) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      const updatedReservations = reservations.filter(reservation => reservation.id !== id);
      setReservations(updatedReservations);
      localStorage.setItem(`reservations_${restaurantId}`, JSON.stringify(updatedReservations));
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="page-container">
      <div className="content-section">
        <div className="dashboard-header">
          <h1>Manage Reservations</h1>
          <button className="btn btn-secondary" onClick={() => navigate('/owner-dashboard')}>
            Back to Dashboard
          </button>
        </div>
        
        <div className="reservation-filters">
          <button 
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
            onClick={() => setFilterStatus('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'confirmed' ? 'active' : ''}`}
            onClick={() => setFilterStatus('confirmed')}
          >
            Confirmed
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'cancelled' ? 'active' : ''}`}
            onClick={() => setFilterStatus('cancelled')}
          >
            Cancelled
          </button>
        </div>
        
        {filteredReservations.length === 0 ? (
          <div className="no-reservations">
            <p>No {filterStatus !== 'all' ? filterStatus : ''} reservations found.</p>
          </div>
        ) : (
          <div className="reservations-list">
            {filteredReservations.map(reservation => (
              <div key={reservation.id} className={`reservation-card ${reservation.status}`}>
                <div className="reservation-header">
                  <h3>{reservation.name}</h3>
                  <div className={`reservation-status ${reservation.status}`}>
                    {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                  </div>
                </div>
                
                <div className="reservation-details">
                  <div className="detail-column">
                    <p><strong>Date:</strong> {formatDate(reservation.date)}</p>
                    <p><strong>Time:</strong> {reservation.time}</p>
                    <p><strong>Party Size:</strong> {reservation.partySize} guests</p>
                    <p><strong>Table:</strong> {reservation.table}</p>
                  </div>
                  
                  <div className="detail-column">
                    <p><strong>Email:</strong> {reservation.email}</p>
                    <p><strong>Phone:</strong> {reservation.phone}</p>
                    <p><strong>Special Notes:</strong> {reservation.specialNotes || 'None'}</p>
                  </div>
                </div>
                
                <div className="reservation-actions">
                  {reservation.status === 'pending' && (
                    <button 
                      className="btn btn-primary"
                      onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                    >
                      Confirm
                    </button>
                  )}
                  
                  {reservation.status !== 'cancelled' && (
                    <button 
                      className="btn btn-secondary"
                      onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                    >
                      Cancel
                    </button>
                  )}
                  
                  <button 
                    className="btn btn-danger"
                    onClick={() => deleteReservation(reservation.id)}
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
} 