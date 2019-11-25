import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(baseUrl, { content, votes: 0 })
  return response.data
}

const vote = async (itm) => {
  await axios.put(`${baseUrl}/${itm.id}`, {...itm, votes: itm.votes+1})
}

export default { getAll, createNew, vote }