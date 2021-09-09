import './index.css'
import {Link} from 'react-router-dom'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <li className="job-item-container">
      <Link className="link" to={`/jobs/${id}`}>
        <div className="company-data-container">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div className="company-details-container">
            <h1 className="employment-type">{title}</h1>
            <div className="rating-container">
              <BsFillStarFill color="#fbbf24" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-details-container">
          <div className="location-details-container">
            <div className="flex-row">
              <MdLocationOn color="#fff" size={18} />
              <p className="text">{location}</p>
            </div>
            <div className="flex-row">
              <BsFillBriefcaseFill color="#fff" size={18} />
              <p className="text">{employmentType}</p>
            </div>
          </div>
          <p className="package-per-annum">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="text">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobItem
