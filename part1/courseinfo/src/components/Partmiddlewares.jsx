import React from 'react'

const Partmiddlewares = (props) => {
   return (
      <div>
      <p>{props.course[1].parts[1].name} {props.course[1].parts[1].exercises}</p>
      </div>
   )
}

export default Partmiddlewares
