import './index.css'

import Profile from '../Profile'
import SearchBar from '../SearchBar'

const Sidebar = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    onClickCheckBox,
    onClickRadioButton,
    searchInputValue,
    searchInputChange,
    searchIconClick,
  } = props

  return (
    <div className="sidebar-container">
      <div className="small-device-search-bar-container">
        <SearchBar
          searchInputValue={searchInputValue}
          searchInputChange={searchInputChange}
          searchIconClick={searchIconClick}
        />
      </div>
      <Profile />
      <hr />
      <div className="column-container">
        <h1 className="checkbox-container-heading">Type of Employment</h1>
        <ul className="options-container">
          {employmentTypesList.map(employmentType => {
            const {label, employmentTypeId} = employmentType
            return (
              <li className="item-container" key={employmentTypeId}>
                <input
                  id={employmentTypeId}
                  type="checkbox"
                  value={label}
                  onChange={onClickCheckBox}
                />
                <label className="label" htmlFor={employmentTypeId}>
                  {label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
      <hr />
      <div className="column-container">
        <h1 className="checkbox-container-heading">Salary Range</h1>
        <ul className="options-container">
          {salaryRangesList.map(salaryRange => {
            const {salaryRangeId, label} = salaryRange
            return (
              <li className="item-container" key={salaryRangeId}>
                <input
                  id={salaryRangeId}
                  type="radio"
                  name="salaryRange"
                  value={label}
                  onClick={onClickRadioButton}
                />
                <label className="label" htmlFor={salaryRangeId}>
                  {label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
