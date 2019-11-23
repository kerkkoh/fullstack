import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => setValue('')

  return {
    reset,
    type,
    value,
    onChange
  }
}

// moduulissa voi olla monta nimettyä eksportia
// eslint-disable-next-line no-unused-vars
export const stripReset = ({ reset, ...state }) => state
