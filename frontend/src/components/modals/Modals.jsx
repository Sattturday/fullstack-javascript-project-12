import PropTypes from 'prop-types'
import AddChannelModal from './AddChannelModal'
import RemoveChannelModal from './RemoveChannelModal'
import RenameChannelModal from './RenameChannelModal'

const Modals = ({ type, payload, onClose }) => {
  switch (type) {
    case 'add':
      return <AddChannelModal onClose={onClose} />
    case 'remove':
      return <RemoveChannelModal channel={payload.channel} onClose={onClose} />
    case 'rename':
      return <RenameChannelModal channel={payload.channel} onClose={onClose} />
    default:
      return null
  }
}

Modals.propTypes = {
  type: PropTypes.oneOf(['add', 'remove', 'rename']),
  payload: PropTypes.shape({
    channel: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
  onClose: PropTypes.func.isRequired,
}

Modals.defaultProps = {
  type: null,
  payload: {},
}

export default Modals
