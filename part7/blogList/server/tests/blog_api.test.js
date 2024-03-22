const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

process.env.NODE_ENV = 'test'

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('when there is initially some notes saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 10000)

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const like = response.body.map((l) => l.likes)
    expect(like).toContain(2)
  })
})

describe('viewing a specific note', () => {
  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body.id).toBeDefined()
  })

  test('updating likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      likes: blogToUpdate.likes + 1,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlogInDb = blogsAtEnd.find(
      (blog) => blog.id === blogToUpdate.id,
    )

    expect(updatedBlogInDb.likes).toBe(blogToUpdate.likes + 1)
  })

  test('fails with status 400 if id is invalid', async () => {
    const invalidId = '12345abcde'

    await api.get(`/api/blogs/${invalidId}`).expect(400)
  })
})

describe('addition of a new note', () => {
  test('a valid blog can be added', async () => {
    const { user, token } = await helper.getUserWithToken()

    const newBlog = {
      title: 'title3',
      author: 'author3',
      url: 'url3',
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const like = blogsAtEnd.map((l) => l.likes)
    expect(like).toContain(2)
  })

  test('verifying likes property', async () => {
    const { user, token } = await helper.getUserWithToken()

    const newBlog = {
      title: 'title4',
      author: 'author4',
      url: 'url4',
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    expect(response.body.likes).toBe(0)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('verifying 400 Bad Request if a title or a url is missing', async () => {
    const { user, token } = await helper.getUserWithToken()

    const newBlog = {
      title: 'title4',
      author: 'author4',
      likes: 4,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('adding a blog fails with status 401', async () => {
    const newBlog = {
      title: 'title4',
      author: 'author4',
      likes: 4,
    }

    await api.post('/api/blogs').send(newBlog).expect(401)
  })
})

describe('deletion of a note', () => {
  test('a blog can be deleted', async () => {
    const { user, token } = await helper.getUserWithToken()

    const newBlog = {
      title: 'New Blog',
      author: 'Author Name',
      url: 'URL',
      likes: 5,
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogToDelete = response.body

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd.map((blog) => blog.likes)
    expect(likes).not.toContain(blogToDelete.likes)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const hashPassword = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', hashPassword })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.userInDb()

    const newUser = {
      username: 'user1',
      name: 'name1',
      password: 'password1',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.userInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.userInDb()

    const newUser = {
      username: 'root',
      name: 'someName',
      password: 'somePassword',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.userInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
