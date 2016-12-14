import React from 'react'

const SignOutButton = ({logout}, context) => (
      context.auth.loggedIn ? (
        <button className='button' onClick={() => {
          logout().then(() => context.router.transitionTo('/'))
        }}>Sign out</button>
    ) : null
)

SignOutButton.contextTypes = {
  router: React.PropTypes.object,
  auth: React.PropTypes.object
}

SignOutButton.propTypes = {
  logout: React.PropTypes.func.isRequired
}

export default SignOutButton
