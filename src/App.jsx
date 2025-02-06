import { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'
import personService from './components/notes'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")
  const [errorMessage, setErrorMessage] = useState("some error happened")

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])






  const addPerson = (event) => {
    event.preventDefault()
    const PersonObject = {
      name: newName,
      number: newNumber
    }
    const existing_names = persons.map(person => person.name)
    if (existing_names.includes(newName)) {
      const msg = `${newName} is already added to the phonebook. Replace the old number with the new one?`
      const confirm = window.confirm(msg)
      if (confirm) {
        updateName(PersonObject)
      }
    } else {
      personService
        .create(PersonObject)
        .then(parson => {
          setPersons(persons.concat(parson))
          setNewName("")
          setNewNumber("")
        })
}

    const updateName = (PersonObject) => {
      const update_person = persons.find(p => p.name === PersonObject.name)
      const update_id = update_person.id
      personService
        .update(update_id, PersonObject)
        .then(returnedPerson => setPersons(persons.map(person => person.id === update_id ? returnedPerson : person)))
        .catch(error =>{ 
          setErrorMessage(`The person '${update_person}' was already  deleted from the server`)
          setTimeout(()=>{setErrorMessage(null)},5000)
          setPersons(persons.filter(p => p.id !== update_id))
        })


    }

  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const removePerson = (person) => {
    const msg = `Delete ${person.name}?`
    const confirm = window.confirm(msg)
    if (confirm) {
      personService
        .remove(person.id)
        .then(returnedPerson => setPersons(returnedPerson))
    }
  }

  const filters = (event) => {
    setNewFilter(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const personToShow = newFilter ? persons.filter(person => person.name.toLowerCase().includes(newFilter)) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <div>
        filter Shown with <input value={newFilter} onChange={filters} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personToShow.map(note => <Note key={note.id} note={note} remove={() => removePerson(note)} />)}
    </div>
  )
}

export default App