import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const submitForm = (event) => {
    event.preventDefault()
    props.store.dispatch(newAnecdote(event.target.anecdote.value))
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