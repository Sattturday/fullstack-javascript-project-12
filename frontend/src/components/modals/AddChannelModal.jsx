import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useAddChannelMutation } from '../../services/api'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentChannel } from '../../store/uiSlice'
import { getChannelSchema } from '../../validation/channelSchema'
import PropTypes from 'prop-types'

const AddChannelModal = ({ onClose }) => {
  const dispatch = useDispatch()
  const channels = useSelector(state => state.channels)
  const [addChannel] = useAddChannelMutation()

  const schema = getChannelSchema(channels)

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const channel = await addChannel(values).unwrap()
      dispatch(setCurrentChannel(channel.id))
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
            initialValues={{ name: '' }}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="modal-header">
                  <h5 className="modal-title">Имя канала</h5>
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
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                  >
                    Отменить
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
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

AddChannelModal.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default AddChannelModal
