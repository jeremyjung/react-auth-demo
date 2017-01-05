import React from 'react'
import SignOutButton from './SignOutButton'
import { Link } from 'react-router'

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
        <Link className='pseudo button' to='/protected'>Protected</Link>
        <SignOutButton logout={logout} />
      </div>
    </nav>
  </div>
)

TopBar.contextTypes = {
  auth: React.PropTypes.shape({
    loggedIn: React.PropTypes.bool,
    username: React.PropTypes.string
  })
}

TopBar.propTypes = {
  logout: React.PropTypes.func
}

export default TopBar
