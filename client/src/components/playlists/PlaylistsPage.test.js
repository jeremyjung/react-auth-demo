import React from 'react'
import { mount } from 'enzyme'
import PlaylistsPage from './PlaylistsPage'
import * as playlistApi from '../../services/playlistApi'

jest.mock('../../services/playlistApi')

it('renders without crashing', () => {
  playlistApi.getAllPlaylistsMerged = jest.fn(() => {
    return new Promise((resolve) => [])
  })
  mount(<PlaylistsPage />)
})
