const { mongoose } =  require('mongoose')
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken')

require('dotenv').config()

const MONGODB_URI=process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
    type User {
      username: String!
      favoriteGenre: String!
      _id: ID!
    }

    type Query {
        bookCount: Int
        authorCount: Int
        allBooks(author: String, genre: String): [Book!]!
        allGenres: [String!]!
        allAuthors: [Author!]!
        me: User
    }

    type Token {
      value: String!
    }

    type Author {
        name: String
        bookCount: Int
        born: Int 
    }

    type Book { 
      title: String
      author: Author!
      published: Int
      genres: [String!]!
      id: ID!
  }

    type Mutation {
      addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
      ): Book!

      editAuthor(
        name: String
        setBornTo: Int
      ): Author

      createUser(
        username: String!
        favoriteGenre: String!
      ): User
      userLogin(
        username: String!, 
        password: String!
      ): Token
    }
`

const resolvers = {
  Query: {
    bookCount: async () => {
      return await Book.countDocuments();
    },
    authorCount: async () => {
      return await Author.countDocuments();
    },
    allBooks: async (_, { author, genre }) => {
      let query = {};
      if (author) {
        const authorDoc = await Author.findOne({ name: author });
        if (authorDoc) {
          query.author = authorDoc._id;
        } else {
          return [];
        }
      }
      if (genre) {
        query.genres = { $in: [genre] };
      }
      return await Book.find(query).populate('author');
    },
    allAuthors: async () => {
      return await Author.find({});
    },
    me: async (_, args, context) => {
      return context.currentUser
    }
  },

  Author: {
  bookCount: async (author) => {
    return await Book.countDocuments({ author: author._id });
  }
},
  
  Mutation: {
    addBook: async (_, { title, author, published, genres }, context) => {
      console.log(context)
      if (!context.currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        });
      }

      try {
        let authorExists = await Author.findOne({ name: author });

      if (!authorExists) {
        authorExists = new Author({ name: author });
        await authorExists.save();
      }

      const newBook = new Book ({
        title,
        author: authorExists._id,
        published,
        genres
      })
      await newBook.save();
      await newBook.populate('author');
      return newBook;
      } catch (error) {
        if (error.name === 'ValidationError') {
          let errorMessage = 'Adding the book failed: ';
        if (error.errors.title) {
          errorMessage += 'Ensure title is at least 5 characters long. ';
        }
        if (error.errors.name) {
          errorMessage += 'Ensure author\'s name is at least 4 characters long.';
        }
        throw new GraphQLError(errorMessage, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: Object.keys(error.errors),
            errorDetails: error.errors
          }
        });
      }
        throw new Error('Error adding book');
      }
    },
    editAuthor: async (_, { name, setBornTo }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        });
      }

      try {
        const author = await Author.findOne({ name: name });
        author.born = setBornTo;
        return author.save()
      } catch (error) {
        if (error.name === 'ValidationError') {
          throw new GraphQLError(Object.values(error.errors).map(val => val.message).join(', '));
        }
        throw new Error('Error editing author');
      }
    },
    createUser: async (_, { username, favoriteGenre }) => {
      const user = new User({ username, favoriteGenre })
  
      return user.save()
        .catch(err => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: username,
              errorDetails: err
            }
          })
        })
    },
    userLogin: async(_, { username, password }) => {
      const user = await User.findOne({ username })
  
      if(!user || password !== 'secret') {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
  
      const token = {
        username: user.username,
        id: user._id
      }
  
      return { value: jwt.sign(token, process.env.JWT_SECRET) }
    }
  }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      try {
        const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      } catch (error) {
        console.error("Authentication error:", error.message);
      }
    }
  }
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})