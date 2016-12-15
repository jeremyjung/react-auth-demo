import React from 'react'
import { mount } from 'enzyme'
import App from './App'

it('renders without crashing', () => {
  mount(<App />)
  // Comment out this test, need to mock local storage
  // const div = document.createElement('div');
  // ReactDOM.render(<App />, div);
})
