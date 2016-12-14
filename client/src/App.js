import React from 'react'
import Router from 'react-router/BrowserRouter'
import { Match, Miss } from 'react-router'
import HomePage from './components/home/HomePage'
import AboutPage from './components/about/AboutPage'
import NotFoundPage from './components/NotFoundPage'
import LoginPage from './components/login/LoginPage'
import ProtectedPage from './components/protected/ProtectedPage'
import GamesPage from './components/games/GamesPage'
import PlaylistsPage from './components/playlists/PlaylistsPage'
import MyPlaylistsPage from './components/playlists/MyPlaylistsPage'
import TopBar from './components/layout/TopBar'
import MatchWhenAuthorized from './components/MatchWhenAuthorized'
import * as authentication from './services/authentication'
import '../node_modules/picnic/picnic.min.css'
import './App.css'

class App extends React.Component {
  constructor () {
    super()

    let authState = authentication.getAuthState()
    this.state = {
      auth: {
        loggedIn: authState.userToken !== null,
        username: authState.username,
        userToken: authState.userToken,
        role: authState.role
      }
    }

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  getChildContext () {
    return {
      auth: {
        loggedIn: this.state.auth.loggedIn,
        username: this.state.auth.username,
        userToken: this.state.auth.userToken,
        role: this.state.auth.role
      }
    }
  }

  login (username, password) {
    return authentication.login(username, password)
        .then(result => {
          this.setState({
            auth: {
              ...this.state.auth,
              loggedIn: true,
              username: result.username,
              userToken: result.userToken,
              role: result.role
            }
          })
        })
        .catch(err => {
          this._logout()
          return Promise.reject(err)
        })
  }

  logout () {
    return authentication.logout().then(result => {
      this._logout()
    })
  }

  render () {
    return (
      <Router>
        <div>
          <TopBar logout={this.logout} />
          <div className='mainbody'>
            <Match exactly pattern='/' component={HomePage} />
            <Match pattern='/about' component={AboutPage} />
            <Match pattern='/login'
              render={(props) => <LoginPage {...props} login={this.login} />}
            />
            <Match pattern='/games' component={GamesPage} />
            <Match pattern='/playlists' component={PlaylistsPage} />
            <MatchWhenAuthorized pattern='/myplaylists' component={MyPlaylistsPage} />
            <Match pattern='/notloggedin'
              render={(props) => <LoginPage {...props} login={this.login} />}
            />

            <MatchWhenAuthorized pattern='/protected' component={ProtectedPage} />

            <Miss component={NotFoundPage} />
          </div>
        </div>
      </Router>
    )
  }

  _logout () {
    this.setState({
      auth: {
        ...this.state.auth,
        loggedIn: false,
        username: null,
        userToken: null,
        role: null
      }
    })
  }

}

App.childContextTypes = {
  auth: React.PropTypes.shape({
    loggedIn: React.PropTypes.bool,
    username: React.PropTypes.string,
    userToken: React.PropTypes.string,
    role: React.PropTypes.string
  })
}

export default App
