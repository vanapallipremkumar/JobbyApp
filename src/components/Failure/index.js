import './index.css'
import RetryButton from '../RetryButton'

const Failure = props => {
  const {onClickRetryButton} = props

  return (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <RetryButton onClickRetryButton={onClickRetryButton} />
    </div>
  )
}

export default Failure
