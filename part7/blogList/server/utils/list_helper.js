const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const favorite = blogs.reduce(
    (max, blog) => (blog.likes > max.likes ? blog : max),
    blogs[0],
  )

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const blogCount = _.countBy(blogs, 'author')
  const topAuthor = _.maxBy(
    Object.keys(blogCount),
    (author) => blogCount[author],
  )

  return {
    author: topAuthor,
    blogs: blogCount[topAuthor],
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const blogCount = _.groupBy(blogs, 'author')
  const topAuthor = _.maxBy(Object.keys(blogCount), (author) => {
    return _.sumBy(blogCount[author], 'likes')
  })
  const likes = _.sumBy(blogCount[topAuthor], 'likes')

  return {
    author: topAuthor,
    likes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
