import React from 'react'
import { mount } from 'enzyme'
import GamesPage from './GamesPage'
import * as gameApi from '../../services/gameApi'

jest.mock('../../services/gameApi')

it('renders without crashing', () => {
  const context = { auth: {
    loggedIn: false
  }}

  gameApi.getGames = jest.fn(() => {
    return new Promise((resolve) => [])
  })

  mount(<GamesPage location={jest.fn()} />, { context })
  // Comment out this test, need to mock local storage
  // const div = document.createElement('div');
  // ReactDOM.render(<App />, div);
})
