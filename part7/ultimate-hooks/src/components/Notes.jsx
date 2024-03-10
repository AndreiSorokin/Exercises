import React from 'react'
import { useResource } from '../hooks/useResource'
import { useField } from '../hooks/useField'

const Notes = () => {
   const [notes, noteService] = useResource('http://localhost:3005/notes')

   const content = useField()

   const handleNoteSubmit = (e) => {
      e.preventDefault()
      noteService.create({ content: content.value })
   }

   return (
      <div>
         <h2>notes</h2>
         <form onSubmit={handleNoteSubmit}>
         <input {...content} />
         <button>create</button>
         </form>
         {notes.map(n => <p key={n.id}>{n.content}</p>)}
      </div>
   )
}

export default Notes
