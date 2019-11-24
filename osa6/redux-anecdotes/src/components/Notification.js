import React from 'react'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const notif = props.store.getState().notification
  return notif[0] ? <div style={style}>{ notif[1] }</div> : <div></div>
}

export default Notification