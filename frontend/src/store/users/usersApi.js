import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { baseurl } from '../../constant/constant'

export const usersApi = createApi({
  reducerPath: 'usersApi',
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
  tagTypes: ['Users'],
  endpoints: (build) => ({
    getUsers: build.query({
      query: ({ page, limit = 10 }) =>
        `/users/doctors?page=${page}&limit=${limit}`,
      providesTags: ['Users'],
    }),
    deleteUser: build.mutation({
      query: (id) => {
        return {
          url: `/users/doctors/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Users'],
    }),
    updateUser: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/doctors/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),
    createUser: build.mutation({
      query: (data) => ({
        url: '/users/doctors',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersApi
