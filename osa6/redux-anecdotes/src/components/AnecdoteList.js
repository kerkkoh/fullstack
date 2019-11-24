import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (id, content) => {
    console.log('vote', id)
    props.voteAnecdote(id)
    props.setNotification(`you voted ${content}`)
    setTimeout(() => props.resetNotification(), 5000)
  }

  return props.anecdotesToShow
    .map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
      </div>
    )
}
const visibleAnecdotes = ({anecdotes, filter}) => {
  return anecdotes.sort((a,b) => b.votes-a.votes).filter(f => f.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: visibleAnecdotes(state),
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
  resetNotification,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)