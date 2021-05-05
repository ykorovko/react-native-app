import AsyncStorage from '@react-native-async-storage/async-storage'
import { Toast } from 'native-base'
import create from 'zustand'

import api from '../api'
import { navigate } from '../navigationRef'

type UserState = {
  fullname: string
  phone: string
  email: string
}

type UserStoreState = {
  tryLocalSignin: () => void
  signup: (values: { fullname: string }) => void
  login: (email: string, password: string) => void
  logout: () => void
  token?: string
  user?: UserState
  pending?: boolean
  error?: string
}

const useUserStore = create<UserStoreState>((set) => ({
  tryLocalSignin: async () => {
    const token = await AsyncStorage.getItem('token')

    if (token) {
      set({ token })

      navigate('Home')
    } else {
      navigate('Root')
    }
  },

  signup: async (values) => {
    try {
      const res = await api.post('/v1/auth/register', { data: values })

      const token = res.data.token
      const user = res.data.user

      await AsyncStorage.setItem('token', token)

      set({ token, user })
    } catch (err) {
      console.error(err)

      Toast.show({ text: err.message })

      return Promise.reject(err)
    }
  },

  login: async (email, password) => {
    try {
      const res = await api.post('/v1/auth/login', {
        data: { email, password }
      })

      const {
        data: { token, user }
      } = res

      await AsyncStorage.setItem('token', token)

      set({ token, user })
    } catch (err) {
      Toast.show({ text: err.message })
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem('token')

      set({ token: undefined, user: undefined })
    } catch (err) {
      Toast.show({ text: err.message })
    }
  }
}))

export default useUserStore
