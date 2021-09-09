import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/ThreeDots'
import Cookies from 'js-cookie'

import Header from '../Header'
import Sidebar from '../Sidebar'
import SearchBar from '../SearchBar'
import Failure from '../Failure'
import JobItem from '../JobItem'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    employmentTypes: [],
    salaryRange: '0',
    searchInputValue: '',
    isLoading: true,
    failedFetch: false,
    jobs: [],
  }

  componentDidMount() {
    this.loadData()
  }

  changeJobToCamelCase = job => ({
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    id: job.id,
    jobDescription: job.job_description,
    location: job.location,
    packagePerAnnum: job.package_per_annum,
    rating: job.rating,
    title: job.title,
  })

  onUnsuccessfulFetch = () => {
    this.setState({isLoading: false, failedFetch: true})
  }

  onSuccessfulFetch = jobs => {
    const camelCaseData = jobs.map(job => this.changeJobToCamelCase(job))
    this.setState({jobs: camelCaseData, isLoading: false, failedFetch: false})
  }

  loadData = async () => {
    const {employmentTypes, salaryRange, searchInputValue} = this.state
    const employmentTypesString = employmentTypes.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypesString}&minimum_package=${salaryRange}&search=${searchInputValue}`
    const Authorization = `Bearer ${Cookies.get('jwt_token')}`
    const options = {
      method: 'GET',
      headers: {
        Authorization,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      this.onSuccessfulFetch(data.jobs)
    } else {
      this.onUnsuccessfulFetch()
    }
  }

  onClickCheckBox = event => {
    const {id, checked} = event.target
    const {employmentTypes} = this.state
    const updatedEmploymentTypes = checked
      ? [...employmentTypes, id]
      : employmentTypes.filter(empId => empId !== id)
    this.setState(
      {
        employmentTypes: updatedEmploymentTypes,
        isLoading: true,
      },
      this.loadData,
    )
  }

  onClickRadioButton = event => {
    const {id} = event.target
    this.setState({salaryRange: id, isLoading: true}, this.loadData)
  }

  searchInputChange = event => {
    this.setState({searchInputValue: event.target.value})
  }

  searchIconClick = () => {
    this.setState({isLoading: true}, this.loadData)
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderNoJobs = () => (
    <div className="no-jobs-container">
      <img
        className="no-jobs-image"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no-jobs-title">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderJobs = () => {
    const {jobs} = this.state
    if (jobs.length === 0) {
      return this.renderNoJobs()
    }
    return (
      <ul className="jobs-items-container">
        {jobs.map(job => (
          <JobItem jobDetails={job} key={job.id} />
        ))}
      </ul>
    )
  }

  renderJobsData = () => {
    const {searchInputValue, isLoading, failedFetch} = this.state
    return (
      <div className="jobs-data-container">
        <div className="large-device-search-bar-container">
          <SearchBar
            searchInputValue={searchInputValue}
            searchInputChange={this.searchInputChange}
            searchIconClick={this.searchIconClick}
          />
        </div>
        {isLoading && this.renderLoader()}
        {!isLoading && failedFetch && (
          <Failure onClickRetryButton={this.onClickRetryButton} />
        )}
        {!isLoading && !failedFetch && this.renderJobs()}
      </div>
    )
  }

  onClickRetryButton = () => {
    this.setState({isLoading: true, failedFetch: false}, this.loadData)
  }

  render() {
    const {searchInputValue} = this.state
    return (
      <>
        <Header />
        <div className="jobs-page-container">
          <Sidebar
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            onClickCheckBox={this.onClickCheckBox}
            onClickRadioButton={this.onClickRadioButton}
            searchInputValue={searchInputValue}
            searchInputChange={this.searchInputChange}
            searchIconClick={this.searchIconClick}
          />
          {this.renderJobsData()}
        </div>
      </>
    )
  }
}

export default Jobs
