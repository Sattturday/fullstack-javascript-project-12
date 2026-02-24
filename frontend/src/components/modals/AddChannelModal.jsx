import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useAddChannelMutation } from '../../services/api'
import { setCurrentChannel } from '../../store/uiSlice'
import { getChannelSchema } from '../../validation/channelSchema'

const AddChannelModal = ({ onClose }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const channels = useSelector(state => state.channels)
  const [addChannel] = useAddChannelMutation()

  const schema = getChannelSchema(t, channels)

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const channel = await addChannel(values).unwrap()
      toast.success(t('channels.created'))
      dispatch(setCurrentChannel(channel.id))
      onClose()
    }
    catch (e) {
      console.error('Error adding channel:', e)
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
                  <h5 className="modal-title">{t('channels.create')}</h5>
                  <button type="button" className="btn-close" onClick={onClose} />
                </div>

                <div className="modal-body">
                  <Field
                    name="name"
                    autoFocus
                    className="form-control"
                  />
                  <div className="invalid-feedback d-block" style={{ minHeight: '18px' }}>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                  >
                    {t('channels.cancel')}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    {t('channels.send')}
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
