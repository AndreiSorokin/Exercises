import React from 'react'
import { useResource } from '../hooks/useResource'
import { useField } from '../hooks/useField'

const People = () => {
   const [persons, personService] = useResource('http://localhost:3005/persons')

   const name = useField('text')
   const number = useField('number')

   const handlePersonSubmit = (e) => {
      e.preventDefault()
      personService.create({ name: name.value, number: number.value})
   }

   return (
      <div>
         <h2>persons</h2>
         <form onSubmit={handlePersonSubmit}>
            name <input {...name} /> <br/>
            number <input {...number} />
         <button>create</button>
         </form>
         {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
      </div>
   )
}

export default People
