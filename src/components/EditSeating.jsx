import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditSeating() {
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState(null);
  const [tables, setTables] = useState([]);
  const [newTable, setNewTable] = useState({ name: '', capacity: 2 });
  const [isLoading, setIsLoading] = useState(true);

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
    
    // Get tables from localStorage if they exist
    const storedTables = JSON.parse(localStorage.getItem(`tables_${ownedRestaurantId}`) || '[]');
    
    // If no tables exist yet, create some default ones for demo purposes
    if (storedTables.length === 0) {
      const defaultTables = [
        { id: 1, name: 'Table 1', capacity: 2 },
        { id: 2, name: 'Table 2', capacity: 4 },
        { id: 3, name: 'Table 3', capacity: 6 }
      ];
      setTables(defaultTables);
      localStorage.setItem(`tables_${ownedRestaurantId}`, JSON.stringify(defaultTables));
    } else {
      setTables(storedTables);
    }
    
    setIsLoading(false);
  }, [navigate]);

  const handleNewTableChange = (e) => {
    const { name, value } = e.target;
    setNewTable(prev => ({
      ...prev,
      [name]: name === 'capacity' ? parseInt(value) || 1 : value
    }));
  };

  const addTable = () => {
    if (!newTable.name.trim()) {
      alert('Please enter a table name');
      return;
    }
    
    const newId = tables.length > 0 ? Math.max(...tables.map(t => t.id)) + 1 : 1;
    const updatedTables = [...tables, { id: newId, ...newTable }];
    
    setTables(updatedTables);
    localStorage.setItem(`tables_${restaurantId}`, JSON.stringify(updatedTables));
    
    // Reset the form
    setNewTable({ name: '', capacity: 2 });
  };

  const updateTable = (id, field, value) => {
    const updatedTables = tables.map(table => 
      table.id === id ? { ...table, [field]: field === 'capacity' ? parseInt(value) || 1 : value } : table
    );
    
    setTables(updatedTables);
    localStorage.setItem(`tables_${restaurantId}`, JSON.stringify(updatedTables));
  };

  const deleteTable = (id) => {
    if (window.confirm('Are you sure you want to delete this table?')) {
      const updatedTables = tables.filter(table => table.id !== id);
      setTables(updatedTables);
      localStorage.setItem(`tables_${restaurantId}`, JSON.stringify(updatedTables));
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="page-container">
      <div className="content-section">
        <div className="dashboard-header">
          <h1>Edit Restaurant Seating</h1>
          <button className="btn btn-secondary" onClick={() => navigate('/owner-dashboard')}>
            Back to Dashboard
          </button>
        </div>
        
        <div className="seating-manager">
          <div className="tables-list">
            <h2>Current Tables</h2>
            
            {tables.length === 0 ? (
              <p>No tables added yet. Add your first table below.</p>
            ) : (
              <table className="tables-table">
                <thead>
                  <tr>
                    <th>Table Name</th>
                    <th>Capacity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tables.map(table => (
                    <tr key={table.id}>
                      <td>
                        <input
                          type="text"
                          value={table.name}
                          onChange={(e) => updateTable(table.id, 'name', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={table.capacity}
                          onChange={(e) => updateTable(table.id, 'capacity', e.target.value)}
                        />
                      </td>
                      <td>
                        <button 
                          className="btn btn-danger"
                          onClick={() => deleteTable(table.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
          <div className="add-table-form">
            <h2>Add New Table</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Table Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newTable.name}
                  onChange={handleNewTableChange}
                  placeholder="e.g., Table 4"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="capacity">Seating Capacity</label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  min="1"
                  value={newTable.capacity}
                  onChange={handleNewTableChange}
                />
              </div>
              
              <button 
                className="btn btn-primary"
                onClick={addTable}
              >
                Add Table
              </button>
            </div>
          </div>
          
          <div className="seating-summary">
            <h3>Seating Summary</h3>
            <p>
              <strong>Total Tables:</strong> {tables.length}<br />
              <strong>Total Capacity:</strong> {tables.reduce((sum, table) => sum + table.capacity, 0)} guests
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 