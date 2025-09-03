import axios from 'axios';

// Get backend URL from environment variables
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:8001';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    
    if (error.code === 'ECONNABORTED') {
      console.warn('Request timeout - API may be unavailable');
    } else if (error.response?.status >= 500) {
      console.warn('Server error - API may be experiencing issues');
    } else if (error.response?.status === 404) {
      console.warn('Endpoint not found');
    }
    
    return Promise.reject(error);
  }
);

// API service methods
export const apiService = {
  // Health check
  async getHealth() {
    const response = await api.get('/api/health');
    return response.data;
  },

  // Profile data
  async getProfile() {
    const response = await api.get('/api/profile');
    return response.data;
  },

  // Skills data
  async getSkills() {
    const response = await api.get('/api/skills');
    return response.data;
  },

  // Experience data
  async getExperience() {
    const response = await api.get('/api/experience');
    return response.data;
  },

  // Projects data
  async getProjects(category = null) {
    const url = category ? `/api/projects?category=${encodeURIComponent(category)}` : '/api/projects';
    const response = await api.get(url);
    return response.data;
  },

  // Testimonials data
  async getTestimonials() {
    const response = await api.get('/api/testimonials');
    return response.data;
  },

  // Certifications data
  async getCertifications() {
    const response = await api.get('/api/certifications');
    return response.data;
  },

  // Awards data
  async getAwards() {
    const response = await api.get('/api/awards');
    return response.data;
  },

  // Contact form submission
  async submitContact(contactData) {
    const response = await api.post('/api/contact', contactData);
    return response.data;
  },

  // Portfolio statistics
  async getStats() {
    const response = await api.get('/api/stats');
    return response.data;
  }
};

// Enhanced error handling utility
export const handleApiError = (error, fallbackData = null) => {
  console.error('API Error encountered:', error);

  // Network or timeout errors
  if (error.code === 'ECONNABORTED' || error.code === 'NETWORK_ERROR' || !error.response) {
    console.warn('Network issue detected, using fallback data if available');
    if (fallbackData) {
      return fallbackData;
    }
    throw new Error('Unable to connect to server. Please check your connection.');
  }

  // Server errors
  if (error.response?.status >= 500) {
    console.warn('Server error detected, using fallback data if available');
    if (fallbackData) {
      return fallbackData;
    }
    throw new Error('Server is experiencing issues. Please try again later.');
  }

  // Client errors
  if (error.response?.status >= 400 && error.response?.status < 500) {
    throw new Error(error.response?.data?.message || 'Request failed. Please check your input.');
  }

  // Generic error
  throw new Error('An unexpected error occurred. Please try again.');
};

// Cached API service for better performance
class CachedApiService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  async getCachedData(key, fetcher, fallbackData = null) {
    const cached = this.cache.get(key);
    const now = Date.now();

    // Return cached data if still valid
    if (cached && (now - cached.timestamp) < this.cacheTimeout) {
      console.log(`Returning cached data for ${key}`);
      return cached.data;
    }

    try {
      const data = await fetcher();
      this.cache.set(key, { data, timestamp: now });
      return data;
    } catch (error) {
      console.warn(`Failed to fetch ${key}, attempting fallback:`, error);
      
      // Try to return stale cache if available
      if (cached) {
        console.log(`Returning stale cached data for ${key}`);
        return cached.data;
      }

      // Return fallback data if provided
      if (fallbackData) {
        console.log(`Using fallback data for ${key}`);
        return fallbackData;
      }

      throw error;
    }
  }

  async getProfile(fallbackData) {
    return this.getCachedData('profile', () => apiService.getProfile(), fallbackData);
  }

  async getSkills(fallbackData) {
    return this.getCachedData('skills', () => apiService.getSkills(), fallbackData);
  }

  async getExperience(fallbackData) {
    return this.getCachedData('experience', () => apiService.getExperience(), fallbackData);
  }

  async getProjects(fallbackData, category = null) {
    const key = `projects${category ? `-${category}` : ''}`;
    return this.getCachedData(key, () => apiService.getProjects(category), fallbackData);
  }

  async getTestimonials(fallbackData) {
    return this.getCachedData('testimonials', () => apiService.getTestimonials(), fallbackData);
  }

  async getCertifications(fallbackData) {
    return this.getCachedData('certifications', () => apiService.getCertifications(), fallbackData);
  }

  async getAwards(fallbackData) {
    return this.getCachedData('awards', () => apiService.getAwards(), fallbackData);
  }

  async getStats(fallbackData) {
    return this.getCachedData('stats', () => apiService.getStats(), fallbackData);
  }

  clearCache() {
    this.cache.clear();
    console.log('API cache cleared');
  }
}

// Create cached API service instance
export const cachedApiService = new CachedApiService();

// Default export
export default apiService;