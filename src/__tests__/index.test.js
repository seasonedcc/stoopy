import React from 'react'

import { Stoopy } from '..'

jest.mock('../Stoopy', () => props => <div {...props}>Foobar</div>)

it('exports correctly', () => {
  expect(Stoopy).not.toBeUndefined()
})
