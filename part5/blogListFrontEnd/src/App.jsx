import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import ErrorMessage from './components/ErrorMessage'
import './index.css'
import SuccessMessage from './components/SuccessMessage'

function App() {
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [blogs, setBlogs] = useState([])


  return (
    <div>
      <ErrorMessage message={errorMessage} />
      <SuccessMessage message={successMessage}/>

      {user === null &&
        <Login setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} setUser={setUser}/>
      }
      {user !== null &&
        <Blog blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} user={user} setUser={setUser}/>
      }
    </div>
  )
}

export default App
