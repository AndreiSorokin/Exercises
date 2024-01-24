import React from 'react'
import { useDispatch } from 'react-redux'
import { makeVote } from '../reducers/anecdoteReducer'
import Notification from './Notification'
import { displayNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({filteredAnecdotes}) => {
   const dispatch = useDispatch()

   const votesChange = (id) => {
      dispatch(makeVote(id))
      const votedAnecdote = filteredAnecdotes.find(anecdote => anecdote.id === id)
      dispatch(displayNotification(`You voted for "${votedAnecdote.content}"`, 10))
   }
   const sortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes)

   return (
      <div>
         <Notification/>
         {sortedAnecdotes.map(anecdote =>
            <div className='anecdote' key={anecdote.id}>
               <div>
               {console.log(anecdote.id)}
                  {anecdote.content}
               </div>
               <div>
                  has {anecdote.votes}
                  <button className='button' onClick={() => votesChange(anecdote.id)}>vote</button>
               </div>
            </div>
         )}
      </div>
   )
}

export default AnecdoteList
