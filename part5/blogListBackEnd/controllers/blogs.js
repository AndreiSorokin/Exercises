const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (req, res) => {
   const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
   res.json(blogs)
})

blogsRouter.get('/:id', async (req, res, neext) => {
   const blog = await Blog.findById(req.params.id)
   if(blog) {
      res.json(blog)
   } else {
      res.status(404).end()
   }
})

blogsRouter.post('/', middleware.userExtractor, async (req,res, next) => {
   const body = req.body
   const user = req.user

   const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
   })

   if(!body.title || !body.url) {
      return res.status(400).json({ message: "fill out all the fields" })
   }

   const savedBlog = await blog.save()
   user.blogs = user.blogs.concat(savedBlog._id)

   await user.save()

   const populatedBlog = await Blog.findById(savedBlog).populate('user', { username: 1, name: 1})

   res.status(201).json(populatedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res, next) => {

   const blog = await Blog.findById(req.params.id)
   const user = req.user

   if (!blog) {
      return res.status(404).json({ error: 'blog not found' })
   }

   if(user.id.toString() !== blog.user.toString()) {
      return res.status(403).json({ error: 'You don\'t have permission' })
   }

   await Blog.findByIdAndDelete(req.params.id)
   res.status(204).json({ message: 'The blog has been deleted' })
})

blogsRouter.put('/:id', async (req, res, next) => {
   const body = req.body

   const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
   }

   const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
   res.status(200).json(updatedBlog)
})


module.exports = blogsRouter