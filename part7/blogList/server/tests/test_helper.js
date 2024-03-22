const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'title1',
    author: 'author1',
    url: 'url1',
    likes: 1,
  },
  {
    title: 'title2',
    author: 'author2',
    url: 'url2',
    likes: 2,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ likes: 100 })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const userInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

const getUserWithToken = async () => {
  const username = `testuser_${Date.now()}`
  const password = 'testpassword'

  const hashPassword = await bcrypt.hash(password, 10)

  const user = new User({
    username: username,
    name: 'Test User',
    hashPassword: hashPassword,
  })

  const savedUser = await user.save()

  const userForToken = {
    username: savedUser.username,
    id: savedUser._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  return {
    user: savedUser,
    token: token,
  }
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  userInDb,
  getUserWithToken,
}
