import { configureStore } from '@reduxjs/toolkit'

import { authApi } from './auth/authApi'
import authReducer from './auth/authSlice'
import { patientsApi } from './patients/patientsApi'

export const store = configureStore({
  reducer: {
    [patientsApi.reducerPath]: patientsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(patientsApi.middleware, authApi.middleware),
})
