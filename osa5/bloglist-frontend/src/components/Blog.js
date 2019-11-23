import React from 'react'
const Blog = ({ b, expanded, toggleBlog, like, remove, user }) => {
  if (expanded)
    return (
      <div className="blog">
        <div onClick={() => toggleBlog(b)}>{b.title}, by {b.author}</div>
        <a href={b.url}>{b.url}</a><br/>
        {b.likes} likes <button onClick={() => like(b)}>like</button><br/>
        added by {b.user.name}<br/>
        {b.user.id === user.id ? <button onClick={() => remove(b)}>remove</button> : <div></div>}
      </div>
    )
  else
    return (
      <div className="blog" onClick={() => toggleBlog(b)}>{b.title}, by {b.author}</div>
    )
}

export default Blog