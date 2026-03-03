import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { setCurrentChannel } from '../store/uiSlice'
import { useGetChannelsQuery, useGetMessagesQuery } from '../services/api'
import ChannelsList from '../components/ChannelsList'
import ChatWindow from '../components/ChatWindow'

const Home = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { currentChannelId } = useSelector(state => state.ui)

  const { data: channels = [], error: channelsError } = useGetChannelsQuery()
  const { error: messagesError } = useGetMessagesQuery()

  // Обработка сетевых ошибок
  useEffect(() => {
    if (channelsError || messagesError) {
      toast.error(t('errors.connection'))
    }
  }, [channelsError, messagesError, t])

  // Установка дефолтного канала
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
          <ChannelsList />
          <ChatWindow />
        </div>
      </div>
    </div>
  )
}

export default Home
