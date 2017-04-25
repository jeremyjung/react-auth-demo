import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as gameApi from '../../services/gameApi'
import AddGameForm from './AddGameForm'
import GamesList from './GamesList'

class GamesPage extends Component {

  constructor () {
    super()

    this.state = {
      games: []
    }

    this.addGame = this.addGame.bind(this)
    this.deleteGame = this.deleteGame.bind(this)
    this.getGames = this.getGames.bind(this)
  }

  addGame (game) {
    gameApi.addGame(game).then(() => this.getGames())
  }

  deleteGame (game) {
    gameApi.deleteGame(game).then(() => this.getGames())
  }

  getGames () {
    gameApi.getGames().then((games) =>
      this.setState({
        games: games
      })
    )
  }

  userCanEditGames () {
    if (this.context.auth.role === 'admin') return true
    else return false
  }

  componentDidMount () {
    this.getGames()
  }

  render () {
    return (
      <div>
        <h2>Games</h2>
        <GamesList games={this.state.games}
          onDelete={this.deleteGame}
          userCanEditGames={this.userCanEditGames(this.context.auth.role)} />
        { this.userCanEditGames(this.context.auth.role) && <AddGameForm addGame={this.addGame} /> }
      </div>
    )
  }

};

GamesPage.contextTypes = {
  auth: PropTypes.object
}

export default GamesPage
