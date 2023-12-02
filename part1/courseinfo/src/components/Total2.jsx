import React from 'react'

const Total2 = (props) => {

   const total = props.course[1].parts.reduce((total, item) => {
      return total + item.exercises
   }, 0)

   return (
      <div>
         <p>total of {total} exercises</p>
      </div>
   )
}

export default Total2
