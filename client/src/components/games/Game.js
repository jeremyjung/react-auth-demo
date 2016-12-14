import React from 'react'

const Game = ({game, onDelete, userCanEditGames}) => (
  <div>
    <li>
      <div>
        <label>{game.name}</label>
        {
          userCanEditGames &&
          <button className='delete button' onClick={() => onDelete(game)}>Delete</button>
        }
      </div>
    </li>
  </div>
)

Game.propTypes = {
  game: React.PropTypes.object.isRequired,
  onDelete: React.PropTypes.func,
  userCanEditGames: React.PropTypes.bool
}

export default Game
