import axios from 'axios'
import React from 'react'
import personsService from './services/persons'


const PersonForm = ({setErrorMessage, setSuccessMessage, persons, setPersons, newName, setNewName, inputNumber, setInputNumber, personsService }) => {

      function handleChange(e){
         setNewName(e.target.value)
      }

      function changeNumber(e) {
         setInputNumber(e.target.value)
      }


      function handleSubmit(e) {
         e.preventDefault()

         const newObject = {
            name: newName,
            number: inputNumber,
            id: crypto.randomUUID()
         }

         const nameExists = persons.find((person)=> person.name === newName.toLowerCase())
         if (nameExists) {
            const person = persons.find(p=> p.name === newName.toLowerCase())
            const confirmChange = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
            if (confirmChange) {
               const id = person.id
               const newObject = {
                  ...person,
                  number: inputNumber
               }

               personsService.update(id, newObject)
               .then(updatedPerson  => {
                  setPersons(persons.map(p=> p.id !== id ? p : updatedPerson ))
               })
               .catch(err=> {
                  setErrorMessage(
                     `${person.name} has already beed deleted from phonebook`
                  )
                  setTimeout(()=>{
                     setErrorMessage(null)
                  }, 3000)
               })
               setPersons(persons.filter(p=> p.id !== id))
            }
         } else {
            setPersons((currentPerson) => [
               ...currentPerson,
               newObject
            ])
            personsService.create(newObject)
            .then(person=> {
            setPersons(persons.concat(person))
            setSuccessMessage(
               `${person.name} has been successfully added to phonebook`
            )
            setTimeout(()=> {
               setSuccessMessage(null)
            }, 3000)
         })
            setNewName('')
            setInputNumber('')
         }
      }

   return (
   <div>
      <form onSubmit={handleSubmit} >
      <div>
         name: <input type="text" value={newName} onChange={handleChange} style={{margin: "5px"}} /> <br/>
         number: <input type="number" value={inputNumber} onChange={changeNumber} />
      </div>
      <div>
         <button type="submit">add</button>
      </div>
      </form>
   </div>
)
}

export default PersonForm