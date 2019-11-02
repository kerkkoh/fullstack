import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Button = ({click, text}) => <button onClick={click}>{text}</button>
const Anecdote = ({text, votes}) => <p>{text}<br />has {votes} votes</p>
const App = ({anecdotes}) => {
  const randIdx = () => Math.floor(Math.random()*anecdotes.length)
  const [selected, setSelected] = useState(randIdx())
  const [votes, setVotes] = useState(anecdotes.map(f => 0))
  const incrVotes = () => {
    const v = [...votes]
    v[selected] += 1
    setVotes(v)
  }
  
  const mostVotes = votes.map((f, i) => [f, i]).sort((a, b) => b[0]-a[0])[0][1]

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]}/>
      <Button click={() => incrVotes()} text='Vote'/>
      <Button click={() => setSelected(randIdx())} text='New anecdote'/>
      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[mostVotes]} votes={votes[mostVotes]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)