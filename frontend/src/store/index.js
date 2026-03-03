import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import uiReducer from './uiSlice'
import { api } from '../services/api'
import { createSocketMiddleware } from './socketMiddleware'

export const createAppStore = socket =>
  configureStore({
    reducer: {
      auth: authReducer,
      ui: uiReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(api.middleware)
        .concat(createSocketMiddleware(socket)),
  })
