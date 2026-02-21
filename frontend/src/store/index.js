import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import channelsReducer from './channelsSlice'
import messagesReducer from './messagesSlice'
import uiReducer from './uiSlice'
import { api } from '../services/api'

const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    ui: uiReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
})

export default store
