import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: Cookies.get('accessToken') || null,
    refreshToken: Cookies.get('refreshToken') || null,
    isAuthenticated: !!Cookies.get('accessToken'),
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.isAuthenticated = true
      Cookies.set('accessToken', action.payload.accessToken, {
        expires: 1,
        secure: true,
        sameSite: 'strict',
      })
      Cookies.set('refreshToken', action.payload.refreshToken, {
        expires: 7,
        secure: true,
        sameSite: 'strict',
      })
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    },
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      localStorage.removeItem('user')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
