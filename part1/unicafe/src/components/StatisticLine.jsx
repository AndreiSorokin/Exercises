import React from 'react'

const StatisticLine = (props) => {

   const isNull = (props.good || props.bad || props.neutral) === 0

   return (
      <div>
         {isNull
         ? <p>No feedback given</p>
         :
         <table>
            <tbody>
               <tr>
                  <th></th>
                  <th></th>
               </tr>
               <tr>
                  <td>Good: </td>
                  <td>{props.good}</td>
               </tr>
               <tr>
                  <td>Bad: </td>
                  <td>{props.bad}</td>
               </tr>
               <tr>
                  <td>Neutral: </td>
                  <td>{props.neutral}</td>
               </tr>
               <tr>
                  <td>All: </td>
                  <td>{props.good + props.bad + props.neutral}</td>
               </tr>
               <tr>
                  <td>Average: </td>
                  <td>{(props.good - props.bad) / (props.good + props.bad + props.neutral)}</td>
               </tr>
               <tr>
                  <td>Positive: </td>
                  <td>{(props.good / (props.good + props.bad + props.neutral))*100}%</td>
               </tr>
            </tbody>
         </table>
         }
      </div>
   )
}

export default StatisticLine
