import './index.css'
import {Link} from 'react-router-dom'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

const SimilarJobItem = props => {
  const {similarJob} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similarJob

  return (
    <li className="similar-job-item">
      <Link className="similar-item-link" to={`/jobs/${id}`}>
        <div className="similar-job-data-container">
          <img
            className="similar-job-company-logo"
            src={companyLogoUrl}
            alt="similar job company logo"
          />
          <div className="similar-job-company-details-container">
            <h1 className="similar-job-employment-type">{title}</h1>
            <div className="similar-job-rating-container">
              <BsFillStarFill color="#fbbf24" />
              <p className="similar-job-rating">{rating}</p>
            </div>
          </div>
        </div>
        <h1 className="heading">Description</h1>
        <p className="similar-job-description">{jobDescription}</p>
        <div className="similar-job-details-container">
          <div className="similar-job-location-details-container">
            <div className="similar-job-flex-row">
              <MdLocationOn color="#fff" size={18} />
              <p className="similar-job-text">{location}</p>
            </div>
            <div className="similar-job-flex-row">
              <BsFillBriefcaseFill color="#fff" size={18} />
              <p className="similar-job-text">{employmentType}</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default SimilarJobItem
