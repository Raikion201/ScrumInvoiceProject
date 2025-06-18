import axios from 'axios'

// tao mot instance cua axios voi cau hinh mac dinh
const api = axios.create({
  baseURL: 'https://api.example.com', // Thay thế bằng URL API của bạn
  headers: {
    'Content-Type': 'application/json',
  },
})
