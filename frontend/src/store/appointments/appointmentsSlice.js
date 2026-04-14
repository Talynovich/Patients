import { createSlice } from '@reduxjs/toolkit'

export const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    isLoading: true,
    error: null,
  },
  reducers: {},
})
