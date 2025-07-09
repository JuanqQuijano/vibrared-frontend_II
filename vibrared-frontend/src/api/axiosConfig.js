// src/api/axiosConfig.js
import axios from 'axios';

// --- IMPORTANTE ---
// Reemplaza '<TU_IP_PUBLICA_AZURE>' con la IP pública de tu VM de Azure.
// El puerto ahora es 3000, según tu nueva configuración.
const API_BASE_URL = 'http://172.179.242.40:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;