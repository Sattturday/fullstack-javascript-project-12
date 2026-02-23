import { createSlice } from '@reduxjs/toolkit'

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    setChannels: (_, action) => action.payload,
    addChannel: (state, action) => {
      state.push(action.payload)
    },
    removeChannel: (state, action) =>
      state.filter(c => c.id !== action.payload),
    renameChannel: (state, action) => {
      const channel = state.find(c => c.id === action.payload.id)
      if (channel) {
        channel.name = action.payload.name
      }
    },
  },
})

export const { setChannels, addChannel, removeChannel, renameChannel }
  = channelsSlice.actions

export default channelsSlice.reducer
