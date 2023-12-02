import React from 'react'

const Buttons = ({anecdotes, setSelected, votes, selected, setVotes}) => {

   const handleNextAnecdote = () => {
      const randomIndex = Math.floor(Math.random() * anecdotes.length);
      setSelected(randomIndex);
   }
   function handleVote () {
      const newVotes = [...votes]
      newVotes[selected] += 1
      setVotes(newVotes)
   }

   return (
      <div>
         <button onClick={handleVote} >Vote</button>
      <button onClick={handleNextAnecdote} > Next anecdote </button>
      </div>
   )
}

export default Buttons
