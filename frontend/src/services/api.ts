import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Backend URL'inizi buraya yazın

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default api;