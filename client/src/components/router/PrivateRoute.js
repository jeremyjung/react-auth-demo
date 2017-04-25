// Inspiration for this component from: https://react-router.now.sh/auth-workflow
// Routes user to the component if context shows them as being logged in
// Otherwise, routes them to the login page

import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }, context) => (
  <Route {...rest} render={props => (
    context.auth.loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/notloggedin',
        state: { from: props.location }
      }} />
    )
  )} />
)

PrivateRoute.contextTypes = {
  auth: PropTypes.object
}

export default PrivateRoute
