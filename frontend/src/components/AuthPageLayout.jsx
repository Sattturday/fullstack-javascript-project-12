import PropTypes from 'prop-types'

const AuthPageLayout = ({ title, footer, children }) => (
  <div className="container flex-grow-1 d-flex align-items-center justify-content-center">
    <div className="row justify-content-center w-100">
      <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-sm">
          <div className="card-body p-5">
            <h1 className="text-center mb-4">{title}</h1>
            {children}
          </div>
          <div className="card-footer p-4 text-center">
            {footer}
          </div>
        </div>
      </div>
    </div>
  </div>
)

AuthPageLayout.propTypes = {
  title: PropTypes.string.isRequired,
  footer: PropTypes.node,
  children: PropTypes.node.isRequired,
}

export default AuthPageLayout
