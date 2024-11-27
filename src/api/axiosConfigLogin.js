import axios from 'axios';

const apiLoginClient = axios.create({
  baseURL: 'http://localhost:8898', // I hope this where the backend will be hosted as usually we host it on 8k
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

apiLoginClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiLoginClient;