const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')

const password = process.argv[2]
const blogTitle = process.argv[3]
const blogAuthor = process.argv[4]
const blogUrl = process.argv[5]
const blogLikes = process.argv[6]

process.env.NODE_ENV = 'test'


TEST_MONGODB_URI = `mongodb+srv://kenici780:${password}@blog.32kxn25.mongodb.net/testBlogApp?retryWrites=true&w=majority`

if (process.argv.length < 3) {
   console.log('give password as argument')
   process.exit(1)
}


mongoose.set('strictQuery',false)
mongoose.connect(TEST_MONGODB_URI)

const blogSchema = new mongoose.Schema({
   title: String,
   author: String,
   url: String,
   likes: Number
})


const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
   title: blogTitle,
   author: blogAuthor,
   url: blogUrl,
   likes: blogLikes
})

if(blogTitle && blogAuthor && blogUrl && blogLikes) {
   blog.save().then(result => {
      console.log('blog saved!')
      mongoose.connection.close()
   })
} else {
   Blog.find({}).then(result => {
      result.forEach(b => {
         console.log(`${b.title} ${b.author} ${b.url} ${b.likes}`)
      })
      mongoose.connection.close()
   })
}