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
      query: () => '/appointments',
      providesTags: ['Appointments'],
    }),
    deleteAppointment: build.mutation({
      query: (id) => {
        console.log(id, 'id')
        return {
          url: `/appointments/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Appointments'],
    }),
    updateAppointment: build.mutation({
      query: (data) => {
        return {
          url: `/appointments/${data._id}`,
          method: 'PATCH',
          body: data,
        }
      },
      invalidatesTags: ['Appointments'],
    }),
    createAppointment: build.mutation({
      query: (data) => ({
        url: '/appointments',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Appointments'],
    }),
  }),
})

export const {
  useGetAppointmentsQuery,
  useCreateAppointmentMutation,
  useDeleteAppointmentMutation,
  useUpdateAppointmentMutation,
} = appointmentsApi
