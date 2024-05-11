import { useQuery } from '@apollo/client'
import {ALL_BOOKS} from "../queries"

const Books = () => {
  const booksResult = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  if(booksResult.loading) {
    return <div>Loading...</div>
  }

  const books = booksResult.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books && books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
