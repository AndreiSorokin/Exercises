import React from 'react'
import { useDispatch } from 'react-redux'


const Buttons = () => {
  const dispatch = useDispatch()

  const goodChange = () => {
    dispatch({
      type: 'GOOD'
    })
  }

  const okChange = () => {
    dispatch({
      type: 'OK'
    })
  }

  const badChange = () => {
    dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    dispatch({
      type: 'ZERO'
    })
  }


  return (
    <div>
      <div className='buttons'>
        <button className='button' onClick={goodChange}>good</button>
        <button className='button' onClick={okChange}>ok</button>
        <button className='button' onClick={badChange}>bad</button>
        <button className='button' onClick={reset}>reset stats</button>
      </div>
    </div>
  )
}

export default Buttons
