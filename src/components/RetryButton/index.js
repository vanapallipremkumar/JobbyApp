import './index.css'

const RetryButton = props => {
  const {onClickRetryButton} = props
  return (
    <div className="retry-button-container">
      <button
        className="retry-button"
        type="button"
        onClick={onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )
}

export default RetryButton
