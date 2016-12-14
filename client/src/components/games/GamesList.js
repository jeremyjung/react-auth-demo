import React from 'react'
import Game from './Game'

const GameList = ({games, onDelete, userCanEditGames}) => (
  <ul>
    {games.map((game) => (
      <Game key={game.id} game={game} onDelete={onDelete} userCanEditGames={userCanEditGames} />
    ))}
  </ul>
)

GameList.propTypes = {
  games: React.PropTypes.array.isRequired,
  onDelete: React.PropTypes.func,
  userCanEditGames: React.PropTypes.bool
}

export default GameList
