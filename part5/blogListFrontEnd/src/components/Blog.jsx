import { useState, useEffect, useRef } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const Blog = ({ setErrorMessage, setSuccessMessage, user, setUser }) => {

   const [blogs, setBlogs] = useState([])
   const [newBlog, setNewBlog] = useState('')
   const [url, setUrl] = useState('')
   const [author, setAuthor] = useState('')
   const [like, setLike] = useState(0)

   const blogFormRef = useRef()

   const newObject = {
      title: newBlog,
      url: url,
      author: author,
      likes: like
   }

   useEffect(() => {
      blogService
      .getAll()
      .then(blogs => {
         blogs.sort((a, b) => b.likes - a.likes)
         setBlogs(blogs)
         }
      )
   }, [])

   function blogsChange(e) {
      e.preventDefault()

      setNewBlog(e.target.value)
   }
   function urlChange(e) {
      e.preventDefault()

      setUrl(e.target.value)
   }
   function authorChange(e) {
      e.preventDefault()

      setAuthor(e.target.value)
   }

   const handleSubmit = async (e) => {
      e.preventDefault()

      try {
         blogFormRef.current.toggleVisibility()
         await blogService
         .create(newObject)
         .then(returnedBlog => {
            setBlogs(blogs.concat(returnedBlog))
            setNewBlog('')
            setUrl('')
            setAuthor('')
         })

         setSuccessMessage(`A new blog "${newObject.title}" has been added`)
         setTimeout(() => {
            setSuccessMessage(null)
         }, 5000)
      } catch (exception) {
         setErrorMessage('Something went wrong')
         setTimeout(() => {
            setErrorMessage(null)
         }, 5000)
      }
   }

   const increaseLike = async (blogId) => {
      const blogToUpdate = blogs.find((blog) => blog.id === blogId)

      if (blogToUpdate) {
         setLike(like + 1)
         setBlogs((prevBlogs) =>
            prevBlogs.map((blog) =>
               blog.id === blogId ? { ...blog, likes: blog.likes + 1 } : blog
            )
         )

         try {
            await blogService.update(blogId, { likes: blogToUpdate.likes + 1 })
         } catch (exception) {
         setErrorMessage('Something went wrong')
         setTimeout(() => {
            setErrorMessage(null)
         }, 5000)
         }
      }
   }

   const handleDelete = async(blogId) => {
      const blogToDelete = blogs.find((blog) => blog.id === blogId)

      const confirmDelete = window.confirm(`Delete blog ${blogToDelete.title} by ${blogToDelete.author}?`)
      if(confirmDelete){
         try {
            await blogService
            .deleteBlog(blogId)
            .then(() => {
            setBlogs(blogs.filter(b => b.id !== blogId))

            setSuccessMessage(`Blog "${blogToDelete.title}" deleted successfully`)
            setTimeout(() => {
               setSuccessMessage(null)
            }, 5000)
         })
         } catch (exception) {
            setErrorMessage(`Error deleting blog "${blogToDelete.title}"`)
            setTimeout(() => {
               setErrorMessage(null)
            }, 5000)
         }
      }
   }

   function logOut() {
      window.localStorage.clear()
      setUser(null)
      blogService.setToken(null)
   }

   const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

   return (
      <div className='blog-wrapper'>
         <h2>Blogs</h2>
         {user && `${user.name} logged in`}
         <button onClick={logOut} className='button logout-button' >Log out</button>

         <Togglable buttonLabel= "New blog" ref={blogFormRef}>
         <h2>Create new</h2>
            <form type="submit" onSubmit={handleSubmit} className='submit-form' >
               Title: <input type="text" id='title' value={newBlog} onChange={blogsChange} className='input' />
               Url: <input type="text" id='url' value={url} onChange={urlChange} className='input' />
               Author: <input type="text" id='author' value={author} onChange={authorChange} className='input' />
               <button type='submit' className='button save-button'> Save </button>
            </form>
            <div className='blog-item'>
               {sortedBlogs.map(b => {
                  return(
                     <ul key={b.id}>
                        <li data-testid='blog-list' className='blog-list'>
                           <div className='blog'>
                              <div>"{b.title}" by {b.author}</div>
                              <Togglable buttonLabel="Show" ref={blogFormRef}>
                                 <div className='blog-info'>
                                    <div className='blog-url'>{b.url}</div>
                                    <div>
                                       Likes: {b.likes} <button className='button button-like' onClick={() => increaseLike(b.id)}>Like</button>
                                    </div>
                                    <div>Creator: {b.user.name}</div>
                                 </div>
                              </Togglable>
                              {user && user.username === b.user.username && (
                                 <button className='button button-delete' onClick={() => handleDelete(b.id)}>Delete</button>
                              )}
                           </div>
                        </li>
                     </ul>
                  )
               })}
         </div>
         </Togglable>
      </div>
   )
}

export default Blog