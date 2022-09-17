import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import NotificationList from './list-notifications'


const Notification = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/notification-list`} />
      <Route path={`${match.url}/notification-list`} component={NotificationList} />
    </Switch>
  )
}

export default Notification
