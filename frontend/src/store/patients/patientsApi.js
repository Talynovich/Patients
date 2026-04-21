import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { baseurl } from '../../constant/constant'

export const patientsApi = createApi({
  reducerPath: 'patientsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseurl}`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Patients'],
  endpoints: (build) => ({
    getPatients: build.query({
      query: ({ page, limit = 10 }) => `/patients?page=${page}&limit=${limit}`,
      providesTags: ['Patients'],
    }),
    deletePatient: build.mutation({
      query: (id) => ({ url: `/patients/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Patients'],
    }),
    updatePatient: build.mutation({
      query: (data) => ({
        url: `/patients/${data._id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Patients'],
    }),
    createPatient: build.mutation({
      query: (data) => ({
        url: '/patients',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Patients'],
    }),
  }),
})

export const {
  useGetPatientsQuery,
  useDeletePatientMutation,
  useUpdatePatientMutation,
  useCreatePatientMutation,
} = patientsApi
