import React from 'react'
import renderer from 'react-test-renderer'
import Stoopy from '../Stoopy'

it('renders correctly', () => {
  const props = { foo: 'bar' }
  const tree = renderer
    .create(<Stoopy {...props} fields={['test', 'test2']} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
