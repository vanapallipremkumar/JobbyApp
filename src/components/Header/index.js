import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const logoutFromPage = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          className="website-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <div className="route-links-container">
        <Link className="link-name" to="/">
          Home
        </Link>
        <Link className="link-name" to="/jobs">
          Jobs
        </Link>
      </div>
      <button className="logout-button" type="button" onClick={logoutFromPage}>
        Logout
      </button>
      <ul className="small-device-links-container">
        <li>
          <Link className="link-icons" to="/">
            <AiFillHome size={24} />
          </Link>
        </li>
        <li>
          <Link className="link-icons" to="/jobs">
            <BsFillBriefcaseFill size={24} />
          </Link>
        </li>
        <li>
          <button className="link-icons" type="button" onClick={logoutFromPage}>
            <FiLogOut size={24} />
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
