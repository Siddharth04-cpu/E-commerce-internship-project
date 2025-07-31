import axios from 'axios';

// The baseURL now uses the Vite environment variable.
// This will be 'http://localhost:5000' on your local machine
// and your live backend URL (e.g., 'https://my-shop-backend.onrender.com') when deployed.
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

export default API;
