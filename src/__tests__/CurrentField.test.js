import React from 'react'
import renderer from 'react-test-renderer'

import CurrentField from '../CurrentField'

jest.mock('react-animated-transitions', () => props => (
  <div {...props}>Animated</div>
))

it('renders correctly', () => {
  const props = {
    field: {
      name: 'foobar',
      type: 'text',
      onChange: jest.fn(),
      onBlur: jest.fn(),
      validate: jest.fn(),
      validadeOnBlur: false,
      touchOnChange: false,
      Component: p => <div {...p}>Component</div>,
      stepKey: 1,
      field: jest.fn(),
      baseOpts: {},
      optional: false,
    },
    formState: {
      set: jest.fn(),
    },
    show: true,
    enter: 'fadeInLeft',
    exit: 'fadeInRight',
  }
  const tree = renderer.create(<CurrentField {...props} />).toJSON()
  expect(tree).toMatchSnapshot()
})
