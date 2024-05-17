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

    type Subscription {
      bookAdded: Book!
    }
`

module.exports = typeDefs