import axios from 'axios';
import config from '../config';

const apiClient = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: config.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all users
export const getUsers = async () => {
  try {
    const response = await apiClient.get('/users');
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch users',
    };
  }
};

// Get user by ID
export const getUserById = async (id) => {
  try {
    const response = await apiClient.get(`/users/${id}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch user details',
    };
  }
};

export default apiClient;