import { useState } from 'react'


export const useField = (setAnecdotes, setNotification) => {
   const [content, setContent] = useState('')
   const [author, setAuthor] = useState('')
   const [info, setInfo] = useState('')

   const handleContentChange = (e) => {
      setContent(e.target.value)
   }

   const handleAuthorChange = (e) => {
      setAuthor(e.target.value)
   }

   const handleInfoChange = (e) => {
      setInfo(e.target.value)
   }

   const addNew = (anecdotes, setAnecdotes, setNotification) => (anecdote) => {
      anecdote.id = Math.round(Math.random() * 10000)
      setAnecdotes(anecdotes.concat(anecdote))
      setNotification(`A new anecdote "${anecdote.content}" created!`)
      setTimeout(() => {
         setNotification(null)
      }, 5000)
   }

   const handleSubmit = (e, anecdotes, setAnecdotes, setNotification) => {
      e.preventDefault()
      const addNewAnecdote = addNew(anecdotes, setAnecdotes, setNotification)
      addNewAnecdote({
         content,
         author,
         info,
         votes: 0
      })
      setContent('')
      setAuthor('')
      setInfo('')
   }

   const handleReset = () => {
      setContent('')
      setAuthor('')
      setInfo('')
   }

   return {
      content,
      author,
      info,
      handleContentChange,
      handleAuthorChange,
      handleInfoChange,
      addNew,
      handleSubmit,
      handleReset
   }
}