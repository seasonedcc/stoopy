import get from 'lodash/get'
import { SelectInput, CheckboxInput, RadioInput, Input } from './default/Inputs'

const parseType = (type, fields) => {
  const list = {
    text: {
      Component: Input,
      field: fields.text,
      validate: value => value.length > 0,
    },
    select: {
      Component: SelectInput,
      field: fields.select,
      onChange: e => e.target.value,
    },
    checkbox: {
      Component: CheckboxInput,
      field: fields.checkbox,
      optional: true,
      onChange: e => e.target.value,
    },
    radio: {
      Component: RadioInput,
      field: fields.radio,
      onChange: e => e.target.value,
    },
  }

  return get(list, type, {
    Component: Input,
    field: get(fields, type, fields.text),
  })
}

export default parseType
