import axios from 'axios';

// Create an Axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',  // Replace with your API's base URL
//   timeout: 10000,  // Set a request timeout (optional)
});

// Add a request interceptor (to include a token, for example)
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');  // Retrieve token from localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;  // Add Authorization header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Export the Axios instance
export default instance;
