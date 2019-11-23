import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notification, type }) => {
  return (
    <div className={`notif ${type}`}>
      {notification}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default Notification
