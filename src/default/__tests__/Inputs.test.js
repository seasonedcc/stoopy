import React from 'react'
import renderer from 'react-test-renderer'

import {
  Input,
  DropAvatar,
  SelectInput,
  RadioInput,
  CheckboxInput,
  YearInput,
  MonthYearInput,
  TimeInput,
} from '../Inputs'

jest.mock('uploods', () => ({
  DropPicture: props => <div {...props}>DropPicture</div>,
}))

describe('Input', () => {
  it('renders correctly', () => {
    const props = {
      name: 'foobar',
      error: 'foobarError',
      disabled: false,
      setValue: jest.fn(),
      helper: ' ',
    }
    const tree = renderer.create(<Input {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('DropAvatar', () => {
  it('renders correctly', () => {
    const props = {
      setValue: jest.fn(),
    }
    const tree = renderer.create(<DropAvatar {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('SelectInput', () => {
  it('renders correctly', () => {
    const props = {
      label: 'Foobar',
      value: '',
      choices: ['foobar', 'foo', 'bar'],
      setValue: jest.fn(),
    }
    const tree = renderer.create(<SelectInput {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('RadioInput', () => {
  it('renders correctly', () => {
    const props = {
      label: 'Foobar',
      choices: ['foobar', 'foo', 'bar'],
      setValue: jest.fn(),
    }
    const tree = renderer.create(<RadioInput {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('CheckboxInput', () => {
  it('renders correctly', () => {
    const props = {
      label: 'Foobar',
      choices: ['foobar', 'foo', 'bar'],
      setValue: jest.fn(),
      value: '',
      onChange: jest.fn(),
      topLabel: 'foobar',
    }
    const tree = renderer.create(<CheckboxInput {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('YearInput', () => {
  it('renders correctly', () => {
    const props = {
      label: 'Foobar',
      value: '',
      onChange: jest.fn(),
    }
    const tree = renderer.create(<YearInput {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('YearInput', () => {
  it('renders correctly', () => {
    const props = {
      label: 'Foobar',
      value: '',
      onChange: jest.fn(),
    }
    const tree = renderer.create(<YearInput {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('MonthYearInput', () => {
  it('renders correctly', () => {
    const props = {
      label: 'Foobar',
      value: '',
      onChange: jest.fn(),
    }
    const tree = renderer.create(<MonthYearInput {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('TimeInput', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TimeInput />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
