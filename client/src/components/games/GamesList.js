import React from 'react'
import PropTypes from 'prop-types'
import Game from './Game'

const GameList = ({games, onDelete, userCanEditGames}) => (
  <ul>
    {games.map((game) => (
      <Game key={game.id} game={game} onDelete={onDelete} userCanEditGames={userCanEditGames} />
    ))}
  </ul>
)

GameList.propTypes = {
  games: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  userCanEditGames: PropTypes.bool
}

export default GameList
