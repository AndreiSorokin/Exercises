import React from "react";
import { useState } from "react";
import { hideNotification, showErrorNotification, showSuccessNotification } from "../redux/slices/notificationSlice";
import { useAppDispatch } from "../redux/store";
import { userLogin } from "../redux/slices/loginSlice";
import { useNavigate } from 'react-router-dom';

import { Container, Typography, TextField, Button } from '@mui/material';

const Login = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsernameChange(e) {
    e.preventDefault();
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const user = await dispatch(userLogin({
        username: username,
        password: password
      }));
  
      if (user.meta.requestStatus === 'rejected') {
        dispatch(showErrorNotification('Wrong username or password'));
        setTimeout(() => {
          dispatch(hideNotification());
        }, 5000);
        return;
      }

      navigate('/api/blogs');

      setUsername("");
      setPassword("");
  
      dispatch(showSuccessNotification(`Welcome ${user.meta.arg.username}`))
      setTimeout(() => {
        dispatch(hideNotification());
      }, 5000);
    } catch (exception) {
      dispatch(showErrorNotification('An error occurred during login'));
      setTimeout(() => {
        dispatch(hideNotification());
      }, 5000);
    }
  };

  return (
    <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Typography variant="h2" component="h2" style={{ marginBottom: '1rem', textAlign: 'center', width: '100%' }}>
        Log in to application
      </Typography>
      <form style={{ width: '100%' }} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: '1rem' }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: '1rem' }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{ backgroundColor: 'black', color: 'white' }}
        >
          Log in
        </Button>
      </form>
    </Container>
  );
};

export default Login;
