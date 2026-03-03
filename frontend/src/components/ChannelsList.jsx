import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useGetChannelsQuery } from '../services/api'
import { setCurrentChannel } from '../store/uiSlice'
import Modals from './modals/Modals'

const ChannelsList = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { data: channels = [] } = useGetChannelsQuery()
  const currentChannelId = useSelector(state => state.ui.currentChannelId)

  const [modalType, setModalType] = useState(null)
  const [modalPayload, setModalPayload] = useState({})

  const openModal = (type, payload = {}) => {
    setModalType(type)
    setModalPayload(payload)
  }

  return (
    <>
      <div className="col-4 col-md-2 border-end px-0 bg-light d-flex flex-column h-100">
        <div className="d-flex gap-2 justify-content-between align-items-center mb-2 p-2 pt-4 pb-4">
          <b>{t('channels.title')}</b>

          <button
            type="button"
            onClick={() => openModal('add')}
            className="p-0 text-primary btn btn-group-vertical border-0"
          >
            <i className="bi bi-plus-square" style={{ fontSize: '20px' }} />
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
                      {t('channels.manage')}
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => openModal('remove', { channel })}
                    >
                      {t('channels.delete')}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => openModal('rename', { channel })}
                    >
                      {t('channels.edit')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </li>
          ))}
        </ul>
      </div>

      {modalType && (
        <Modals
          type={modalType}
          payload={modalPayload}
          onClose={() => setModalType(null)}
        />
      )}
    </>
  )
}

export default ChannelsList
