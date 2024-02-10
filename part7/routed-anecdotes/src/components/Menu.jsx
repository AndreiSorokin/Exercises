import React from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import AnecdoteList from './AnecdoteList'
import About from './About'
import CreateNew from './CreateNew'
import Anecdote from './Anecdote'


const Menu = ({anecdotes, setAnecdotes, setNotification}) => {
  const padding = {
    paddingRight: 5
  }


  return (
    <div>
        <Link className='link' to='/'>Anecdotes</Link>
        <Link className='link' to='/create'>Create new</Link>
        <Link className='link' to='/about'>About</Link>
        <Routes>
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} setAnecdotes={setAnecdotes} />} />
          <Route path='/create' element={<CreateNew setNotification={setNotification} anecdotes={anecdotes} setAnecdotes={setAnecdotes} />}/>
          <Route path='/about' element={<About />} />
          <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} setAnecdotes={setAnecdotes} />}/>
        </Routes>
    </div>
  )
}

export default Menu
