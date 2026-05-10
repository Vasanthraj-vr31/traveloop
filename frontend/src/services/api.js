import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  signup: (data) => api.post('/auth/signup', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

export const tripAPI = {
  getAll: () => api.get('/trips'),
  getById: (id) => api.get(`/trips/${id}`),
  create: (data) => api.post('/trips', data),
  update: (id, data) => api.put(`/trips/${id}`, data),
  delete: (id) => api.delete(`/trips/${id}`),
};

export const stopAPI = {
  getByTrip: (tripId) => api.get(`/stops/${tripId}`),
  create: (data) => api.post('/stops', data),
  update: (id, data) => api.put(`/stops/${id}`, data),
  delete: (id) => api.delete(`/stops/${id}`),
};

export const activityAPI = {
  getByTrip: (tripId) => api.get(`/activities/${tripId}`),
  create: (data) => api.post('/activities', data),
  update: (id, data) => api.put(`/activities/${id}`, data),
  delete: (id) => api.delete(`/activities/${id}`),
};

export const budgetAPI = {
  getByTrip: (tripId) => api.get(`/budget/${tripId}`),
  create: (data) => api.post('/budget', data),
  update: (id, data) => api.put(`/budget/${id}`, data),
  delete: (id) => api.delete(`/budget/${id}`),
};

export const packingAPI = {
  getByTrip: (tripId) => api.get(`/packing/${tripId}`),
  create: (data) => api.post('/packing', data),
  update: (id, data) => api.put(`/packing/${id}`, data),
  delete: (id) => api.delete(`/packing/${id}`),
};

export const noteAPI = {
  getByTrip: (tripId) => api.get(`/notes/${tripId}`),
  create: (data) => api.post('/notes', data),
  update: (id, data) => api.put(`/notes/${id}`, data),
  delete: (id) => api.delete(`/notes/${id}`),
};

export const photoAPI = {
  getByTrip: (tripId) => api.get(`/photos/${tripId}`),
  upload: (formData) => api.post('/photos', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/photos/${id}`),
};

export const emergencyAPI = {
  getByTrip: (tripId) => api.get(`/emergency/${tripId}`),
  create: (data) => api.post('/emergency', data),
  update: (id, data) => api.put(`/emergency/${id}`, data),
  delete: (id) => api.delete(`/emergency/${id}`),
};

export default api;
