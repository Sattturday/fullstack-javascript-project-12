import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../store/authSlice'
import { setMessages, addMessage, removeMessage } from '../store/messagesSlice'
import { setChannels } from '../store/channelsSlice'
import { setCurrentChannel } from '../store/uiSlice'

import {
  useGetChannelsQuery,
  useGetMessagesQuery,
  useAddMessageMutation,
} from '../services/api'
import socket from '../services/socket'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { currentChannelId } = useSelector(state => state.ui)
  const channels = useSelector(state => state.channels)
  const messages = useSelector(state => state.messages)

  const [newMessage, setNewMessage] = useState('')

  // Загрузка каналов
  const { data: channelsData, isLoading: channelsLoading } = useGetChannelsQuery()

  const { data: messagesData, isLoading: messagesLoading } = useGetMessagesQuery()

  const [sendMessage] = useAddMessageMutation()

  // сохраняем данные в redux
  useEffect(() => {
    if (channelsData) {
      dispatch(setChannels(channelsData))
    }
  }, [channelsData])

  useEffect(() => {
    if (messagesData) {
      dispatch(setMessages(messagesData))
    }
  }, [messagesData])

  // открываем general по умолчанию
  useEffect(() => {
    if (channels.length && !currentChannelId) {
      const general = channels.find(c => c.name === 'general')
      dispatch(setCurrentChannel(general?.id || channels[0].id))
    }
  }, [channels, currentChannelId])

  // socket listeners
  useEffect(() => {
    socket.on('newMessage', (message) => dispatch(addMessage(message)))
    socket.on('removeMessage', (data) => dispatch(removeMessage(data)))

    return () => {
      socket.off('newMessage')
      socket.off('removeMessage')
    }
  }, [])

  const currentMessages = messages.filter(
    msg => msg.channelId === currentChannelId,
  )

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      await sendMessage({
        text: newMessage,
        channelId: currentChannelId,
        username: 'user', // временно
      }).unwrap()

      setNewMessage('')
    }
    catch (error) {
      console.error(error)
    }
  }

  if (channelsLoading || messagesLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="d-flex flex-column h-100">
      {/* Navbar */}
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Hexlet Chat</span>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLogout}
          >
            Выйти
          </button>
        </div>
      </nav>

      {/* Main */}
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          {/* Channels */}
          <div className="col-4 col-md-2 border-end px-0 bg-light d-flex flex-column h-100">
            <div className="d-flex justify-content-between align-items-center p-3">
              <b>Каналы</b>
            </div>

            <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
              {channels.map(channel => (
                <li
                  key={channel.id}
                  className="nav-item w-100"
                >
                  <button
                    type="button"
                    onClick={() => dispatch(setCurrentChannel(channel.id))}
                    className={`w-100 rounded-0 text-start btn ${currentChannelId === channel.id
                      ? 'btn-secondary'
                      : 'btn-light'
                      }`}
                  >
                    <span className="me-1">#</span>
                    {channel.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Messages */}
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              {/* Header */}
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b># {channels.find(c => c.id === currentChannelId)?.name}</b>
                </p>
                <span className="text-muted">
                  Всего сообщений: {currentMessages.length}
                </span>
              </div>

              {/* Messages list */}
              <div className="chat-messages overflow-auto px-5 flex-grow-1">
                {currentMessages.map(message => (
                  <div key={message.id} className="text-break mb-2">
                    <b>{message.username}</b>: {message.text}
                  </div>
                ))}
              </div>

              {/* Form */}
              <div className="mt-auto px-5 py-3">
                <form
                  onSubmit={handleSendMessage}
                  className="py-1 border rounded-2"
                >
                  <div className="input-group">
                    <input
                      name="body"
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      placeholder="Введите сообщение..."
                      className="border-0 p-0 ps-2 form-control"
                    />

                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="btn btn-group-vertical"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-arrow-right-square"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                        >
                        </path>
                      </svg>
                      <span className="visually-hidden">Отправить</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
