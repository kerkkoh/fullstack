import axios from 'axios'

const url = 'http://localhost:3001/persons'

const parseReqData = (req) => req.then(res => res.data)

const getAll = () => parseReqData(axios.get(url))
const create = obj => parseReqData(axios.post(url, obj))
const update = (id, obj) => parseReqData(axios.put(`${url}/${id}`, obj))
const remove = (id) => parseReqData(axios.delete(`${url}/${id}`))

export default { getAll, create, update, remove }