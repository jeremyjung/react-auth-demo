// Inspiration for this component from: https://github.com/ReactTraining/react-router/issues/4293
// Allows you to pass props component that will be rendered by Match
import React from 'react'
import { Match } from 'react-router'

const MatchWithProps = ({ props, component: Component, ...rest }) => (
  <Match {...rest} render={(matchProps) => (
    <Component {...matchProps} {...props} />
  )} />
)

export default MatchWithProps
