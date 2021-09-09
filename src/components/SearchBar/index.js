import './index.css'
import {BsSearch} from 'react-icons/bs'

const SearchBar = props => {
  const {searchInputValue, searchInputChange, searchIconClick} = props
  return (
    <div className="search-bar-container">
      <input
        className="search-bar"
        type="search"
        value={searchInputValue}
        onChange={searchInputChange}
        placeholder="Search"
      />
      <button
        className="search-button"
        type="button"
        testid="searchButton"
        onClick={searchIconClick}
      >
        <BsSearch className="search-icon" color="#fff" />
      </button>
    </div>
  )
}

export default SearchBar
