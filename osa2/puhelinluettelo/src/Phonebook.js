import React from 'react'
import db from './services/persons'

export const Person = ({id, name, nbr, persons, setPersons, setNotification}) => {
  const delPerson = () => {
    if (window.confirm(`Delete ${name}?`))
    db.remove(id).then(data => {
      setPersons(persons.filter(p => p.id !== id))
      setNotification(`Deleted ${name}`)
      setTimeout(() => setNotification(''), 5000)
    })
  }
  return (
    <li>{name} {nbr} <button onClick={() => delPerson()}>delete</button></li>
  )
}

export const Numbers = ({persons, filter, setPersons, setNotification}) => {
  return (
    <ul>
      {persons.filter( f => f.name.toLowerCase().includes(filter.toLowerCase())).map( f => <Person key={f.id} id={f.id} name={f.name} nbr={f.number} setPersons={setPersons} persons={persons} setNotification={setNotification}/>)}
    </ul>
  )
}

export const AddNew = ({persons, setPersons, newName, setNewName, newNbr, setNewNbr, setNotification, setError}) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    const existing = persons.find(e => e.name === newName)
    if (existing !== undefined) {
    // Name already exists, update?
    if (window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')) {
      db.update(existing.id, {...existing, number: newNbr})
      .then(data => {
        setPersons(persons.map(p => p.id !== existing.id ? p : data))
        setNotification(`Updated ${newName} number to ${newNbr}`)
        setTimeout(() => setNotification(''), 5000)
      })
      .catch( e => {
        if (e.response.data.msg !== undefined) {
          setError(`${e.response.data.msg}`)
          setTimeout(() => setError(''), 5000)
        } else {
          setError(`Information of ${newName} has already been removed from server`)
          setTimeout(() => setError(''), 5000)
          setPersons(persons.filter(p => p.id !== existing.id))
        }
      })
    }
    } else {
    db.create({name: newName, number: newNbr})
      .then((data) => {
      setPersons(persons.concat(data))
      setNotification(`Added ${newName}`)
      setTimeout(() => setNotification(''), 5000)
      })
      .catch(e => {
        setError(`${e.response.data.msg}`)
        setTimeout(() => setError(''), 5000)
      })
    }
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

export const Filter = ({newFilter, setNewFilter}) => {
  return (
    <div>
    filter shown with: <input
    value={newFilter}
    onChange={event => setNewFilter(event.target.value)} />
    </div>
  )
}