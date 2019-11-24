const notificationReducer = (state = [ false, '' ], action) => {
  switch(action.type) {
    case 'SET':
      return [ true, action.data ]
    case 'RESET':
      return [ false, '' ]
    default:
      return state
  }
}

export const setNotification = (data) => {
  return {
    type: 'SET',
    data
  }
}
export const resetNotification = () => {
  return {
    type: 'RESET'
  }
}

export default notificationReducer