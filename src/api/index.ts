import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Making the API call to your backend
        const response = await axios.get('/api/user-data');
        const userData = response.data.data;  // Accessing user data from the response

        if (userData && userData.username) {
          setUsername(userData.username);
        } else {
          setUsername('Unknown User');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Ton Story</h1>
      {error ? (
        <p>{error}</p>
      ) : username ? (
        <p>Welcome, {username}! If you see this message, React is working correctly.</p>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}