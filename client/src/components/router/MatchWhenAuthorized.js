// Inspiration for this component from: https://react-router.now.sh/auth-workflow
// Routes user to the component if context shows them as being logged in
// Otherwise, routes them to the login page

import React from 'react'
import { Match, Redirect } from 'react-router'

const MatchWhenAuthorized = ({ component: Component, ...rest }, context) => (
  <Match {...rest} render={props => (
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

MatchWhenAuthorized.contextTypes = {
  auth: React.PropTypes.object
}

export default MatchWhenAuthorized
