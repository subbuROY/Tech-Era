import './App.css'
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import Home from './component/Home'
import CourseDetails from './component/CourseDetails'
import NotFound from './component/NotFound'
// Replace your code here

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={CourseDetails} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
