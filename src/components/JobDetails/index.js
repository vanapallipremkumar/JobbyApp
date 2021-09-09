import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FiExternalLink} from 'react-icons/fi'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/ThreeDots'

import Header from '../Header'
import Failure from '../Failure'
import SimilarJobItem from '../SimilarJobItem'

class JobDetails extends Component {
  state = {
    jobDetails: {},
    skills: [],
    similarJobs: [],
    failedFetch: false,
    isLoading: true,
  }

  componentDidMount() {
    this.loadData()
  }

  getCamelCaseJobDetails = data => {
    const {skills} = data
    const camelCaseSkills = skills.map(skill => ({
      name: skill.name,
      imageUrl: skill.image_url,
    }))
    return [
      {
        companyLogoUrl: data.company_logo_url,
        companyWebsiteUrl: data.company_website_url,
        employmentType: data.employment_type,
        id: data.id,
        jobDescription: data.job_description,
        lifeAtCompanyDescription: data.life_at_company.description,
        lifeAtCompanyImageUrl: data.life_at_company.image_url,
        location: data.location,
        packagePerAnnum: data.package_per_annum,
        rating: data.rating,
        skills: camelCaseSkills,
        title: data.title,
      },
      camelCaseSkills,
    ]
  }

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
    const [camelCaseJobDetails, skills] = this.getCamelCaseJobDetails(
      jobDetails,
    )
    const camelCaseSimilarJobs = similarJobs.map(similarJob =>
      this.getCamelCaseSimilarJobDetails(similarJob),
    )
    this.setState({
      jobDetails: camelCaseJobDetails,
      similarJobs: camelCaseSimilarJobs,
      skills,
      isLoading: false,
    })
  }

  onFetchFailure = () => {
    this.setState({failedFetch: true, isLoading: false})
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
    this.setState({failedFetch: false, isLoading: true}, this.loadData)
  }

  skillItem = skill => {
    const {name, imageUrl} = skill
    return (
      <li className="skill-item" key={name}>
        <img className="skill-logo" src={imageUrl} alt={name} />
        <p className="skill-name">{name}</p>
      </li>
    )
  }

  renderJobDetails = () => {
    const {jobDetails, skills} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompanyDescription,
      lifeAtCompanyImageUrl,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

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
        <ul className="skills-container">
          {skills.map(skill => this.skillItem(skill))}
        </ul>
        <h1 className="heading">Life at Company</h1>
        <div className="life-at-company-container">
          <p className="life-at-company-description">
            {lifeAtCompanyDescription}
          </p>
          <img
            className="life-at-company-image"
            src={lifeAtCompanyImageUrl}
            alt="life at company"
          />
        </div>
      </div>
    )
  }

  renderSimilarJobs = () => {
    const {similarJobs} = this.state
    return (
      <>
        <h1 className="heading">Similar Jobs</h1>
        <ul className="similar-job-items-container">
          {similarJobs.map(similarJob => (
            <SimilarJobItem similarJob={similarJob} key={similarJob.id} />
          ))}
        </ul>
      </>
    )
  }

  renderJobs = () => (
    <>
      {this.renderJobDetails()}
      {this.renderSimilarJobs()}
    </>
  )

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {failedFetch, isLoading} = this.state
    return (
      <>
        <Header />
        <div className="job-details-background-container">
          {isLoading && this.renderLoader()}
          {!isLoading && failedFetch ? (
            <Failure onClickRetryButton={this.onClickRetryButton} />
          ) : (
            this.renderJobs()
          )}
        </div>
        )
      </>
    )
  }
}

export default JobDetails
