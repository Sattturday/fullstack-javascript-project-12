import { useDispatch, useSelector } from 'react-redux'
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap'
import { setCurrentChannel } from '../store/uiSlice'
import PropTypes from 'prop-types'

const ChannelsList = ({
  onAddChannel,
  onRenameChannel,
  onRemoveChannel,
}) => {
  const dispatch = useDispatch()
  const channels = useSelector(state => state.channels)
  const currentChannelId = useSelector(state => state.ui.currentChannelId)

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light d-flex flex-column h-100">
      <div className="d-flex mt-1 justify-content-between align-items-center mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>

        <button
          type="button"
          onClick={onAddChannel}
          className="p-0 text-primary btn btn-group-vertical border-0"
        >
          <i className="bi bi-plus-square" style={{ fontSize: '20px' }}></i>
          <span className="visually-hidden">+</span>
        </button>
      </div>

      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map(channel => (
          <li key={channel.id} className="nav-item w-100">
            {!channel.removable && (
              <Button
                variant={currentChannelId === channel.id ? 'secondary' : 'light'}
                className="w-100 rounded-0 text-start"
                onClick={() => dispatch(setCurrentChannel(channel.id))}
              >
                <span className="me-1">#</span>
                {channel.name}
              </Button>
            )}

            {channel.removable && (
              <Dropdown as={ButtonGroup} className="d-flex">
                <Button
                  variant={currentChannelId === channel.id ? 'secondary' : 'light'}
                  className="w-100 rounded-0 text-start text-truncate"
                  onClick={() => dispatch(setCurrentChannel(channel.id))}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </Button>

                <Dropdown.Toggle
                  split
                  variant={currentChannelId === channel.id ? 'secondary' : 'light'}
                  id={`dropdown-${channel.id}`}
                >
                  <span className="visually-hidden">
                    Управление каналом
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => onRemoveChannel(channel)}
                  >
                    Удалить
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => onRenameChannel(channel)}
                  >
                    Переименовать
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

ChannelsList.propTypes = {
  onAddChannel: PropTypes.func.isRequired,
  onRenameChannel: PropTypes.func.isRequired,
  onRemoveChannel: PropTypes.func.isRequired,
}

export default ChannelsList
