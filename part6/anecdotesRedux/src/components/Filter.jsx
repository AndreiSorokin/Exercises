import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filterAnecdote } from '../reducers/filterReducer'
import AnecdoteList from './AnecdoteList'



const Filter = () => {
   const dispatch = useDispatch()
   const filter = useSelector(state => state.filter)
   const anecdotes = useSelector(state => state.anecdotes)

   const handleInputChange = (e) => {
      const value = e.target.value
      dispatch(filterAnecdote(value))
   }
   const filteredAnecdotes = anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
   )


   return (
      <div>
         Filter: <input type="text" name='search' onChange={handleInputChange} className='input' />
         <AnecdoteList filteredAnecdotes={filteredAnecdotes}/>
      </div>
   )
}

export default Filter