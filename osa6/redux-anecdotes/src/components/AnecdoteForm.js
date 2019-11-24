import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const submitForm = (event) => {
    event.preventDefault()
    
    props.newAnecdote(event.target.anecdote.value)
    props.setNotification(`you added ${event.target.anecdote.value}`)
    setTimeout(() => props.resetNotification(), 5000)

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

export default connect(
  null,
  { newAnecdote, setNotification, resetNotification }
)(AnecdoteForm)