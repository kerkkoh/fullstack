import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.store.getState().anecdotes
  const filter = props.store.getState().filter

  const vote = (id) => {
    console.log('vote', id)
    props.store.dispatch(voteAnecdote(id))
    props.store.dispatch(setNotification(`you voted ${anecdotes.find(f => f.id === id).content}`))
    setTimeout(() => props.store.dispatch(resetNotification()), 5000)
  }

  return anecdotes.sort((a,b) => b.votes-a.votes).filter(f => f.content.toLowerCase().includes(filter.toLowerCase()))
    .map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )
}

export default AnecdoteList