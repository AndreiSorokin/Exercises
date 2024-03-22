import { useState, useEffect, useRef } from "react";
import Togglable from "./Togglable";
import { hideNotification, showErrorNotification, showSuccessNotification } from "../redux/slices/notificationSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { createBlog, fetchBlogs } from "../redux/slices/blogSlice";
import { Link } from 'react-router-dom';

import { Typography, TextField, Button, Container, Paper, List, ListItem } from '@mui/material';

const Blog = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);
  const blog = useAppSelector(state => state.blogs.blogs);
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [dispatch])

  function blogsChange(e) {
    e.preventDefault();

    setTitle(e.target.value);
  }

  function urlChange(e) {
    e.preventDefault();
    setUrl(e.target.value);
  }

  function authorChange(e) {
    e.preventDefault();

    setAuthor(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBlogData = {
        title: title,
        url: url,
        author: author,
        likes: 0
      };
      if(!title || !author || !url) {
        dispatch(showErrorNotification(`Please fill out all fields`))
        setTimeout(() => {
          dispatch(hideNotification());
        }, 5000);
        return
      }
      await dispatch(createBlog(newBlogData));
      setTitle("");
      setUrl("");
      setAuthor("");
      dispatch(showSuccessNotification(`A new blog "${newBlogData.title}" has been added`));
      setTimeout(() => {
        dispatch(hideNotification());
      }, 5000);
      dispatch(fetchBlogs());
    } catch (error) {
      console.error('Error:', error);
      dispatch(showErrorNotification("Something went wrong"));
      setTimeout(() => {
        dispatch(hideNotification());
      }, 5000);
    }
  };

  const sortedBlogs = [...blog].sort((a, b) => b.likes - a.likes);

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      {user && <Typography variant="body1" align="center" gutterBottom sx={{fontSize: '24px'}}>{`${user.name} logged in`}</Typography>}
      <Typography variant="h2" component="h2" align="center" gutterBottom>
        Blogs
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Togglable buttonLabel="Create new" ref={blogFormRef}>
          <Typography variant="h3" component="h3" align="center" gutterBottom>Create new</Typography>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              value={title}
              onChange={blogsChange}
              style={{ marginBottom: '1rem', width: '100%' }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="url"
              label="URL"
              name="url"
              value={url}
              onChange={urlChange}
              style={{ marginBottom: '1rem', width: '100%' }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="author"
              label="Author"
              name="author"
              value={author}
              onChange={authorChange}
              style={{ marginBottom: '1rem', width: '100%' }}
            />
            <Button type="submit" variant="contained" color="primary" style={{ width: '100%', backgroundColor: 'black', color: 'white' }}>
              Save
            </Button>
          </form>
        </Togglable>
      </div>

      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Paper elevation={3} style={{ marginTop: '2rem', padding: '1rem', width: '300px' }}>
          <List>
            {sortedBlogs.map((b) => (
              <ListItem key={b.id} disablePadding style={{ display: 'flex', justifyContent: 'center' }}>
                <Link to={`/blogs/${b.id}`} style={{ color: 'black', fontSize: '20px', margin: "5px" }}>{b.title}</Link>
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>


    </Container>
  );
};

export default Blog;
