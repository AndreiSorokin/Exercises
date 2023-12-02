import Title from './components/Title'
import Buttons from './components/Buttons'
import Statistics from './components/Statistics'

import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)

  return (
    <div>
      <Title/>
      <Buttons good={good} setGood={setGood} bad={bad} setBad={setBad} neutral={neutral} setNeutral={setNeutral} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App