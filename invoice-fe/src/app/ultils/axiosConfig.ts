import axios from 'axios'

// tao mot instance cua axios voi cau hinh mac dinh
const api = axios.create({
  baseURL: 'http://localhost:8080', // Thay thế bằng URL API của bạn
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, // Set to true if you need to include credentials
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.message === 'Network Error') {
      console.error('CORS or network error occurred.')
      // You could dispatch a notification action here
    }
    return Promise.reject(error)
  },
)

export default api
