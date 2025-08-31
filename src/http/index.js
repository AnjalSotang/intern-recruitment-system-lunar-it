import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/', // Change to your backend URL
});

const AUTH_KEY = "auth_storage"


// Auto attach token from localStorage
API.interceptors.request.use((config) => {
  const authStorage = localStorage.getItem(AUTH_KEY);
  const token = JSON.parse(authStorage)?.state?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log('No token found, skipping Authorization header');
  }
  return config;
});


API.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 508) {
        
            window.location.href = "/logout";
            
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);



export default API;
