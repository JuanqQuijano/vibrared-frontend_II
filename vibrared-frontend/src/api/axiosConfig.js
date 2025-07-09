// src/api/axiosConfig.js
import axios from 'axios';

const API_BASE_URL = 'http://<TU_IP_PUBLICA_AZURE>:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para añadir el token a las cabeceras
apiClient.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

export default apiClient;
