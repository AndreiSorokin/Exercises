import React from 'react'
import personsService from './services/persons'

const Persons = ({persons, setPersons, search}) => {

   const filteredNames = persons.filter(name=> name.name.toLowerCase().includes(search.toLowerCase()))

   function deleteOne (id) {
      const person = persons.find(p => p.id === id)
      const confirmDelete = window.confirm(`Delete ${person.name}?`)
      if(confirmDelete) {
         personsService.deletePerson(id)
         .then(()=> {
            setPersons(persons.filter(p=> p.id !== id))
         })
         .catch((err)=> {
            console.log(err)
         })
      }
   }

   return (
      <div>
         <ul>
            {filteredNames.map(person=>{
               return(
                  <li className='contact' key={person.id} >
                     Name: {person.name}, 
                     Number: {person.number} 
                     <button onClick={()=> deleteOne(person.id)} > Delete </button> </li>
               )
            })}
         </ul>
      </div>
   )
}

export default Persons