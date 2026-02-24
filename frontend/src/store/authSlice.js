import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || null,
  },
  reducers: {
    logout: (state) => {
      state.token = null
      state.username = null
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      action =>
        action.type?.startsWith('api/executeMutation') && action.payload?.token,
      (state, action) => {
        state.token = action.payload.token
        state.username = action.payload.username
      },
    )
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
