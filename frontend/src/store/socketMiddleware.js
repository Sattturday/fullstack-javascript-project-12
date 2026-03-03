import { setCurrentChannel } from './uiSlice'
import { logout } from './authSlice'
import { api } from '../services/api'

export const createSocketMiddleware = socket => (store) => {
  socket.on('newMessage', (payload) => {
    store.dispatch(
      api.util.updateQueryData('getMessages', undefined, (draft) => {
        draft.push(payload)
      }),
    )
  })

  socket.on('newChannel', (payload) => {
    store.dispatch(
      api.util.updateQueryData('getChannels', undefined, (draft) => {
        draft.push(payload)
      }),
    )
  })

  socket.on('removeChannel', ({ id }) => {
    const state = store.getState()
    const { currentChannelId } = state.ui

    store.dispatch(
      api.util.updateQueryData('getChannels', undefined, (draft) => {
        return draft.filter(c => c.id !== id)
      }),
    )

    store.dispatch(
      api.util.updateQueryData('getMessages', undefined, (draft) => {
        return draft.filter(m => m.channelId !== id)
      }),
    )

    if (currentChannelId === id) {
      const channels = api.endpoints.getChannels.select()(store.getState()).data || []
      const general = channels.find(c => c.name === 'general')
      store.dispatch(setCurrentChannel(general?.id || channels[0]?.id))
    }
  })

  socket.on('renameChannel', (payload) => {
    store.dispatch(
      api.util.updateQueryData('getChannels', undefined, (draft) => {
        const channel = draft.find(c => c.id === payload.id)
        if (channel) {
          channel.name = payload.name
        }
      }),
    )
  })

  return next => (action) => {
    const result = next(action)

    if (logout.match(action)) {
      socket.disconnect()
    }

    return result
  }
}
