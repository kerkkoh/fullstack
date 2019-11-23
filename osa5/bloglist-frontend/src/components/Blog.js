import React from 'react'
const Blog = ({ b, expanded, toggleBlog, like, remove, user }) => (
  <div className="blog">
    <div className="title" onClick={() => toggleBlog(b)}>{b.title}, by {b.author}</div>
    <div className="the-rest" style={{ display: (expanded ? 'inherit' : 'none') }}>
      <a href={b.url}>{b.url}</a><br/>
      {b.likes} likes <button className="like" onClick={() => like(b)}>like</button><br/>
      added by {b.user.name}<br/>
      {b.user.id === user.id ? <button className="remove" onClick={() => remove(b)}>remove</button> : <div></div>}
    </div>
  </div>
)

export default Blog