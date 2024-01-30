import './index.css'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'

const NotFound = () => (
  <Link to="/" className="link">
    <Navbar />
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-para">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </Link>
)
export default NotFound
