import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchNotifications, allNotificationsRead, selectAllNotifications } from '../features/notifications/notificationsSlice'

export const Navbar = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(selectAllNotifications)
  const numUnread = notifications.filter( n => !n.read).length

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
    // dispatch(allNotificationsRead())
  }

  let unreadNotificationsBadge

  if(numUnread > 0) {
    unreadNotificationsBadge = (
      <span className="badge">{numUnread}</span>
    )
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">Notifications {unreadNotificationsBadge}</Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}