import React from 'react'
import renderer from 'react-test-renderer'
import { NextButton } from '../Layout'

it('renders correctly', () => {
  const props = { foo: 'bar' }
  const tree = renderer.create(<NextButton {...props} />).toJSON()
  expect(tree).toMatchSnapshot()
})
