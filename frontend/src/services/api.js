import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

export const predictPrompt = async (prompt) => {
  const response = await apiClient.post('/predict', { prompt });
  return response.data;
};

export const fetchLogs = async (params = {}) => {
  const response = await apiClient.get('/logs', { params });
  return response.data;
};

export const fetchDashboard = async () => {
  const response = await apiClient.get('/dashboard');
  return response.data;
};

export const checkHealth = async () => {
  const response = await apiClient.get('/health');
  return response.data;
};

export default apiClient;
