import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = () => {
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const { data: userData, loading: userLoading, refetch: refetchUser } = useQuery(ME)
  const { data: booksData, loading: booksLoading } = useQuery(ALL_BOOKS, {
    variables: { genres: favoriteGenre },
    skip: !favoriteGenre,
  })

  useEffect(() => {
   refetchUser();
 }, []);

  useEffect(() => {
    if (userData && userData.me) {
      setFavoriteGenre(userData.me.favoriteGenre)
    }
  }, [userData])

  if (userLoading || booksLoading || !booksData) return <div>Loading...</div>
  console.log('booksData',booksData)

  const filteredBooks = booksData.allBooks && booksData.allBooks.filter((b) => b.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre <strong>{favoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {booksData && filteredBooks.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations