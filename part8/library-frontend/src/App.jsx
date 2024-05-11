import {
  Routes, Route
} from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import NavBar from './components/NavBar'

const App = () => {

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Authors/>}></Route>
        <Route path='/books' element={<Books/>}></Route>
        <Route path='/newBook' element={<NewBook/>}></Route>
      </Routes>
    </div>
  )
}

export default App
