import React from 'react'

const Partreact = (props) => {

   return(
      <div>
         <p>{props.course[0].parts[0].name} {props.course[0].parts[0].exercises}</p>
      </div>
   )
}

export default Partreact