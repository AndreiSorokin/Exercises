import React from 'react'

const Anecdotes = ({anecdotes, selected, votes}) => {

   return (
      <div>
         <p> {anecdotes[selected]} </p>
         <p>Has {votes[selected]} votes</p>
      </div>
   )
}

export default Anecdotes
