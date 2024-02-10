import React from 'react'
import {
   BrowserRouter as Router,
   useMatch,
   useParams
} from 'react-router-dom'

const Anecdote = ({ anecdotes, setAnecdotes }) => {
   const match = useMatch('/anecdotes/:id')
   const anecdote = match
      ? anecdotes.find(a => a.id === Number(match.params.id))
      : null
   const id = anecdote.id
   
   const anecdoteById = (id) =>
   anecdotes.find(a => a.id === id)

   const vote = () => {
      const anecdote = anecdoteById(Number(id))
   
      const voted = {
         ...anecdote,
         votes: anecdote.votes + 1
      }
   
      setAnecdotes(anecdotes.map(a => a.id === Number(id) ? voted : a))
   }

   return (
      <div>
         <h2>{anecdote.content} by {anecdote.author}</h2>
         <div>Has {anecdote.votes} votes</div>
         <div>For more info see {anecdote.info}</div>
         <button onClick={vote}>Vote</button>
      </div>
   )
}


export default Anecdote