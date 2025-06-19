import axios from 'axios'

// Create axios instance with default configuration
const api = axios.create({
<<<<<<< HEAD
  baseURL: 'http://localhost:8080', // Thay thế bằng URL API của bạn
=======
  baseURL: 'http://localhost:8080/api', // Backend API URL
>>>>>>> Purchase-Request-2
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, // Set to true if you need to include credentials
})

<<<<<<< HEAD
// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
=======
// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url)
>>>>>>> Purchase-Request-2
    return config
  },
  (error) => {
    return Promise.reject(error)
<<<<<<< HEAD
  },
)

// Response interceptor
=======
  }
)

// Add response interceptor for error handling
>>>>>>> Purchase-Request-2
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
<<<<<<< HEAD
    if (error.message === 'Network Error') {
      console.error('CORS or network error occurred.')
      // You could dispatch a notification action here
    }
    return Promise.reject(error)
  },
=======
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
>>>>>>> Purchase-Request-2
)

export default api
