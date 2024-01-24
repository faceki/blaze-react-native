import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sdk.faceki.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
