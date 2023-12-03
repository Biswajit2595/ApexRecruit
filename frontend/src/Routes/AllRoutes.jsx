import {Routes,Route} from 'react-router-dom'
import Home from '../Pages/Home'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'
import Jobs from '../Pages/Jobs'
import About from '../Pages/About'
import JobPost from '../Pages/JobPost'
import SingleJobPost from '../Components/SingleJobPost'
import PostedJobs from '../Pages/PostedJobs'
import SinglePostedJobs from '../Pages/SinglePostedJobs'
import Applied from '../Pages/Applied'
import SingleApplication from '../Pages/SingleApplication'
import PrivateRoute from '../Components/PrivateRoute'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='/signup' element={ <Signup/> } />
        <Route path='/login' element={ <Login/> } />
        <Route path='/job' element={
          <PrivateRoute>
            <Jobs/> 
          </PrivateRoute>
          } />
        <Route path='/job/view/:id' element={ 
        <PrivateRoute>
          <SingleJobPost/> 
        </PrivateRoute>
        } />
        <Route path='/jobpost' element={ 
          <PrivateRoute>
            <JobPost/> 
          </PrivateRoute>
        } />
        <Route path='/postedjobs' element={ 
          <PrivateRoute>
            <PostedJobs/> 
          </PrivateRoute>
        } />
        <Route path='/applied' element={ 
        <PrivateRoute>
          <Applied/>
        </PrivateRoute>
      } />
        <Route path='/applicant/view/:id' element={
          <PrivateRoute>
            <SingleApplication/> 
          </PrivateRoute> 
        } />
        <Route path='/postedjobs/view/:id' element={ 
        <PrivateRoute>
          <SinglePostedJobs/> 
        </PrivateRoute>
        } />
        <Route path='/about' element={ <About/> } />
        <Route path="*" element={ <h3>404 Page Not Found</h3> } />
    </Routes>
  )
}

export default AllRoutes