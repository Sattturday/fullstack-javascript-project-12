import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
  },
  reducers: {
    logout: (state) => {
      state.token = null
      localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      action =>
        action.type?.startsWith('api/executeMutation') && action.payload?.token,
      (state, action) => {
        state.token = action.payload.token
      },
    )
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
