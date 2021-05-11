import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { AxiosError } from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

api.interceptors.response.use(
  function (response) {
    return response?.data
  },
  function (error: AxiosError) {
    return Promise.reject(error?.response?.data)
  }
)

export default api
