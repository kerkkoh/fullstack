import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const submitForm = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    props.createAnecdote(anecdote)
    
    props.setNotification(`you added ${anecdote}`)
    setTimeout(() => props.resetNotification(), 5000)
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
  { createAnecdote, setNotification, resetNotification }
)(AnecdoteForm)