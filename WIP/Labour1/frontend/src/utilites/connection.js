import axios from 'axios';

const server = axios.create({
  baseURL: 'http://localhost:8000',
});

server.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
});

export default server;
