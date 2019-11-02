import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({state, setState, text}) => <button onClick={() => setState(state + 1)}>{text}</button>
const Feedback = ({good, setGood, neutral, setNeutral, bad, setBad}) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button state={good} setState={setGood} text='good' />
      <Button state={neutral} setState={setNeutral} text='neutral' />
      <Button state={bad} setState={setBad} text='bad' />
    </div>
  )
}
const Statistic = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({good, neutral, bad}) => {
  const all = good+neutral+bad
  if (all === 0) return (
    <div>
      <p>No feedback given</p>
    </div>
  )

  const avg = (all === 0) ? 0 : ((bad*-1)+good)/all
  const pos = (all === 0) ? 0 : good/all

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text='good' value={good} />
          <Statistic text='neutral' value={neutral} />
          <Statistic text='bad' value={bad} />
          <Statistic text='all' value={all} />
          <Statistic text='average' value={avg} />
          <Statistic text='positive' value={pos*100 + ' %'} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback good={good} setGood={setGood} neutral={neutral} setNeutral={setNeutral} bad={bad} setBad={setBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)