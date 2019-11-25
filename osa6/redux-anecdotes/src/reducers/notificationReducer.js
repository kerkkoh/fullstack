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

export const setNotification = (data, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET',
      data
    })

    setTimeout(() => dispatch({ type: 'RESET' }), time*1000)
  }
}
export const resetNotification = () => {
  return {
    type: 'RESET'
  }
}

export default notificationReducer