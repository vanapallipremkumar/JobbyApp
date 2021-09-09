import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

import RetryButton from '../RetryButton'

class Profile extends Component {
  state = {profileDetails: {}, fetchingFailed: false}

  componentDidMount() {
    this.loadProfileData()
  }

  onSuccessfulFetching = data => {
    const profileDetails = data.profile_details
    this.setState({
      profileDetails: {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      },
    })
  }

  loadProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(profileApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      this.onSuccessfulFetching(data)
    } else {
      this.setState({fetchingFailed: true})
    }
  }

  onClickRetryButton = () => {
    this.setState({fetchingFailed: false}, this.loadProfileData)
  }

  renderProfile = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img className="profile-img" src={profileImageUrl} alt="profile" />
        <h1 className="name">{name}</h1>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }

  render() {
    const {fetchingFailed} = this.state
    return fetchingFailed ? (
      <RetryButton onClickRetryButton={this.onClickRetryButton} />
    ) : (
      this.renderProfile()
    )
  }
}

export default Profile
