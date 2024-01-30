import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class CourseDetails extends Component {
  state = {
    courseDetailList: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCourseDetailList()
  }

  getCourseDetailList = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const res = await fetch(url, options)
    if (res.ok === true) {
      const dat = await res.json()
      const updateCourse = {
        id: dat.course_details.id,
        name: dat.course_details.name,
        imageUrl: dat.course_details.image_url,
        description: dat.course_details.description,
      }
      this.setState({
        courseDetailList: updateCourse,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        className="failure-img"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong </h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="btn" onClick={this.getCourseDetailList}>
        Retry
      </button>
    </div>
  )

  renderCourseDetailsList = () => {
    const {courseDetailList} = this.state
    return (
      <div className="course-details-list">
        <img
          src={courseDetailList.imageUrl}
          alt={courseDetailList.name}
          className="img"
        />
        <div>
          <h1 className="name">{courseDetailList.name}</h1>
          <p>{courseDetailList.description}</p>
        </div>
      </div>
    )
  }

  loadingView = () => (
    <div data-testid="loader" className="loader-con">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.loadingView()
      case apiStatusConstants.success:
        return this.renderCourseDetailsList()
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
        <div className="course-details-container">{this.renderDetails()}</div>
      </div>
    )
  }
}

export default CourseDetails
