import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    username: null,
    isLoading: true,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token
      state.username = action.payload.username
      state.isLoading = false
    },
    logout: (state) => {
      state.token = null
      state.username = null
      state.isLoading = false
    },
    restoreSession: (state) => {
      state.isLoading = false
    },
  },
})

export const { setCredentials, logout, restoreSession } = authSlice.actions
export default authSlice.reducer
