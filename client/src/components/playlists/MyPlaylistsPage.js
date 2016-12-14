import React, { Component } from 'react'
import { getAllPlaylistsForUserMerged } from '../../services/playlistApi'
import PlaylistsList from './PlaylistsList'

class MyPlaylistsPage extends Component {

  constructor () {
    super()

    this.state = {
      playlists: []
    }

    this.dataLoaded = false
  }

  getMyPlaylists () {
    getAllPlaylistsForUserMerged(this.context.auth.username)
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
    this.getMyPlaylists()
  }

  renderPlaylists () {
    if (this.state.playlists.length === 0 && this.dataLoaded) {
      return (
        <h4>You don't have any playlists.  You should make one!</h4>
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
        <h2>My Playlists</h2>
        { this.renderPlaylists() }
      </div>
    )
  }

};

MyPlaylistsPage.contextTypes = {
  auth: React.PropTypes.object
}

export default MyPlaylistsPage
