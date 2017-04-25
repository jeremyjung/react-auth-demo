import React from 'react'
import PropTypes from 'prop-types'

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
  game: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  userCanEditGames: PropTypes.bool
}

export default Game
