import React from 'react'

const Partrouting = (props) => {
   return (
   <div>
      <h2>Node.js</h2>
      <p>{props.course[1].parts[0].name} {props.course[1].parts[0].exercises}</p>
   </div>
   )
}

export default Partrouting
