import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { hideNotification, showErrorNotification, showSuccessNotification } from "../redux/slices/notificationSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useParams } from 'react-router-dom';
import LikeButton from './LikeButton';
import { deleteBlog, commentBlog, fetchBlogs } from '../redux/slices/blogSlice';

import { Typography, Button, Container, TextField, List, ListItem, Paper } from '@mui/material';

const Post = () => {
   const { id } = useParams();
   const dispatch = useAppDispatch();
   const blog = useAppSelector(state => state.blogs.blogs).find(b => b.id === id);
   const user = useAppSelector(state => state.user.user);
   const navigate = useNavigate();

   useEffect(() => {
      dispatch(fetchBlogs())
   }, [dispatch])

   const [comment, setComment] = useState("")
   
   const handleDelete = async (blogId) => {
      const blogToDelete = blog;
      
      const confirmDelete = window.confirm(
         `Delete blog ${blogToDelete.title} by ${blogToDelete.author}?`,
      );
      if (confirmDelete) {
         try {
            await dispatch(deleteBlog(blogId))
            dispatch(fetchBlogs());
            alert(`Blog ${blogToDelete.title} has been deleted`)
            navigate('/api/blogs');
         } catch (exception) {
            dispatch(showErrorNotification(`Error deleting blog "${blogToDelete.title}"`));
            setTimeout(() => {
               dispatch(hideNotification());
            }, 5000);
         }
         }
      };

      const handleInputChange = (e) => {
         setComment(e.target.value);
      }

      const handleComment = async(e) => {
         e.preventDefault()

         const newComment = {
            comments: comment
         }

         if (!comment.trim()) {
            dispatch(showErrorNotification(`Please fill out the field`));
            setTimeout(() => {
               dispatch(hideNotification());
            }, 5000);
            return;
         }

         await dispatch(commentBlog({ id, newComment }))
         dispatch(showSuccessNotification("Comment added successfully"))
         setTimeout(() => {
            dispatch(hideNotification());
         }, 5000);
         setComment('')
         dispatch(fetchBlogs());
      }

   return (
      <Container maxWidth="md" style={{ marginTop: '2rem', textAlign: 'center' }}>
         <Typography variant="h2" component="h2" gutterBottom style={{ color: 'black' }}>{blog.title}</Typography>
         <a href={blog.url} style={{ color: 'black', fontSize: '25px' }}>{blog.url}</a>
         <div>
            <Typography variant="body1" gutterBottom style={{ color: 'black', fontSize: '25px', marginTop: '30px' }}>{blog.likes} likes</Typography>
            <LikeButton blogId={blog.id}/>
         </div>
         <Typography variant="body1" gutterBottom style={{ color: 'black', fontSize: '25px', margin: '25px 0'  }}>Author: {blog.author}</Typography>
         <Typography variant="body1" gutterBottom style={{ color: 'black', fontSize: '25px', margin: '25px 0'  }}>Added by: {blog.user.name}</Typography>
         <div>
            <Typography variant="h3" component="h3" gutterBottom style={{ color: 'black'}}>Comments:</Typography>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
               <Paper elevation={3} style={{ marginTop: '2rem', padding: '1rem', width: '300px' }}>
                  <List>
                     {blog.comments.map((comment, index) => (
                        <ListItem key={index} style={{fontSize: '25px', display: 'flex', justifyContent: 'center'}}>
                           {comment}
                        </ListItem>
                     ))}
                  </List>
               </Paper>
            </div>
            <form onSubmit={handleComment}>
            <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               id="comment"
               label="Comment"
               name="comment"
               value={comment}
               onChange={handleInputChange}
               style={{ color: 'black' }}
            />
            <Button type="submit" variant="outlined" sx={{color: 'black', border: 'black'}}>
               Add comment
            </Button>
            </form>
            <List>
            </List>
         </div>
         <div>
            {user && user.username === blog.user.username && (
            <Button
               variant="contained"
               color="secondary"
               onClick={() => handleDelete(blog.id)}
            >
               Delete
            </Button>
            )}
         </div>
      </Container>
   );
}

export default Post
