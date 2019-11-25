import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = async (anecdote) => {
    props.voteAnecdote(anecdote)
    props.setNotification(`you voted ${anecdote.content}`, 5)
  }

  return props.anecdotesToShow
    .map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
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
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)