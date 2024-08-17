import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Making the API call to your backend, ensure this URL matches your deployed environment
        const response = await axios.get('/api/user');
        const { username } = response.data;

        if (username) {
          setUsername(username);
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