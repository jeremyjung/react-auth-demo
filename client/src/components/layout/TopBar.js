import React from 'react'
import PropTypes from 'prop-types'
import SignOutButton from './SignOutButton'
import { Link } from 'react-router-dom'

const TopBar = ({logout}, context) => (
  <div>
    <nav>
      <Link className='brand' to='/'>React Auth demonstration</Link>
      <input id='bmenug' type='checkbox' className='show' />
      <label htmlFor='bmenug' className='burger pseudo button'>&#8801;</label>

      <div className='menu'>
        <Link className='pseudo button' to='/'>Home</Link>
        <Link className='pseudo button' to='/about'>About</Link>
        <Link className='pseudo button' to='/games'>Games</Link>
        {
          !context.auth.loggedIn &&
          <Link className='pseudo button' to='/login'>Login</Link>
        }
        <SignOutButton logout={logout} />
      </div>
    </nav>
  </div>
)

TopBar.contextTypes = {
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool,
    username: PropTypes.string
  })
}

TopBar.propTypes = {
  logout: PropTypes.func
}

export default TopBar
