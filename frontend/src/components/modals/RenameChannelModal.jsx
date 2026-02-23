import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useRenameChannelMutation } from '../../services/api'
import { useSelector } from 'react-redux'
import { getChannelSchema } from '../../validation/channelSchema'
import PropTypes from 'prop-types'

const RenameChannelModal = ({ channel, onClose }) => {
  const channels = useSelector(state => state.channels)
  const [renameChannel] = useRenameChannelMutation()

  const schema = getChannelSchema(channels, channel.id)

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await renameChannel({ id: channel.id, name: values.name }).unwrap()
      onClose()
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="modal show d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          <Formik
            initialValues={{ name: channel.name }}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="modal-header">
                  <h5 className="modal-title">Переименовать</h5>
                  <button type="button" className="btn-close" onClick={onClose} />
                </div>

                <div className="modal-body">
                  <Field
                    name="name"
                    autoFocus
                    className="form-control"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger small"
                  />
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={onClose}>
                    Отменить
                  </button>
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                    Отправить
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

RenameChannelModal.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
}

export default RenameChannelModal
