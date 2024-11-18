// including the login and register API calls
import apiClient from './axiosConfig';

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration Error:', error.response.data);
    throw error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await apiClient.post('/auth/login', loginData);
    return response.data;
  } catch (error) {
    console.error('Login Error:', error.response.data);
    throw error;
  }
};
