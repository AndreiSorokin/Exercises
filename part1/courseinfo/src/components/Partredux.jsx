import React from 'react'

const Partredux = (props) => {
return (
   <div>
      <p>{props.course[0].parts[3].name} {props.course[0].parts[3].exercises}</p>
   </div>
)
}

export default Partredux
