import React from 'react'

const Partstate = (props) => {
   return (
   <div>
      <p>{props.course[0].parts[2].name} {props.course[0].parts[2].exercises}</p>
   </div>
   )
}

export default Partstate
