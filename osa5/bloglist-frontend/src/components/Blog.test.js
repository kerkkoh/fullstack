import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'
// import { prettyDOM } from '@testing-library/dom'

afterEach(cleanup)

const b = {
  title: 'Example',
  author: 'Example',
  url: 'example.com',
  user: {
    'name': 'Example',
    'id': '01234'
  },
  likes: 0
}

test('renders content', () => {
  const component = render(
    <Blog b={b} expanded={false} user={b.user}/>
  )

  const title = component.container.querySelector('.title')
  expect(title).toHaveTextContent(
    `${b.title}, by ${b.author}`
  )

  const rest = component.container.querySelector('.the-rest')
  expect(rest).toHaveStyle('display: none')
})

test('toggle works', () => {
  let expanded = false
  const mockHandler = () => { expanded = !expanded }
  const reRender = () => {
    return render(
      <Blog b={b} expanded={expanded} toggleBlog={mockHandler} user={b.user}/>
    )
  }

  let component = reRender()

  const button = component.container.querySelector('.title')
  fireEvent.click(button)

  // Re-render the component because of initial design choices
  component = reRender()

  const rest = component.container.querySelector('.the-rest')
  expect(rest).toHaveStyle('display: inherit')
})