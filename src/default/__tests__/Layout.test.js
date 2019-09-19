import React from 'react'
import renderer from 'react-test-renderer'

import {
  Loading,
  FormHeader,
  ProgressTracker,
  BackButton,
  NextButton,
} from '../Layout'

describe('Loading', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Loading />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('FormHeader', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<FormHeader title="Foobar" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('ProgressTracker', () => {
  it('renders correctly', () => {
    const props = {
      progress: {
        currentStep: 1,
        totalStpes: 10,
      },
    }

    const tree = renderer.create(<ProgressTracker {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('BackButton', () => {
  it('renders correctly', () => {
    const props = {
      onClick: jest.fn(),
    }

    const tree = renderer.create(<BackButton {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('NextButton', () => {
  it('renders correctly', () => {
    const props = {
      onClick: jest.fn(),
    }

    const tree = renderer.create(<NextButton {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
