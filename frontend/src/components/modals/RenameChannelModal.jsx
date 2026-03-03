import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useRenameChannelMutation, useGetChannelsQuery } from '../../services/api'
import { getChannelSchema } from '../../validation/channelSchema'
import PropTypes from 'prop-types'

const RenameChannelModal = ({ channel, onClose }) => {
  const { t } = useTranslation()

  const { data: channels = [] } = useGetChannelsQuery()
  const [renameChannel] = useRenameChannelMutation()

  const schema = getChannelSchema(t, channels, channel.id)

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await renameChannel({
        id: channel.id,
        name: values.name,
      }).unwrap()

      toast.success(t('channels.renamed'))
      onClose()
    }
    catch (e) {
      console.error('Error renaming channel:', e)
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
                  <h5 className="modal-title">{t('channels.rename')}</h5>
                  <button type="button" className="btn-close" onClick={onClose} />
                </div>

                <div className="modal-body">
                  <Field
                    name="name"
                    autoFocus
                    className="form-control"
                    id="name"
                  />
                  <label className="visually-hidden" htmlFor="name">
                    {t('channels.name')}
                  </label>
                  <div className="invalid-feedback d-block" style={{ minHeight: '18px' }}>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={onClose}>
                    {t('channels.cancel')}
                  </button>
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary">
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

RenameChannelModal.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
}

export default RenameChannelModal
