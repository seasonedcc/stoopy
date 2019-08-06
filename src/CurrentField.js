import React from 'react'
import Input from 'forms/Input'
import get from 'lodash/get'
import { SelectInput, DropAvatar } from './default/Inputs'

// Get correct component and field type from field.type provided
export const parseType = (field, fields) => {
  const list = {
    select: { Component: SelectInput, type: fields.select },
    // checkbox: { Component: CheckboxComponent, type: fields.checkbox },
    // radio: { Component: RadioComponent, type: 'radio' },
    // datetime: {Component: DateTimeComponent, type: 'checkbox'} ,
    avatar: {
      Component: DropAvatar,
      type: fields.raw,
      customConfig: {
        onChange: file => file.url,
      },
    },
    // images: { Component: ImagesComponent, type: 'raw' },
    // files: { Component: FilesComponent, type: 'raw' },
  }

  const fallback = {
    Component: Input,
    type: get(fields, field.type, fields.text),
  }

  const { Component, type, customConfig } = get(list, field.type, fallback)
  return { Component: field.Component || Component, type, customConfig }
}

export default ({ field, fields, formState }) => {
  if (!field) {
    return <p>Acabaram os forms</p>
  }
  const { Component, type, customConfig } = parseType(field, fields)

  return (
    <Component
      {...type({
        name: field.name,
        ...customConfig,
      })}
      {...field.props}
      label={field.label}
      setValue={value => {
        formState.setField(field.name, value)
      }}
      formState={formState}
    />
  )
}
