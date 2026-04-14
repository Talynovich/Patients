import { configureStore } from '@reduxjs/toolkit'

import { appointmentsApi } from './appointments/appointmentsApi'
import { authApi } from './auth/authApi'
import authReducer from './auth/authSlice'
import { patientsApi } from './patients/patientsApi'

export const store = configureStore({
  reducer: {
    [patientsApi.reducerPath]: patientsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [appointmentsApi.reducerPath]: appointmentsApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      patientsApi.middleware,
      authApi.middleware,
      appointmentsApi.middleware
    ),
})
