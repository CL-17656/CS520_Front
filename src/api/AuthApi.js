// including the login and register API calls
import {apiClient, apiUrlEncodeClient} from './axiosConfig';
//import apiUrlEncodeClient from './axiosConfigLogin';

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
    const response = await apiUrlEncodeClient.post('/login', loginData)
    //const jsessionId = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
    console.log(response.headers);
    return response.data;
  } catch (error) {
    console.error('Login Error:', error.response.data);
    throw error;
  }
};

export const logoutUser = async (logoutData) => {
    try {
        const response = await apiUrlEncodeClient.post('/logout', logoutData);
        return response.data;
    } catch (error) {
        console.error('Login Error:', error.response.data);
        throw error;
    }
};
