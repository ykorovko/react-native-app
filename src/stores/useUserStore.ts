import AsyncStorage from '@react-native-async-storage/async-storage'
import create from 'zustand'

import api from '../api'
import { navigate } from '../navigationRef'
import Toaster from '../utils/Toaster'

type UserState = {
  fullname: string
  phone: string
  email: string
  oath: boolean
}

type UserStoreState = {
  tryLocalSignin: () => void
  signup: (values: { fullname: string }) => void
  login: (email: string, password: string) => void
  verify: (values: { token: string }) => void
  loadUser: () => void
  updateUser: (values: any) => void
  logout: () => void
  token?: string
  user?: UserState
  pending?: boolean
  error?: string
}

const useUserStore = create<UserStoreState>((set, get) => ({
  tryLocalSignin: async () => {
    try {
      const token = await AsyncStorage.getItem('token')

      await get().loadUser()

      if (token) {
        set({ token })

        navigate('Home')
      } else {
        navigate('Root')
      }
    } catch (err) {
      Toaster.error('Auth error')
    }
  },

  signup: async (values) => {
    try {
      const res = await api.post('/v1/auth/register', values)

      const token = res.data.token
      const user = res.data.user

      await AsyncStorage.setItem('token', token)

      set({ token, user })
    } catch (err) {
      Toaster.error(err.message)

      return Promise.reject(err)
    }
  },

  login: async (email, password) => {
    try {
      const res = await api.post('/v1/auth/login', { email, password })

      const {
        data: { token, user }
      } = res

      await AsyncStorage.setItem('token', token)

      if (user?.oath) {
        set({ user })

        navigate('Verify')
      } else {
        set({ token, user })
      }
    } catch (err) {
      Toaster.error(err?.message)
    }
  },

  verify: async (values) => {
    try {
      await api.post('/v1/auth/verify', values)

      const token = await AsyncStorage.getItem('token')

      if (token) set({ token })
    } catch (err) {
      Toaster.error(err.message)
    }
  },

  loadUser: async () => {
    try {
      const res = await api.get('/v1/user')

      set({ user: res.data })
    } catch (err) {
      Toaster.error('Сoudn&#39;t load the user')
    }
  },

  updateUser: async (values) => {
    try {
      const res = await api.post('/v1/user', values)

      set({ user: res.data })
    } catch (err) {
      Toaster.error(err.message)
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem('token')

      set({ token: undefined, user: undefined })
    } catch (err) {
      Toaster.error(err.message)
    }
  }
}))

export default useUserStore
