import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../store/messagesSlice'
import { setChannels } from '../store/channelsSlice'
import { setCurrentChannel } from '../store/uiSlice'
import { useGetChannelsQuery, useGetMessagesQuery } from '../services/api'
import ChannelsList from '../components/ChannelsList'
import ChatWindow from '../components/ChatWindow'
import AddChannelModal from '../components/modals/AddChannelModal'
import RenameChannelModal from '../components/modals/RenameChannelModal'
import RemoveChannelModal from '../components/modals/RemoveChannelModal'

const Home = () => {
  const dispatch = useDispatch()

  const { currentChannelId } = useSelector(state => state.ui)
  const channels = useSelector(state => state.channels)

  const { data: channelsData } = useGetChannelsQuery()
  const { data: messagesData } = useGetMessagesQuery()

  const [modal, setModal] = useState(null)

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

  return (
    <div className="container flex-grow-1 d-flex align-items-center justify-content-center">
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
