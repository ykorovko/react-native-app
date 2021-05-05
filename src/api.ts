import AsyncStorage from '@react-native-async-storage/async-storage'

import ApiBuilder from './utils/ApiBuilder'

class Api extends ApiBuilder {}

const api = new Api({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})

api.instance.interceptors.request.use(
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

export default api
