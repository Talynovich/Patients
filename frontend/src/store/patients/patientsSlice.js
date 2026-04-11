import { createSlice } from '@reduxjs/toolkit'

const patientsSlice = createSlice({
  name: 'patients',
  initialState: {
    patient: [],
    currentPatient: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    setCurrentPatient(state, action) {
      state.currentPatient = action.payload
    },
  },
})

export const { setCurrentPatient } = patientsSlice.actions
export default patientsSlice.reducer
