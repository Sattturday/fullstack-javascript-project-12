import PropTypes from 'prop-types'
import { useRemoveChannelMutation } from '../../services/api'
import { useDispatch } from 'react-redux'
import { setCurrentChannel } from '../../store/uiSlice'
import { removeChannelMessages } from '../../store/messagesSlice'

const RemoveChannelModal = ({ channel, defaultChannelId, onClose }) => {
  const dispatch = useDispatch()
  const [removeChannel, { isLoading }] = useRemoveChannelMutation()

  const handleRemove = async () => {
    await removeChannel(channel.id).unwrap()
    dispatch(removeChannelMessages(channel.id))
    dispatch(setCurrentChannel(defaultChannelId))
    onClose()
  }

  return (
    <div className="modal show d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Удалить канал</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            Уверены?
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Отменить
            </button>
            <button
              type="button"
              disabled={isLoading}
              className="btn btn-danger"
              onClick={handleRemove}
            >
              Удалить
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
