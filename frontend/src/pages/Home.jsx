import {
  useGetChannelsQuery,
  useGetMessagesQuery,
  useAddMessageMutation,
} from '../services/api'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../store/authSlice'
import { useState } from 'react'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [newMessage, setNewMessage] = useState('')
  const [currentChannelId, setCurrentChannelId] = useState(1) // По умолчанию первый канал

  // Загрузка каналов
  const {
    data: channels = [],
    isLoading: channelsLoading,
    error: channelsError,
  } = useGetChannelsQuery()

  // Загрузка сообщений
  const { data: messages = [], isLoading: messagesLoading }
    = useGetMessagesQuery()

  // Отправка сообщений
  const [addMessage, { isLoading: sendingMessage }] = useAddMessageMutation()

  // Фильтруем сообщения по текущему каналу
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
      // Из токена можно получить username, но для простоты используем временное имя
      // В реальном проекте нужно декодировать JWT или сделать запрос на /me
      const username = 'user' // Временное решение

      await addMessage({
        text: newMessage,
        channelId: currentChannelId,
        username,
      }).unwrap()

      setNewMessage('')
    }
    catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  if (channelsLoading || messagesLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    )
  }

  if (channelsError) {
    return (
      <div
        className="alert alert-danger m-3"
        role="alert"
      >
        Ошибка загрузки:
        {' '}
        {channelsError.data?.message || channelsError.message}
      </div>
    )
  }

  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      {/* Header с кнопкой выхода */}
      <nav className="navbar navbar-expand navbar-dark bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Hexlet Chat</span>
          <div className="navbar-nav ms-auto">
            <button
              onClick={handleLogout}
              className="btn btn-outline-light"
              type="button"
            >
              Выйти
            </button>
          </div>
        </div>
      </nav>

      <div className="row flex-grow-1 overflow-hidden">
        {/* Список каналов */}
        <div
          className="col-3 border-end p-0 d-flex flex-column"
          style={{ height: 'calc(100vh - 56px)' }}
        >
          <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Каналы</h5>
            <button className="btn btn-sm btn-primary">+</button>
          </div>
          <div className="list-group list-group-flush overflow-auto flex-grow-1">
            {channels.map(channel => (
              <button
                key={channel.id}
                onClick={() => setCurrentChannelId(channel.id)}
                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                  currentChannelId === channel.id ? 'active' : ''
                }`}
              >
                #
                {' '}
                {channel.name}
                <span className="badge bg-secondary rounded-pill">
                  {messages.filter(m => m.channelId === channel.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Область сообщений */}
        <div
          className="col-9 p-0 d-flex flex-column"
          style={{ height: 'calc(100vh - 56px)' }}
        >
          {/* Заголовок канала */}
          <div className="p-3 border-bottom">
            <h5 className="mb-0">
              #
              {' '}
              {channels.find(c => c.id === currentChannelId)?.name
                || 'Выберите канал'}
            </h5>
          </div>

          {/* Сообщения */}
          <div
            className="flex-grow-1 overflow-auto p-3"
            style={{ maxHeight: 'calc(100vh - 200px)' }}
          >
            {currentMessages.map(msg => (
              <div
                key={msg.id}
                className="mb-3"
              >
                <strong>
                  {msg.username}
                  :
                </strong>
                {' '}
                {msg.text}
              </div>
            ))}
          </div>

          {/* Форма отправки сообщения */}
          <div className="p-3 border-top">
            <form
              onSubmit={handleSendMessage}
              className="d-flex gap-2"
            >
              <input
                type="text"
                className="form-control"
                placeholder="Введите сообщение..."
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                disabled={sendingMessage}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={sendingMessage || !newMessage.trim()}
              >
                {sendingMessage ? 'Отправка...' : 'Отправить'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
