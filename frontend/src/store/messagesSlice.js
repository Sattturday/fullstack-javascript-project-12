import { createSlice } from '@reduxjs/toolkit'

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    setMessages: (_, action) => action.payload,
    addMessage: (state, action) => {
      state.push(action.payload)
    },
    removeChannelMessages: (state, action) => state.filter(m => m.channelId !== action.payload),
  },
})

export const { setMessages, addMessage, removeMessage, removeChannelMessages } = messagesSlice.actions
export default messagesSlice.reducer
