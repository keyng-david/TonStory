import axios from 'axios';
import { retrieveLaunchParams } from '@tma.js/sdk';

const { initDataRaw } = retrieveLaunchParams();

const jwtToken = process.env.JWT_SECRET || 'your_jwt_token_here';

const headers = {
  Authorization: `Bearer ${jwtToken}`,
};

export const loadUserData = async () => {
  console.log("Starting API call to load user data...");
  console.log("API endpoint: /api/users");
  console.log("Headers:", headers);

  try {
    const response = await axios.get(`/api/users`, { headers });

    console.log("API response status:", response.status);
    console.log("API response data:", response.data);

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error message:", error.message);
      if (error.response) {
        console.error("Error response status:", error.response.status);
        console.error("Error response data:", error.response.data);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};