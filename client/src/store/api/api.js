import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const token = localStorage.getItem('token');

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['items', 'lastItems'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('authorization', `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: builder => ({
    checkAuth: builder.query({
      query: () => '/auth/me',
    }),
  })
});