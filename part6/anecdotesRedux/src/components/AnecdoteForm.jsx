import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
   const dispatch = useDispatch()
   const anecdote = useSelector(state => state.anecdote)


   const addAnecdote = async(e) => {
      e.preventDefault()
      const content = e.target.anecdote.value
      e.target.anecdote.value = ''
      dispatch(createAnecdote(content))
   }


   return (
      <div>
         <h2>Create new</h2>
         <form onSubmit={addAnecdote}>
         <div>
            <input className='input' value={anecdote} name='anecdote'/>
         </div>
         <button className='button' type='submit'>create</button>
      </form>
      </div>
   )
}

export default AnecdoteForm