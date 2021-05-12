import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import create from 'zustand'

import api from '../api'
import { SCREENS, SECURE_STORAGE, STORAGE } from '../constants'
import { navigate } from '../navigationRef'
import { SignupInput } from '../types/inputs'
import Toaster from '../utils/Toaster'

type UserState = {
  fullname: string
  phone: string
  email: string
  oath: boolean
}

type UserStoreState = {
  tryLocalSignin: () => void
  loginWithSecureStoreCredentials: () => void
  signup: (values: SignupInput) => void
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
      const token = await AsyncStorage.getItem(STORAGE.token)

      if (token) {
        set({ token })

        await get().loadUser()

        navigate(SCREENS.home)
      } else {
        navigate(SCREENS.root)
      }
    } catch (err) {
      Toaster.error('Auth error')
    }
  },

  loginWithSecureStoreCredentials: async () => {
    try {
      const email = await SecureStore.getItemAsync(SECURE_STORAGE.email)
      const password = await SecureStore.getItemAsync(SECURE_STORAGE.password)

      if (email && password) {
        await get().login(email, password)
      } else {
        navigate(SCREENS.signin)

        Toaster.error('Error, please use your email and password to login')
      }
    } catch (err) {
      Toaster.error('Local auth error')
    }
  },

  signup: async (values) => {
    try {
      const res = await api.post('/v1/auth/register', values)

      const token = res.data.token
      const user = res.data.user

      await AsyncStorage.setItem(STORAGE.token, token)

      await SecureStore.setItemAsync(SECURE_STORAGE.email, values.email)
      await SecureStore.setItemAsync(SECURE_STORAGE.password, values.password)

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

      await AsyncStorage.setItem(STORAGE.token, token)

      await SecureStore.setItemAsync(SECURE_STORAGE.email, email)
      await SecureStore.setItemAsync(SECURE_STORAGE.password, password)

      if (user?.oath) {
        set({ user })

        navigate(SCREENS.verify)
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

      const token = await AsyncStorage.getItem(STORAGE.token)

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
      Toaster.error('Unable to load user')
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
      await AsyncStorage.removeItem(STORAGE.token)

      set({ token: undefined, user: undefined })
    } catch (err) {
      Toaster.error(err.message)
    }
  }
}))

export default useUserStore
