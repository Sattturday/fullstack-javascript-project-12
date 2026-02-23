import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../store/authSlice'
import { setMessages, addMessage, removeChannelMessages } from '../store/messagesSlice'
import { setChannels, addChannel, removeChannel, renameChannel } from '../store/channelsSlice'
import { setCurrentChannel } from '../store/uiSlice'
import { useGetChannelsQuery, useGetMessagesQuery } from '../services/api'
import socket from '../services/socket'
import ChannelsList from '../components/ChannelsList'
import ChatWindow from '../components/ChatWindow'
import AddChannelModal from '../components/modals/AddChannelModal'
import RenameChannelModal from '../components/modals/RenameChannelModal'
import RemoveChannelModal from '../components/modals/RemoveChannelModal'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { currentChannelId } = useSelector(state => state.ui)
  const channels = useSelector(state => state.channels)


  const { data: channelsData } = useGetChannelsQuery()
  const { data: messagesData } = useGetMessagesQuery()

  const [modal, setModal] = useState(null)

  useEffect(() => {
    socket.connect()

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (channelsData) dispatch(setChannels(channelsData))
  }, [channelsData, dispatch])

  useEffect(() => {
    if (messagesData) dispatch(setMessages(messagesData))
  }, [messagesData, dispatch])

  useEffect(() => {
    if (channels.length && !currentChannelId) {
      const general = channels.find(c => c.name === 'general')
      dispatch(setCurrentChannel(general?.id || channels[0].id))
    }
  }, [channels, currentChannelId, dispatch])

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message))
    })

    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel))
    })

    socket.on('removeChannel', ({ id }) => {
      dispatch(removeChannel(id))
      dispatch(removeChannelMessages(id))

      // если пользователь находился в удалённом канале
      if (currentChannelId === id) {
        const general = channels.find(c => c.name === 'general')
        dispatch(setCurrentChannel(general?.id || channels[0].id))
      }
    })

    socket.on('renameChannel', (channel) => {
      dispatch(renameChannel(channel))
    })

    return () => {
      socket.off('newMessage')
      socket.off('newChannel')
      socket.off('removeChannel')
      socket.off('renameChannel')
    }
  }, [dispatch, currentChannelId, channels])

  const handleLogout = () => {
    socket.disconnect()
    dispatch(logout())
    navigate('/login')
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

      {/* Основной контент */}
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <ChannelsList
            onAddChannel={() => setModal({ type: 'add' })}
            onRenameChannel={channel => setModal({ type: 'rename', channel })}
            onRemoveChannel={channel => setModal({ type: 'remove', channel })}
          />
          <ChatWindow />
        </div>
      </div>

      {modal?.type === 'add' && (
        <AddChannelModal onClose={() => setModal(null)} />
      )}

      {modal?.type === 'rename' && (
        <RenameChannelModal
          channel={modal.channel}
          onClose={() => setModal(null)}
        />
      )}

      {modal?.type === 'remove' && (
        <RemoveChannelModal
          channel={modal.channel}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}

export default Home
