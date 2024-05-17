import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      bookCount
      born
    }
  }
`;

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
    }
    published
    genres
  }
`;

export const ALL_BOOKS = gql`
  ${BOOK_DETAILS}

  query allBooks($genre: String){
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
`;

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`;

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const CREATE_BOOK = gql`
  ${BOOK_DETAILS}

  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      ...BookDetails
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
  bookAdded {
    title
    author {
      name
    }
  }
}
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String, $setBornTo: Int) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
    }
  }
`

export const USER_LOGIN = gql`
  mutation userLogin($username: String!, $password: String!) {
    userLogin(username: $username, password: $password) {
      value
    }
  }
`