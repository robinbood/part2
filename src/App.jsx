import { useState } from 'react'
import Note from './components/Note'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1, number: "" }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [newFilter,setNewFilter] = useState("")

  const addPerson = (event) => {
    event.preventDefault()
    const PersonObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber
    }


    setPersons(persons.concat(PersonObject))
    setNewName("")
    setNewNumber("")

  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const filters= (event) =>{
    setNewFilter(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const personToShow = newFilter ? persons.filter(person=>person.name.toLowerCase().includes(newFilter)) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter Shown with <input value={newFilter} onChange={filters}/>
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
      {personToShow.map(note => <Note key={note.id} note={note} />)}
    </div>
  )
}

export default App