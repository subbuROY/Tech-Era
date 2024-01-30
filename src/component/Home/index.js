import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {courseList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourseList()
  }

  getCourseList = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    // console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      //   console.log(data)
      const formattedData = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))
      this.setState({
        courseList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderCourseLists = () => {
    const {courseList} = this.state
    return (
      <ul className="course-list-container">
        {courseList.map(each => (
          <li key={each.id} className="list-items">
            <Link to={`/courses/${each.id}`} className="link">
              <img src={each.logoUrl} alt={each.name} className="course-img" />
              <p className="course-name">{each.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  loadingView = () => (
    <div data-testid="loader" className="loader-con">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        className="failure-img"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong </h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="btn" onClick={this.getCourseList}>
        Retry
      </button>
    </div>
  )

  renderDetail = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.loadingView()
      case apiStatusConstants.success:
        return this.renderCourseLists()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Link to="/" className="link">
          <Navbar />
        </Link>
        <div className="home-container">
          <h1 className="main-heading">Courses</h1>
          {this.renderDetail()}
        </div>
      </div>
    )
  }
}
export default Home
