import React from 'react'

const BestAnecdote = ({votes, anecdotes}) => {

   const largestNumber = votes.indexOf(Math.max(...votes))


   return (
      <div>
         <p> {anecdotes[largestNumber]} </p>
         <p> Has {votes[largestNumber]} votes </p>
      </div>
   )
}

export default BestAnecdote
