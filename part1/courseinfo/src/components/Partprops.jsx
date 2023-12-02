import React from 'react'

const Partprops = (props) => {
   return(
      <div>
         <p>{props.course[0].parts[1].name} {props.course[0].parts[1].exercises}</p>
      </div>
   )
}

export default Partprops