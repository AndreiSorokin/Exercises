import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'


const Login = ({ setSuccessMessage, setErrorMessage, setUser }) => {

   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')

   useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if(loggedUserJSON) {
         const user = JSON.parse(loggedUserJSON)
         setUser(user)
         blogService.setToken(user.token)
      }
}, [])

   function handleUsernameChange(e) {
      e.preventDefault()
      setUsername(e.target.value)
   }

   function handlePasswordChange(e) {
      e.preventDefault()
      setPassword(e.target.value)
   }

   const handleSubmit = async(e) => {
      e.preventDefault()

      try {
         const user = await loginService.login({
            username, password
         })

         window.localStorage.setItem('loggedUser', JSON.stringify(user))
         blogService.setToken(user.token)
         setUser(user)
         setUsername('')
         setPassword('')

         setSuccessMessage(`Welcome ${user.name}`)
         setTimeout(() => {
            setSuccessMessage(null)
         }, 5000)
      } catch (exception) {
         setErrorMessage('Wrong username or password')
         setTimeout(() => {
            setErrorMessage(null)
         }, 5000)
      }
   }

   return (
      <div>
         <h2>Log in to application</h2>
         <form onSubmit={handleSubmit} >
            <div>
               Userame:
               <input type="text" id='username' value={username} onChange={handleUsernameChange} className='input username-input' />
            </div>
            <div>
               Password:
               <input type="password" id='password' value={password} onChange={handlePasswordChange} className='input password-input' />
            </div>
            <button type='submit' id="login-button" className='button login-button' >Log in</button>
         </form>
      </div>
   )
}

Login.propTypes = {
   setUser: PropTypes.func.isRequired
}

export default Login
