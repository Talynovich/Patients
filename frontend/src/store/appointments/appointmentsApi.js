import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { baseurl } from '../../constant/constant'

export const appointmentsApi = createApi({
  reducerPath: 'appointmentsApi',
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
  tagTypes: ['Appointments'],
  endpoints: (build) => ({
    getAppointments: build.query({
      query: () => '/appointments/me',
      providesTags: ['Appointments'],
    }),
    // deletePatient: build.mutation({
    //   query: (id) => ({ url: `/patients/${id}`, method: 'DELETE' }),
    //   invalidatesTags: ['Patients'],
    // }),
    // updatePatient: build.mutation({
    //   query: (data) => ({
    //     url: `/patients/${data._id}`,
    //     method: 'PATCH',
    //     body: data,
    //   }),
    //   invalidatesTags: ['Patients'],
    // }),
    // createPatient: build.mutation({
    //   query: (data) => ({
    //     url: '/patients',
    //     method: 'POST',
    //     body: data,
    //   }),
    //   invalidatesTags: ['Patients'],
    // }),
  }),
})

export const { useGetAppointmentsQuery } = appointmentsApi
