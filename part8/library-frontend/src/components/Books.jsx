import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from "../queries"
import React, { useState, useEffect } from 'react'
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState('')
  const { loading, data, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
    pollInterval: 2000
  })

  const [uniqueGenres, setUniqueGenres] = useState([]);

  useEffect(() => {
    if (!loading && data) {
      const genres = data.allBooks
        .flatMap(book => book.genres)
        .filter((value, index, self) => self.indexOf(value) === index);
      setUniqueGenres(genres);
    }
  }, [data, loading]);

  useEffect(() => {
    refetch({ genre: selectedGenre })
  }, [selectedGenre, refetch])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>No books found</div>
  }

  const books = data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books && books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <FormControl fullWidth>
        <InputLabel id="genre-select-label">Genre</InputLabel>
        <Select
          labelId="genre-select-label"
          id="genre-select"
          value={selectedGenre}
          label="Genre"
          onChange={({ target }) => setSelectedGenre(target.value)}
        >
          <MenuItem value="">All genres</MenuItem>
          {uniqueGenres.map((genre) => (
            <MenuItem key={genre} value={genre}>{genre}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default Books