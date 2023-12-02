import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './PersonForm'
import Search from './Search'
import Persons from './Persons'
import Notification from './Notification'
import personsService from './services/persons'
import './index.css'
import ErrorNotification from './ErrorNotification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [inputNumber, setInputNumber] = useState('')
  const [search, setSearch] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const person = persons.find(p=> p.name === newName)
  useEffect(() => {
    personsService
    .getAll()
    .then(res => {
      setPersons(res.data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <Search search={search} setSearch={setSearch} />
      <h2>Add a new</h2>
      <PersonForm setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} person={person} personsService={personsService} newName={newName} setNewName={setNewName} persons={persons} setPersons={setPersons} inputNumber={inputNumber} setInputNumber={setInputNumber} />
      <h2>Numbers</h2>
      <Persons personsService={personsService} persons={persons} setPersons={setPersons} search={search} newName={newName} />
    </div>
  )
}

export default App