import get from 'lodash/get'
import {
  SelectInput,
  CheckboxInput,
  RadioInput,
  DropAvatar,
  DateInput,
  YearInput,
  MonthYearInput,
  Input,
} from './default/Inputs'

// Get correct component and field type from type provided
const parseType = (type, fields) => {
  const list = {
    text: {
      baseOpts: {
        validate: e => {
          console.log(e)
          return e.length > 0
        },
      },
    },
    select: {
      Component: SelectInput,
      field: fields.select,
      baseOpts: {
        onChange: e => e.target.value,
      },
    },
    checkbox: {
      Component: CheckboxInput,
      field: fields.checkbox,
      optional: true,
      baseOpts: {
        onChange: e => e.target.value,
      },
    },
    radio: {
      Component: RadioInput,
      field: fields.radio,
      baseOpts: {
        onChange: e => e.target.value,
      },
    },
    // TODO: Finish/improve DateTime related fields
    date: {
      Component: DateInput,
      field: fields.raw,
      baseOpts: {
        // NOTE: Erase time?
        onChange: dateTime => dateTime.toUTC().toString(),
      },
    },
    year: {
      Component: YearInput,
      field: fields.raw,
      baseOpts: {
        onChange: dateTime => {
          return dateTime.c.year
        },
      },
    },
    yearMonth: {
      Component: MonthYearInput,
      field: fields.raw,
      baseOpts: {
        // NOTE: Erase time?
        onChange: dateTime => dateTime.toUTC().toString(),
      },
    },
    // time: {
    //   Component: TimeInput,
    //   field: fields.raw,
    //   baseOpts: {
    //     onChange: dateTime => dateTime.toUTC().toString()
    //   }
    // },
    avatar: {
      Component: DropAvatar,
      field: fields.raw,
      baseOpts: {
        onChange: file => file.url,
      },
    },
    // images: { Component: ImagesComponent, field: 'raw' },
    // files: { Component: FilesComponent, field: 'raw' },
  }

  return get(list, type, {
    Component: Input,
    field: get(fields, type, fields.text),
  })
}

export default parseType
