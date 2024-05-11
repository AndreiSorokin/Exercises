import { useQuery, useMutation } from '@apollo/client'
import {ALL_AUTHORS, EDIT_AUTHOR} from "../queries"
import { useState } from 'react'
import { Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';

const Authors = () => {
  const authorsResult = useQuery(ALL_AUTHORS)

  const [name, setName] = useState('')
  const [setBornTo, setSetBornTo] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR)

  if(authorsResult.loading) {
    return <div>Loading...</div>
  }
  
  const authors = authorsResult.data.allAuthors

  const submit = async(e) => {
    e.preventDefault()

    await editAuthor({ variables: { name, setBornTo: parseInt(setBornTo) } })

    setName('')
    setSetBornTo('')
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {authors && authors.map((author) => (
            <tr key={author.name}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birth yesr</h2>
      <form onSubmit={submit}>
        <FormControl fullWidth>
          <InputLabel id="author-select-label">Name</InputLabel>
          <Select
            labelId="author-select-label"
            id="author-select"
            value={name}
            label="Name"
            onChange={({ target }) => setName(target.value)}
          >
            {authors.map((author) => (
              <MenuItem key={author.name} value={author.name}>{author.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <div>
          Born
          <input
            type="number"
            value={setBornTo}
            onChange={({ target }) => setSetBornTo(target.value)}
            style={{ marginLeft: '10px' }}
          />
        </div>
        <Button type="submit" variant="contained" style={{ marginTop: '10px' }}>Update</Button>
      </form>
    </div>
  );
};

export default Authors;
