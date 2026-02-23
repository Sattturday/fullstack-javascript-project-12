import { io } from 'socket.io-client'

export const createSocket = () =>
  io({
    autoConnect: false,
  })
