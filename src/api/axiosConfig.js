import axios from 'axios';

import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

const jar = new CookieJar();
const apiClient = wrapper(axios.create({ jar }));
apiClient.interceptors.request.use((config) => {
  config.withCredentials = true;
  config.baseURL = 'http://localhost:8898';
  config.headers = {
    'Content-Type': 'application/json',
  };
  config.jar = jar;
  return config;
}, (error) => {
  return Promise.reject(error);
});

const apiUrlEncodeClient = wrapper(axios.create({ jar }));
apiUrlEncodeClient.interceptors.request.use((config) => {
  config.withCredentials = true;
  config.baseURL = 'http://localhost:8898';
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  config.jar = jar;
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
export {apiClient, apiUrlEncodeClient};
