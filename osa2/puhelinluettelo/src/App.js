import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({name, nbr}) => <li>{name} {nbr}</li>
const Numbers = ({persons, filter}) => {
  // Number will have to do for an unique identifier
  return (
    <ul>
      {persons.filter( f => f.name.includes(filter)).map( f => <Person key={f.number} name={f.name} nbr={f.number}/>)}
    </ul>
  )
}

const AddNew = ({persons, setPersons, newName, setNewName, newNbr, setNewNbr}) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    // Number will have to do for an unique identifier
    if (persons.find(e => e.number === newNbr)) alert(newNbr + ' is already added to phonebook')
    else setPersons(persons.concat({name: newName, number: newNbr}))
  }
  return (
    <form onSubmit={event => handleSubmit(event)}>
      <div>
        name: <input
        value={newName}
        onChange={event => setNewName(event.target.value)} />
      </div>
      <div>
        number: <input
        value={newNbr}
        onChange={event => setNewNbr(event.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({newFilter, setNewFilter}) => {
  return (
    <div>
      filter shown with: <input
      value={newFilter}
      onChange={event => setNewFilter(event.target.value)} />
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
         .then(res => setPersons(res.data))
  }, [])

  const [ newName, setNewName ] = useState('')
  const [ newNbr, setNewNbr ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter newFilter={newFilter}
        setNewFilter={setNewFilter}/>
      <h2>add a new</h2>
      <AddNew persons={persons} setPersons={setPersons} newName={newName}
        setNewName={setNewName} newNbr={newNbr} setNewNbr={setNewNbr}/>
      <h2>Numbers</h2>
      <Numbers persons={persons} filter={newFilter}/>
    </div>
  )

}

export default App