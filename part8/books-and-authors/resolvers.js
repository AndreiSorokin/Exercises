const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require('./models/Book')
const User = require('./models/User')
const Author = require('./models/Author')

async function getBookCountsByAuthor() {
   const bookCounts = await Book.aggregate([
     { $group: { _id: "$author", count: { $sum: 1 } } }
   ]);
 
   const bookCountMap = {};
   bookCounts.forEach(item => {
     bookCountMap[item._id.toString()] = item.count;
   });
 
   return bookCountMap;
 }

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
     allGenres: async () => {
       const books = await Book.find({});
       const genres = books.map(book => book.genres).flat();
       return [...new Set(genres)];
     },
     allAuthors: async () => {
      const authors = await Author.find({});
      const bookCounts = await getBookCountsByAuthor();

      const authorsWithBookCount = authors.map(author => {
        return {
          ...author._doc,
          bookCount: bookCounts[author._id] || 0,
        };
      });

      return authorsWithBookCount;
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

       pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
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
   },
   Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
      },
    },
 };

 module.exports = resolvers