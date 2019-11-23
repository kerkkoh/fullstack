import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'
//import { prettyDOM } from '@testing-library/dom'

afterEach(cleanup)

const blog = {
  title: 'Example',
  author: 'Example',
  likes: 0
}

test('renders content', () => {
  const component = render(
    <SimpleBlog blog={blog} />
  )

  const title = component.container.querySelector('.title')
  expect(title).toHaveTextContent(
    `${blog.title} ${blog.author}`
  )
  const body = component.container.querySelector('.body')
  expect(body).toHaveTextContent(
    `blog has ${blog.likes} likes`
  )
  //console.log(prettyDOM(body))
})

test('like button works', () => {
  const mockHandler = jest.fn()
  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )
  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(2)
})