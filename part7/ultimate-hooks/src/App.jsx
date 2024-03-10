import { useState } from 'react'
import axios from 'axios'
import Notes from './components/Notes'
import People from './components/People'


const App = () => {

  return (
    <div>
      <Notes/>
      <People/>
    </div>
  )
}

export default App