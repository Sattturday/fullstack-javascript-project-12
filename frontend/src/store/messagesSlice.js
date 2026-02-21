import { createSlice } from '@reduxjs/toolkit'

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    setMessages: (_, action) => action.payload,
    addMessage: (state, action) => {
      state.push(action.payload)
    },
    removeMessage: (state, action) =>
      state.filter(m => m.id !== action.payload.id),
  },
})

export const { setMessages, addMessage, removeMessage } = messagesSlice.actions
export default messagesSlice.reducer
