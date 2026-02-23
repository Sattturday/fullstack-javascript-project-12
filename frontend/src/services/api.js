import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logout } from '../store/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    api.dispatch(logout())
  }

  return result
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Channels', 'Messages'],
  endpoints: builder => ({
    // Аутентификация
    login: builder.mutation({
      query: credentials => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response) => {
        if (response.token) {
          localStorage.setItem('token', response.token)
        }
        return response
      },
    }),

    // Регистрация
    signup: builder.mutation({
      query: credentials => ({
        url: 'signup',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response) => {
        // При успешной регистрации перенаправляем на страницу логина
        return response
      },
    }),

    // Каналы
    getChannels: builder.query({
      query: () => 'channels',
      providesTags: ['Channels'],
    }),

    addChannel: builder.mutation({
      query: channel => ({
        url: 'channels',
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: ['Channels'],
    }),

    renameChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: `channels/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      invalidatesTags: ['Channels'],
    }),

    removeChannel: builder.mutation({
      query: id => ({
        url: `channels/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channels', 'Messages'],
    }),

    // Сообщения
    getMessages: builder.query({
      query: () => 'messages',
      providesTags: ['Messages'],
    }),

    addMessage: builder.mutation({
      query: message => ({
        url: 'messages',
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
})

export const {
  useLoginMutation,
  useSignupMutation,
  useGetChannelsQuery,
  useAddChannelMutation,
  useRenameChannelMutation,
  useRemoveChannelMutation,
  useGetMessagesQuery,
  useAddMessageMutation,
} = api
