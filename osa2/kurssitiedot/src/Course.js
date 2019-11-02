import React from 'react'

const Header = ({course}) => {
  return (
    <h2>{course}</h2>
  )  
}
const Part = ({part, exercises}) => {
  return (
    <p>
      {part} {exercises}
    </p>
  )  
}
const Content = ({parts}) => {
  const array = parts.map(f => <Part key={f.id} part={f.name} exercises={f.exercises}/>)
  return array
}
const Total = ({parts}) => {
  const sum = parts.reduce((tot, c) => tot+c.exercises, 0)
  return (
    <p><b>total of {sum} exercises</b></p>
  )  
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course