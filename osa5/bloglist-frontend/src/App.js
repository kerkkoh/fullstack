import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogsService from './services/blogs'
import Togglable from './Togglable'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import { useField, stripReset } from './hooks'

function App() {
  const username = useField('username')
  const password = useField('password')

  const title = useField('title')
  const author = useField('author')
  const url = useField('url')

  const [notification, setNotification] = useState('')
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [expanded, setExpanded] = useState([])

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogsService.getAll().then(b => setBlogs(b))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username: username.value, password: password.value })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogsService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
      setError('')
    } catch (exception) {
      setError('wrong username or password')
      setTimeout(() => {setError('')}, 5000)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input {...stripReset(username)}/>
          </div>
          <div>
            password
            <input {...stripReset(password)}/>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const toggleBlog = (b) => {
    if (expanded.find(e => e === b.id))
      setExpanded(expanded.filter(e => e !== b.id))
    else
      setExpanded([...expanded, b.id])
  }

  const like = async (b) => {
    try {
      await blogsService.update(b.id, { likes: b.likes + 1 })
      const newBlogs = blogs.map(e => e.id === b.id ? { ...b, likes: b.likes + 1 } : e)
      setBlogs(newBlogs)
    } catch (exception) {
      setError('wrong credentials')
      setTimeout(() => {setError('')}, 2000)
    }
  }

  const remove = async (b) => {
    try {
      if (window.confirm(`remove blog ${b.title} by ${b.author}`)) {
        await blogsService.remove(b.id)
        setBlogs(blogs.filter(e => e.id !== b.id))
      }
    } catch (exception) {
      setError('wrong credentials')
      setTimeout(() => {setError('')}, 2000)
    }
  }

  const listBlogs = () => {
    return blogs.sort((a,b) => b.likes-a.likes).map(b =>
      <Blog key={b.id} b={b} expanded={expanded.find(e => e === b.id)} toggleBlog={toggleBlog} like={like} remove={remove} user={user}/>
    )
  }

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    try {
      const res = await blogsService.create({ title: title.value, author: author.value, url: url.value })
      setBlogs([...blogs, res])
      title.reset()
      author.reset()
      url.reset()
      setNotification(`a new blog ${res.title} by ${res.author} added`)
      setTimeout(() => {setNotification('')}, 5000)
    } catch (exception) {
      setError('wrong credentials')
      setTimeout(() => {setError('')}, 5000)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm addBlog={addBlog}
        title={title}
        author={author}
        url={url}/>
    </Togglable>
  )

  return (
    <div>
      {user === null ? <h1>log in to application</h1> : <h1>blogs</h1>}
      {(notification !== '') ? <Notification notification={notification} type='success'/> : <div></div>}
      {(error !== '') ? <Notification notification={error} type='error'/> : <div></div>}
      {user !== null && (<p>{user.name} logged in.<button onClick={() => window.localStorage.clear() || setUser(null)}>logout</button></p>)}
      {user === null ? loginForm() : blogForm()}
      {user !== null && listBlogs()}
    </div>
  )
}

export default App
