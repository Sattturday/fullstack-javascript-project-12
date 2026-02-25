import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import leoProfanity from 'leo-profanity'
import { useAddMessageMutation } from '../services/api'

const ChatWindow = () => {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const currentChannelId = useSelector(state => state.ui.currentChannelId)
  const channels = useSelector(state => state.channels)
  const messages = useSelector(state => state.messages)
  const username = useSelector(state => state.auth.username)

  const [sendMessage] = useAddMessageMutation()

  const currentChannel = channels.find(c => c.id === currentChannelId)

  const currentMessages = messages.filter(
    m => m.channelId === currentChannelId,
  )

  const handleSubmit = async (e) => {
    e.preventDefault()

    const cleanedText = leoProfanity.clean(text).trim()
    if (!cleanedText) return

    await sendMessage({
      text: cleanedText,
      channelId: currentChannelId,
      username: username || 'user',
    })

    setText('')
  }

  const formatMessageCount = (count) => {
    const remainder10 = count % 10
    const remainder100 = count % 100

    if (remainder10 === 1 && remainder100 !== 11) {
      return `${count} ${t('chat.messages.one')}`
    }
    if (remainder10 >= 2 && remainder10 <= 4 && (remainder100 < 12 || remainder100 > 14)) {
      return `${count} ${t('chat.messages.few')}`
    }
    return `${count} ${t('chat.messages.many')}`
  }

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">

        {/* Header */}
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannel?.name}`}</b>
          </p>
          <span className="text-muted">
            {formatMessageCount(currentMessages.length)}
          </span>
        </div>

        {/* Messages */}
        <div className="overflow-auto px-5 flex-grow-1">
          {currentMessages.map(message => (
            <div key={message.id} className="text-break mb-2">
              <b>{message.username}</b>
              :
              {' '}
              {message.text}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="mt-auto px-5 py-3">
          <form
            onSubmit={handleSubmit}
            className="py-1 border rounded-2"
          >
            <div className="input-group">
              <input
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder={t('chat.input.placeholder')}
                className="border-0 p-0 ps-2 form-control"
                aria-label={t('chat.input.ariaLabel')}
              />
              <button
                type="submit"
                disabled={!text?.trim()}
                className="btn btn-group-vertical"
              >
                <i
                  className="bi bi-arrow-right-square"
                  style={{ fontSize: '20px' }}
                >
                </i>
                <span className="visually-hidden">{t('chat.send')}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
