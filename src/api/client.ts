import axios from 'axios';

// LaunchKit response interface to match backend
export interface LaunchKitResponse {
  id: string;
  market_analysis: string;
  product_copy: string;
  ad_copy: string;
  social_posts: string[];
}

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 30000, // 30 seconds timeout for AI generation
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log('Making API request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Fetch launch kit from the API
export const fetchLaunchKit = async (productIdea: string): Promise<LaunchKitResponse> => {
  try {
    const response = await apiClient.post<LaunchKitResponse>('/api/v1/generate-launch-kit', {
      product_idea: productIdea,
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 422) {
        throw new Error('Invalid input. Please provide a valid product idea.');
      } else if (error.response?.status >= 500) {
        throw new Error('Server error. Please try again later.');
      } else if (error.code === 'ECONNREFUSED') {
        throw new Error('Unable to connect to the server. Please check if the backend is running.');
      }
    }
    throw new Error('An unexpected error occurred. Please try again.');
  }
};

export default apiClient;