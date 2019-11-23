import React from 'react'
import PropTypes from 'prop-types'
import { stripReset } from '../hooks'

const BlogForm = ({
  addBlog,
  title,
  author,
  url
}) => {
  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        title:<input {...stripReset(title)}/><br />
        author:<input {...stripReset(author)}/><br />
        url:<input {...stripReset(url)}/><br />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
}

export default BlogForm