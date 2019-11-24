import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const submitForm = (event) => {
    event.preventDefault()
    props.store.dispatch(newAnecdote(event.target.anecdote.value))
    
    props.store.dispatch(setNotification(`you added ${event.target.anecdote.value}`))
    setTimeout(() => props.store.dispatch(resetNotification()), 5000)

    event.target.anecdote.value = ''
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submitForm}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm