// including the login and register API calls
import apiClient from './axiosConfig';
import apiLoginClient from './axiosConfigLogin';

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration Error:', error.response.data);
    throw error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await apiLoginClient.post('/login', loginData);
    return response.data;
  } catch (error) {
    console.error('Login Error:', error.response.data);
    throw error;
  }
};

export const logoutUser = async (logoutData) => {
    try {
        const response = await apiLoginClient.post('/logout', logoutData);
        return response.data;
    } catch (error) {
        console.error('Login Error:', error.response.data);
        throw error;
    }
};
