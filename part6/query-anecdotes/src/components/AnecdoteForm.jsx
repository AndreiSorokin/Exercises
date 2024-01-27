import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../services/requests'
import { useNotification } from './NotificationContext';
import { errorReducer, setErrorWithTimeout } from '../reducers/errorReducer'
import { useReducer } from 'react'
import Notification from './Notification'


const AnecdoteForm = () => {
  const { notification, setNotification } = useNotification()
  const queryClient = useQueryClient()
  const [errorState, errorDispatch] = useReducer(errorReducer, { error: null })


  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData({queryKey: ['anecdotes']}, anecdotes.concat(newAnecdote))
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    if (content.length < 5) {
      setErrorWithTimeout(errorDispatch, 'Too short anecdote, must have length 5 or more.')
      return
    }

      newAnecdoteMutation.mutate({ content, votes: 0 })
      setNotification(`Anecdote '${content}' created!`)
  }


const handleVote = (anecdote) => {
  updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  setNotification(`Anecdote '${anecdote.content}' voted!`)
}

const result = useQuery({
  queryKey: ['anecdotes'],
  queryFn: getAnecdotes,
  retry: 1
})

if ( result.isLoading ) {
  return <div>loading data...</div>
}

if (result.isError) {
  return <div>anecdote service not available due to problems in server</div>
}

const anecdotes = result.data

  return (
    <div>
      <Notification> 
        {errorState.error && <div style={{ color: 'red' }}>{errorState.error}</div>}
      </Notification>
      
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteForm