import axios from 'axios';

// Create an Axios instance with the base URL of the Spring Boot backend
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // Change this if your backend is hosted elsewhere
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to include the token in every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
