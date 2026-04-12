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
      query: () => '/patients',
      providesTags: ['Patients'],
    }),
    deletePatient: build.mutation({
      query: (id) => ({ url: `/patients/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Patients'],
    }),
    savePatient: build.mutation({
      query: (data) => ({
        url: data._id ? `/patients/${data._id}` : '/patients',
        method: data._id ? 'PATCH' : 'POST',
        body: data,
      }),
      invalidatesTags: ['Patients'],
    }),
  }),
})

export const {
  useGetPatientsQuery,
  useDeletePatientMutation,
  useSavePatientMutation,
} = patientsApi
