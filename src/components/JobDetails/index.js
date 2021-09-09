import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FiExternalLink} from 'react-icons/fi'

import Header from '../Header'
import Failure from '../Failure'

class JobDetails extends Component {
  state = {jobDetails: {}, similarJobs: [], failedFetch: false}

  componentDidMount() {
    this.loadData()
  }

  getCamelCaseJobDetails = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    skills: data.skills.map(skill => ({
      name: skill.name,
      imageUrl: skill.image_url,
    })),
    title: data.title,
  })

  getCamelCaseSimilarJobDetails = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  onSuccessfulFetch = (jobDetails, similarJobs) => {
    const camelCaseJobDetails = this.getCamelCaseJobDetails(jobDetails)
    const camelCaseSimilarJobs = similarJobs.map(similarJob =>
      this.getCamelCaseSimilarJobDetails(similarJob),
    )
    this.setState({
      jobDetails: camelCaseJobDetails,
      similarJobs: camelCaseSimilarJobs,
    })
  }

  onFetchFailure = () => {
    this.setState({failedFetch: true})
  }

  loadData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      this.onSuccessfulFetch(data.job_details, data.similar_jobs)
    } else {
      this.onFetchFailure()
    }
  }

  onClickRetryButton = () => {
    this.setState({failedFetch: false}, this.loadData)
  }

  renderJobDetails = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetails

    for (const skill of skills) console.log(skill)

    return (
      <div className="job-details-main-container">
        <div className="company-data-container">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="job details company logo"
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
        <div className="website-link-container">
          <h1 className="heading">Description</h1>
          <a
            className="website-link"
            href={companyWebsiteUrl}
            target="_blank"
            rel="noreferrer"
          >
            Visit
            <FiExternalLink />
          </a>
        </div>
        <p className="job-description">{jobDescription}</p>
        <h1 className="heading">Skills</h1>
        <div className="skills-container">
          prem
          {/* skills.map(skill => {
            const {name, imageUrl} = skill
            return (
              <div className="skill-item">
                <img src={imageUrl} alt={name} />
                <p>{name}</p>
              </div>
            )
          })
          */}
        </div>
      </div>
    )
  }

  render() {
    const {failedFetch} = this.state
    return (
      <>
        <Header />
        <div className="job-details-background-container">
          {failedFetch ? (
            <Failure onClickRetryButton={this.onClickRetryButton} />
          ) : (
            this.renderJobDetails()
          )}
        </div>
      </>
    )
  }
}

export default JobDetails
