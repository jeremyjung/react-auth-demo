import { getHttp, patchHttp } from '../helpers/http'
import { getGames } from './gameApi'
import { getUsers } from './userApi'

const _mergePlaylistData = (games, playlists, users) => {
  return playlists.map(playlist => {
    playlist.user = users.find(user => user.id === playlist.user)
    playlist.games = playlist.games.map(gameId => games.find(game => game.id === gameId))
    return playlist
  })
}

const getAllPlaylistsForUser = (username) => {
  return getUsers().then(users => {
    const user = users.find(user => user.username === username)
    if (user) return getHttp(`/playlists?user=${user.id}`)
    else return Promise.resolve([])
  })
}

const getAllPlaylists = () => {
  return getHttp('/playlists')
}

export const getAllPlaylistsMerged = () => {
  return Promise
    .all([getGames(), getAllPlaylists(), getUsers()])
    .then(responses => {
      const [games, playlists, users] = responses
      return _mergePlaylistData(games, playlists, users)
    })
}

export const getAllPlaylistsForUserMerged = (userId) => {
  return Promise
    .all([getGames(), getAllPlaylistsForUser(userId), getUsers()])
    .then(responses => {
      const [games, playlists, users] = responses
      return _mergePlaylistData(games, playlists, users)
    })
}

export const getPlaylist = (playlistId) => {
  return getHttp(`/playlists/${playlistId}`)
}

export const addGameToPlaylist = (playlistId, gameId) => {
  return getHttp(`/playlists/${playlistId}`)
    .then(playlist => {
      const games = playlist.games
      games.push(gameId)
      return patchHttp(`playlist`, { games: games })
    })
}

export const deleteGameFromPlaylist = (playlistId, gameId) => {
  return getHttp(`/playlists/${playlistId}`)
    .then(playlist => {
      const games = playlist.games.filter(game => game.id !== gameId)
      return patchHttp(`playlist`, { games: games })
    })
}

