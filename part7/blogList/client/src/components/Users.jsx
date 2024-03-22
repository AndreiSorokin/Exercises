import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchAllUsers } from '../redux/slices/loginSlice';

import { Typography, Container, List, ListItem } from '@mui/material';

const Users = () => {
   const users = useAppSelector(state => state.user.users);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchAllUsers());
   }, [dispatch]);

   const countUserBlogs = (user) => {
      return user.blogs.length;
   };

   return (
      <Container maxWidth="md" style={{ marginTop: '2rem', textAlign: 'center' }}>
         <Typography variant="h2" component="h2" gutterBottom>Users:</Typography>
            <List>
               {users && users.map(user => (
                  <ListItem key={user.id} disablePadding style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '50px' }}>
                     <Typography variant="h4" component="h4" gutterBottom>
                        <Link to={`/user/${user.id}/blogs`} style={{ color: 'black' }}>{user.name}</Link>
                     </Typography>
                     <Typography variant="body1" gutterBottom>Created blogs: {countUserBlogs(user)}</Typography>
                  </ListItem>
               ))}
         </List>
      </Container>
   );
};

export default Users;
