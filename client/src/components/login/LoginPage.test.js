import React from 'react'
import { mount } from 'enzyme'
import LoginPage from './LoginPage'

it('renders without crashing', () => {
  const context = { auth: {
    loggedIn: false
  }}
  mount(<LoginPage location={jest.fn()} />, { context })
})
