import React, { useState, useEffect } from 'react'
import db from './services/persons'
import { AddNew, Filter, Numbers } from './Phonebook'

const Notification = ({ notification, type }) => {
  return (
    <div className={`notif ${type}`}>
      {notification}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNbr, setNewNbr ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ notification, setNotification ] = useState('')
  const [ error, setError ] = useState('')
  
  useEffect(() => {
    db.getAll().then(res => setPersons(res))
               .catch(console.error)
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      {(notification !== '') ? <Notification notification={notification} type='success'/> : <div></div>}
      {(error !== '') ? <Notification notification={error} type='error'/> : <div></div>}
      <Filter newFilter={newFilter}
        setNewFilter={setNewFilter}/>
      <h2>add a new</h2>
      <AddNew persons={persons} setPersons={setPersons} newName={newName}
        setNewName={setNewName} newNbr={newNbr} setNewNbr={setNewNbr}
        setNotification={setNotification} setError={setError}/>
      <h2>Numbers</h2>
      <Numbers persons={persons} filter={newFilter} setPersons={setPersons} setNotification={setNotification}/>
    </div>
  )

}

export default App