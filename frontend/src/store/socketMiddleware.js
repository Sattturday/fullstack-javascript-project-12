import { addMessage, removeChannelMessages } from './messagesSlice'
import {
  addChannel,
  removeChannel,
  renameChannel,
} from './channelsSlice'
import { setCurrentChannel } from './uiSlice'

export const createSocketMiddleware = (socket) => (store) => {
  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload))
  })

  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload))
  })

  socket.on('removeChannel', ({ id }) => {
    const state = store.getState()
    const { channels } = state
    const { currentChannelId } = state.ui

    store.dispatch(removeChannel(id))
    store.dispatch(removeChannelMessages(id))

    if (currentChannelId === id) {
      const general = channels.find(c => c.name === 'general')
      store.dispatch(
        setCurrentChannel(general?.id || channels[0]?.id)
      )
    }
  })

  socket.on('renameChannel', (payload) => {
    store.dispatch(renameChannel(payload))
  })

  return (next) => (action) => next(action)
}