import React from 'react'
import StatisticLine from './StatisticLine'

const Statistics = (props) => {
   
   return (
      <div>
         <h2>Statistics:</h2>
         <StatisticLine good={props.good} bad={props.bad} neutral={props.neutral} />
      </div>
   )
}

export default Statistics
