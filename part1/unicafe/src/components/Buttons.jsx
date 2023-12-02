import React from 'react'
import './Buttons.css'

const Buttons = (props) => {

   function incrementGood() {
      props.setGood(props.good + 1)
   }
   function incrementBad() {
      props.setBad(props.bad + 1)
   }
   function incrementNeutral() {
      props.setNeutral(props.neutral + 1)
   }

   return (
      <div className='buttons'>
         <button onClick={incrementGood}>Good</button>
         <button onClick={incrementBad}>Bad</button>
         <button onClick={incrementNeutral}>Neutral</button>
      </div>
   )
}

export default Buttons
