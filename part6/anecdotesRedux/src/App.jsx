import { useEffect } from 'react'
import './App.css'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

  const dispacth = useDispatch()
  useEffect(() => {
    dispacth(initializeAnecdotes())
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
        <Filter/>
        <AnecdoteForm/>
    </div>
  )
}

export default App