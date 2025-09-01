import axios from 'axios';

// Get backend URL from environment variable
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE_URL = `${BACKEND_URL}/api`;

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging and authentication
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response?.status === 404) {
      console.warn('Resource not found:', error.config.url);
    } else if (error.response?.status >= 500) {
      console.error('Server error:', error.response.data);
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    }
    
    return Promise.reject(error);
  }
);

// Retry function for failed requests
const retryRequest = async (fn, retries = 2, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && error.response?.status >= 500) {
      console.log(`Retrying request... ${retries} attempts left`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryRequest(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

// API service functions
export const apiService = {
  // Health check
  async checkHealth() {
    return retryRequest(() => api.get('/health'));
  },

  // Profile endpoints
  async getProfile() {
    return retryRequest(() => api.get('/profile'));
  },

  // Skills endpoints
  async getSkills() {
    return retryRequest(() => api.get('/skills'));
  },

  // Experience endpoints
  async getExperience() {
    return retryRequest(() => api.get('/experience'));
  },

  // Projects endpoints
  async getProjects(category = null) {
    const params = category && category !== 'All' ? { category } : {};
    return retryRequest(() => api.get('/projects', { params }));
  },

  // Testimonials endpoints
  async getTestimonials() {
    return retryRequest(() => api.get('/testimonials'));
  },

  // Awards endpoints
  async getAwards() {
    return retryRequest(() => api.get('/awards'));
  },

  // Contact endpoints
  async submitContactMessage(messageData) {
    return retryRequest(() => api.post('/contact', messageData));
  },

  // Stats endpoints
  async getStats() {
    return retryRequest(() => api.get('/stats'));
  },
};

// Error handling utilities
export const handleApiError = (error, defaultMessage = 'An unexpected error occurred') => {
  if (error.response?.data?.error) {
    return error.response.data.error;
  } else if (error.message) {
    return error.message;
  }
  return defaultMessage;
};

// Loading state hook utility
export const createLoadingState = () => ({
  loading: false,
  error: null,
  data: null,
});

// API call wrapper with loading state
export const withLoadingState = async (apiCall, setState) => {
  setState(prev => ({ ...prev, loading: true, error: null }));
  
  try {
    const response = await apiCall();
    setState(prev => ({ 
      ...prev, 
      loading: false, 
      data: response.data,
      error: null 
    }));
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    setState(prev => ({ 
      ...prev, 
      loading: false, 
      error: errorMessage 
    }));
    throw error;
  }
};

// Cache management
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getCachedData = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

export const setCachedData = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
};

export const clearCache = () => {
  cache.clear();
};

// Cached API service functions
export const cachedApiService = {
  async getSkills() {
    const cacheKey = 'skills';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;
    
    const response = await apiService.getSkills();
    setCachedData(cacheKey, response.data);
    return response.data;
  },

  async getExperience() {
    const cacheKey = 'experience';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;
    
    const response = await apiService.getExperience();
    setCachedData(cacheKey, response.data);
    return response.data;
  },

  async getProjects(category = null) {
    const cacheKey = `projects_${category || 'all'}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;
    
    const response = await apiService.getProjects(category);
    setCachedData(cacheKey, response.data);
    return response.data;
  },

  async getTestimonials() {
    const cacheKey = 'testimonials';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;
    
    const response = await apiService.getTestimonials();
    setCachedData(cacheKey, response.data);
    return response.data;
  },

  async getAwards() {
    const cacheKey = 'awards';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;
    
    const response = await apiService.getAwards();
    setCachedData(cacheKey, response.data);
    return response.data;
  },
};

export default api;