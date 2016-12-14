import * as gameApi from './gameApi'

// This was a big gotcha, it seems jest does not reset data between tests
// http://stackoverflow.com/questions/28387152/is-there-a-faster-way-to-reset-a-mock-when-testing-with-jest

beforeEach(() => {
  gameApi.loadDummyData()
})

it('gets list of games', () => {
  return gameApi.getGames().then((games) => {
    expect(games.length).toEqual(3)
  })
})

it('can add game', () => {
  return gameApi.addGame({ name: 'The Perfect Stride' }).then(() => {
    return gameApi.getGames()
  }).then((games) => {
    expect(games.length).toEqual(4)
  })
})

it('can delete game', () => {
  return gameApi.deleteGame(1).then(() => {
    return gameApi.getGames()
  }).then((games) => {
    expect(games.length).toEqual(2)
  })
})

it('can update game', () => {
  return gameApi.updateGame({ id: 2, name: 'Senko no Ronde' }).then(() => {
    return gameApi.getGames()
  }).then((games) => {
    const game = games.find(game => game.id === 2)
    expect(game.name).toEqual('Senko no Ronde')
  })
})
