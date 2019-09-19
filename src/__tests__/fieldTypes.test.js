import parseType from '../fieldTypes'

jest.mock('../default/Inputs', () => ({
  SelectInput: 'select',
  CheckboxInput: 'checkbox',
  RadioInput: 'radio',
  Input: 'input',
}))

const fields = {
  raw: 'raw',
  text: 'text',
  radio: 'radio',
  checkbox: 'checkbox',
  select: 'select',
}

describe('when type is text', () => {
  it('returns input component and field.text', () => {
    expect(parseType('text', fields)).toEqual(
      expect.objectContaining({
        Component: 'input',
        field: 'text',
      }),
    )
  })
})

describe('when type is list', () => {
  it('returns input component and field.text', () => {
    expect(parseType('list', fields)).toEqual(
      expect.objectContaining({
        Component: 'input',
        field: 'text',
      }),
    )
  })
})

describe('when type is select', () => {
  it('returns select component and field', () => {
    expect(parseType('select', fields)).toEqual(
      expect.objectContaining({
        Component: 'select',
        field: 'select',
      }),
    )
  })
})

describe('when type is checkbox', () => {
  it('returns checkbox component and field', () => {
    expect(parseType('checkbox', fields)).toEqual(
      expect.objectContaining({
        Component: 'checkbox',
        field: 'checkbox',
        optional: true,
      }),
    )
  })
})

describe('when type is radio', () => {
  it('returns tadio component and field', () => {
    expect(parseType('radio', fields)).toEqual(
      expect.objectContaining({
        Component: 'radio',
        field: 'radio',
      }),
    )
  })
})
//
// describe('when type is date', () => {
//   it('returns dateInput component and field.raw', () => {
//     expect(parseType('date', fields)).toEqual(
//       expect.objectContaining({
//         Component: 'dateInput',
//         field: 'raw',
//       }),
//     )
//   })
// })
//
// describe('when type is year', () => {
//   it('returns yearInput component and field.raw', () => {
//     expect(parseType('year', fields)).toEqual(
//       expect.objectContaining({
//         Component: 'yearInput',
//         field: 'raw',
//       }),
//     )
//   })
// })
//
// describe('when type is yearMonth', () => {
//   it('returns monthYearInput component and field.raw', () => {
//     expect(parseType('yearMonth', fields)).toEqual(
//       expect.objectContaining({
//         Component: 'monthYearInput',
//         field: 'raw',
//       }),
//     )
//   })
// })
//
// describe('when type is avatar', () => {
//   it('returns dropAvatar component and field.raw', () => {
//     expect(parseType('avatar', fields)).toEqual(
//       expect.objectContaining({
//         Component: 'dropAvatar',
//         field: 'raw',
//       }),
//     )
//   })
// })
