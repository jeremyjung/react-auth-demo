import { getHttp, postHttp, patchHttp, deleteHttp } from '../helpers/http'

export const getGames = () => {
  return getHttp('/games')
}

export const addGame = (game) => {
  return postHttp('/games', game)
}

export const updateGame = (updatedGame) => {
  return patchHttp(`/games/${updatedGame.id}`, updatedGame)
}

export const deleteGame = (gameToDelete) => {
  return deleteHttp(`/games/${gameToDelete.id}`)
}
