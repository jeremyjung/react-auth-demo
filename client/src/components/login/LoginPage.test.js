import React from 'react'
import { mount } from 'enzyme'
import LoginPage from './LoginPage'

it('renders without crashing', () => {
  const context = { auth: {
    loggedIn: false
  }}
  mount(<LoginPage location={jest.fn()} />, { context })
  // Comment out this test, need to mock local storage
  // const div = document.createElement('div');
  // ReactDOM.render(<App />, div);
})
