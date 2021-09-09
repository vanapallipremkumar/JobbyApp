import './index.css'

import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: '', loginFailed: false, errorMessage: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessfulLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onLoginFailure = failureMsg => {
    this.setState({loginFailed: true, errorMessage: failureMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {method: 'POST', body: JSON.stringify(userDetails)}

    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessfulLogin(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  renderForm = () => {
    const {username, password, loginFailed, errorMessage} = this.state
    return (
      <form className="login-form-container" onSubmit={this.onSubmitForm}>
        <img
          className="website-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <div className="login-form-input-field-container">
          <label htmlFor="username" className="login-form-input-label">
            USERNAME
          </label>
          <input
            className="login-form-input-field"
            type="text"
            id="username"
            value={username}
            onChange={this.onChangeUsername}
            placeholder="Username"
          />
        </div>
        <div className="login-form-input-field-container">
          <label htmlFor="password" className="login-form-input-label">
            PASSWORD
          </label>
          <input
            className="login-form-input-field"
            type="password"
            id="password"
            value={password}
            onChange={this.onChangePassword}
            placeholder="Password"
          />
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
        {loginFailed && <p className="error-message">*{errorMessage}</p>}
      </form>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return <div className="login-background-container">{this.renderForm()}</div>
  }
}

export default Login
