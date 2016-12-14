import React from 'react'
import GamesList from '../games/GamesList'

const Playlist = ({playlist}) => (
  <div>
    <li>
      <div>
        <label>{playlist.name} ({playlist.user.username})</label>
        <GamesList games={playlist.games} />
      </div>
    </li>
  </div>
)

Playlist.propTypes = {
  playlist: React.PropTypes.object.isRequired
}

export default Playlist
