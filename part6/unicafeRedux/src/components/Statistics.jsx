import React from 'react'
import { useSelector } from 'react-redux'


const Statistics = () => {
   const good = useSelector(state => state.good)
   const ok = useSelector(state => state.ok)
   const bad = useSelector(state => state.bad)

   return (
      <div>
         <div className="results">
            <div>good: {good}</div>
            <div>ok: {ok}</div>
            <div>bad: {bad}</div>
         </div>
      </div>
   )
}

export default Statistics
