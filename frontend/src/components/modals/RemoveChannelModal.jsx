import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useRemoveChannelMutation } from '../../services/api'
import { setCurrentChannel } from '../../store/uiSlice'
import { removeChannelMessages } from '../../store/messagesSlice'

const RemoveChannelModal = ({ channel, defaultChannelId, onClose }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [removeChannel, { isLoading }] = useRemoveChannelMutation()

  const handleRemove = async () => {
    try {
      await removeChannel(channel.id).unwrap()
      toast.success(t('channels.removed'))
      dispatch(removeChannelMessages(channel.id))
      dispatch(setCurrentChannel(defaultChannelId))
      onClose()
    } catch (e) {
      console.error('Error removing channel:', e)
    }
  }

  return (
    <div className="modal show d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t('channels.remove')}</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            {t('channels.confirmRemove')}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              {t('channels.cancel')}
            </button>
            <button
              type="button"
              disabled={isLoading}
              className="btn btn-danger"
              onClick={handleRemove}
            >
              {t('channels.delete')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

RemoveChannelModal.propTypes = {
  channel: PropTypes.object.isRequired,
  defaultChannelId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default RemoveChannelModal
