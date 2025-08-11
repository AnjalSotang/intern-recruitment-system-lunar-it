  import axios from 'axios';

  const API = axios.create({
    baseURL: 'http://localhost:3000/', // Change to your backend URL
  });

  // Auto attach token from localStorage
API.interceptors.request.use((config) => {
  const authStorage = localStorage.getItem('auth_storage');

  
  const token = JSON.parse(authStorage)?.state?.token;
  // console.log('Parsed token:', token);
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // console.log('Authorization header set');
  } else {
    console.log('No token found, skipping Authorization header');
  }
  return config;
});


  export default API;
