import axios from 'axios';

// Base URL for API
const API_URL = 'http://localhost:5000/api';

// Axios instance with default config
const apiInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Adding a request interceptor
apiInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            navigate('/');
        }
        return Promise.reject(error);
    }
);

export default apiInstance;