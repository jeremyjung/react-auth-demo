import React from 'react'
import Playlist from './Playlist'

const PlaylistsList = ({playlists}) => (
  <ul>
    {playlists.map((playlist) => (
      <Playlist key={playlist.id} playlist={playlist} />
    ))}
  </ul>
)

PlaylistsList.propTypes = {
  playlists: React.PropTypes.array.isRequired
}

export default PlaylistsList
