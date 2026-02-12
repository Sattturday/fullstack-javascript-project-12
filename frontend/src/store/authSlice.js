import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Асинхронный thunk для входа пользователя
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/v1/login', credentials)
      return response.data
    }
    catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка авторизации')
    }
  },
)

// Слайс для управления состоянием авторизации
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null
      localStorage.removeItem('token')
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка запроса на вход
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      // Обработка успешного входа
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        localStorage.setItem('token', action.payload.token)
      })
      // Обработка ошибки входа
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
