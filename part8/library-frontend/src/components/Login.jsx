import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { USER_LOGIN } from '../queries'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const navigate = useNavigate();

  const [login, result] = useMutation(USER_LOGIN, {
    onError: (error) => {
      setErrorMessage(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if(result.data) {
      const token = result.data.userLogin.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      navigate('/')
    }
  }, [result.data])

  const submit = async(e) => {
    e.preventDefault()

    await login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <input placeholder='username' value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          <input placeholder='password' type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
