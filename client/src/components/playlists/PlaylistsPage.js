import React, { Component } from 'react'
import { getAllPlaylistsMerged } from '../../services/playlistApi'
import PlaylistsList from './PlaylistsList'

class PlaylistsPage extends Component {

  constructor () {
    super()

    this.state = {
      playlists: []
    }

    this.dataLoaded = false
  }

  getPlaylists () {
    getAllPlaylistsMerged()
      .then(playlists => {
        this.dataLoaded = true
        this.setState({ playlists: playlists })
      })
      .catch(err => {
        console.log(err)
        console.log('Failed to get playlists')
      })
  }

  componentDidMount () {
    this.getPlaylists()
  }

  renderPlaylists () {
    if (this.state.playlists.count === 0 && this.dataLoaded) {
      return (
        <h4>There are no Playlists.  Someone should make one!</h4>
      )
    } else {
      return (
        <PlaylistsList playlists={this.state.playlists} />
      )
    }
  }

  render () {
    return (
      <div>
        <h2>All Playlists</h2>
        { this.renderPlaylists() }
      </div>
    )
  }

};

PlaylistsPage.contextTypes = {
  auth: React.PropTypes.object
}

export default PlaylistsPage
