import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { urlpatients } from '../../constant/constant'

export const patientsApi = createApi({
  reducerPath: 'patientsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${urlpatients}`,
  }),
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken
    console.log(token, 123121)
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers;
  },
  tagTypes: ['Patients'],
  endpoints: (build) => ({
    getPatients: build.query({
      query: () => '',
      providesTags: ['Patients'],
    }),
    deletePatient: build.mutation({
      query: (id) => ({ url: `/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Patients'],
    }),
    savePatient: build.mutation({
      query: (data) => ({
        url: data.id ? `/${data.id}` : '/',
        method: data.id ? 'PUT' : 'POST',
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
