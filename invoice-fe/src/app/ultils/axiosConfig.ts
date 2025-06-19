import axios from 'axios'

// Create axios instance with default configuration
const api = axios.create({
  baseURL: 'http://localhost:8080', // Backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
})
