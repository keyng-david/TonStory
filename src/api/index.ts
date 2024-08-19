import axios from 'axios';

// Assuming the JWT token is generated and stored somewhere
const jwtToken = process.env.JWT_SECRET || 'your_jwt_token_here';
const headers = { Authorization: `Bearer ${jwtToken}` };

// Debug-enabled version of loadUserData
export const loadUserDataDebug = async (setLocalDebugMessage: (message: string) => void) => {
  setLocalDebugMessage("Starting API call to load user data...");
  
  try {
    const response = await axios.get(`/api/users`, { headers });

    setLocalDebugMessage(`API response status: ${response.status}`);
    setLocalDebugMessage(`API response data: ${JSON.stringify(response.data)}`);
    
    return response.data;
  } catch (error: unknown) {
    handleApiError(error, setLocalDebugMessage);
    throw error;
  }
};

// Debug-enabled version of getScoreboard
export const getScoreboardDebug = async (setLocalDebugMessage: (message: string) => void) => {
  setLocalDebugMessage("Starting API call to fetch scoreboard data...");
  
  try {
    const response = await axios.get(`/api/scoreboard`, { headers });

    setLocalDebugMessage(`API response status: ${response.status}`);
    setLocalDebugMessage(`API response data: ${JSON.stringify(response.data)}`);
    
    return response.data;
  } catch (error: unknown) {
    handleApiError(error, setLocalDebugMessage);
    throw error;
  }
};

// Debug-enabled version of updatePoints
export const updatePointsDebug = async (setLocalDebugMessage: (message: string) => void) => {
  setLocalDebugMessage("Starting API call to update points...");
  
  try {
    const response = await axios.post(`/api/players`, {}, { headers });

    setLocalDebugMessage(`API response status: ${response.status}`);
    setLocalDebugMessage(`API response data: ${JSON.stringify(response.data)}`);
    
    return response.data;
  } catch (error: unknown) {
    handleApiError(error, setLocalDebugMessage);
    throw error;
  }
};

const handleApiError = (error: unknown, setLocalDebugMessage: (message: string) => void) => {
  if (axios.isAxiosError(error)) {
    setLocalDebugMessage(`Error fetching data: ${error.message}`);
    if (error.response) {
      setLocalDebugMessage(`Error response status: ${error.response.status}`);
      setLocalDebugMessage(`Error response data: ${JSON.stringify(error.response.data)}`);
    }
  } else {
    setLocalDebugMessage(`Unexpected error: ${JSON.stringify(error)}`);
  }
};