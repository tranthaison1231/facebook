import axios from 'axios'
import { getToken, removeToken } from './token'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const request = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  withCredentials: true
})

request.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response.status === 401) {
      removeToken()
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)
