import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { baseurl } from '../../constant/constant'
import { logout, setCredentials } from './authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseurl}`,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken
    if (token) {
      try {
        headers.set('authorization', `Bearer ${token}`)
      } catch (e) {
        console.log(`Critical error in authorization token: ${e}`)
      }
    }
    return headers
  },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const refreshToken = api.getState().auth.refreshToken
    const refreshResult = await baseQuery(
      {
        url: 'auth/refresh',
        method: 'POST',
        body: { refreshToken },
      },
      api,
      extraOptions
    )

    if (refreshResult.data) {
      api.dispatch(setCredentials(refreshResult.data))
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }
  return result
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    login: build.mutation({
      query: (credential) => ({
        url: 'auth/login',
        method: 'POST',
        body: credential,
      }),
    }),
    getUser: build.query({
      query: () => ({
        url: '/appointments',
      }),
    }),
  }),
})

export const { useLoginMutation, useGetUserQuery } = authApi
