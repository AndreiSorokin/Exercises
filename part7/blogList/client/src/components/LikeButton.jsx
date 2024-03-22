import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBlog, fetchBlogs } from '../redux/slices/blogSlice';
import { showErrorNotification, hideNotification } from '../redux/slices/notificationSlice';

const LikeButton = ({ blogId }) => {
   const dispatch = useDispatch();
   const blogs = useSelector(state => state.blogs.blogs);

   const increaseLike = async () => {
      try {
         const blogToUpdate = blogs.find(b => b.id === blogId);
         if (blogToUpdate) {
            const newLikes = blogToUpdate.likes + 1;
            await dispatch(updateBlog({ id: blogId, newObject: { likes: newLikes } }));
            dispatch(fetchBlogs());
         }
      } catch (exception) {
         dispatch(showErrorNotification("Something went wrong"))
         setTimeout(() => {
            dispatch(hideNotification());
         }, 5000);
      }
   };

   return (
      <button className="button button-like" onClick={increaseLike} style={{width: '60px', height: '30px', fontSize: '15px'}}>Like</button>
   );
};

export default LikeButton;
