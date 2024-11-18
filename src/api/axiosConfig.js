import axios from 'axios';

// Creating an Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // I hope this where the backend will be hosted as usually we host it on 8k
  headers: {
    'Content-Type': 'application/json',
  },
});

// This is the Interceptor to include the token in every request
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
