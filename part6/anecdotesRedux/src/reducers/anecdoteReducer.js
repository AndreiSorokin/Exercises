import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
   name: 'anecdotes',
   initialState: [],
   reducers: {
      appendAnecdote(state, action) {
         state.push(action.payload)
      },
      setAnecdotes(state, action) {
         return action.payload
      }
   }
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
   return async dispatch => {
      const anecdotes = await anecdoteService.getAll()
      dispatch(setAnecdotes(anecdotes))
   }
}

export const createAnecdote = (content) => {
   return async dispatch => {
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch(appendAnecdote(newAnecdote))
   }
}

export const makeVote = (id) => {
   return async (dispatch, getState) => {
      const { anecdotes } = getState()
      const anecdoteToUpdate = anecdotes.find(anecdote => anecdote.id === id)
      const updatedAnecdote = await anecdoteService.update(anecdoteToUpdate.content, id, anecdoteToUpdate.votes + 1)
      dispatch(setAnecdotes(anecdotes.map(anecdote => anecdote.id === id ? updatedAnecdote : anecdote)))
   }
}

export default anecdoteSlice.reducer