const blogs = [
  {
    'likes': 32,
    'title': 'Ex1',
    'author': 'Expert1',
    'url': '/1234',
    'user': {
      'username': 'twww',
      'name': 'Test Person',
      'id': '5dd05a6379fcd0196cf4864f'
    },
    'id': '5dd05a6f79fcd0196cf48650'
  },
  {
    'likes': 8,
    'title': 'Ex2',
    'author': 'Expert2',
    'url': '/1234',
    'user': {
      'username': 'twww',
      'name': 'Test Person',
      'id': '5dd05a6379fcd0196cf4864f'
    },
    'id': '5dd05ac1c3b004205082d447'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = newToken => {
  console.log(newToken)
}

const create = async () => {
  return null
}

const update = () => {
  return Promise.resolve(blogs)
}

const remove = async () => {
  return null
}

export default { getAll, create, update, remove, setToken }
