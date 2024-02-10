import React, { useState } from 'react'
import { useField } from '../hooks/index'

  const CreateNew = ({anecdotes, setAnecdotes, setNotification}) => {
    const { content, author, info, handleContentChange, handleAuthorChange, handleInfoChange, handleSubmit, handleReset } = useField()
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={(e) => handleSubmit(e, anecdotes, setAnecdotes, setNotification)}>
        <div>
          content
          <input name='content' value={content} onChange={handleContentChange} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={handleAuthorChange} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={handleInfoChange} />
        </div>
        <button>create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}
export default CreateNew
