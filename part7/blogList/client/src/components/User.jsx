import React from 'react';
import { useAppSelector } from '../redux/store';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Typography, Container, List, ListItem } from '@mui/material';

const User = () => {
   const { id } = useParams();
   const user = useAppSelector(state => state.user.users.find(u => u.id === id));
   const blogs = useAppSelector(state => state.blogs.blogs);

   return (
      <Container maxWidth="md" style={{ marginTop: '2rem', textAlign: 'center' }}>
         <Typography variant="h2" component="h2" gutterBottom>{user.name}</Typography>
         <Typography variant="h3" component="h3" gutterBottom>Added blogs:</Typography>
            <List>
               {blogs.map(blog => (
                  <ListItem key={blog.id} style={{ display: 'flex', justifyContent: 'center' }}>
                     <Link to={`/blogs/${blog.id}`} style={{ color: 'black', fontSize: '25px' }}>{blog.title}</Link>
                  </ListItem>
               ))}
            </List>
      </Container>
   );
};

export default User;
