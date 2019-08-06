import React from "react";
import get from "lodash/get";
import { SelectInput, RadioInput, DropAvatar, Input } from "./default/Inputs";

// Get correct component and field type from field.type provided
export const parseType = (field, fields) => {
  const list = {
    select: {
      Component: SelectInput,
      type: fields.select,
      customConfig: {
        onChange: form => form.target.value
      }
    },
    // checkbox: { Component: CheckboxComponent, type: fields.checkbox },
    radio: {
      Component: RadioInput,
      type: fields.radio,
      customConfig: {
        onChange: form => form.target.value
      }
    },
    // datetime: {Component: DateTimeComponent, type: 'checkbox'} ,
    avatar: {
      Component: DropAvatar,
      type: fields.raw,
      customConfig: {
        onChange: file => file.url
      }
    }
    // images: { Component: ImagesComponent, type: 'raw' },
    // files: { Component: FilesComponent, type: 'raw' },
  };

  const fallback = {
    Component: Input,
    type: get(fields, field.type, fields.text)
  };

  const { Component, type, customConfig } = get(list, field.type, fallback);
  return { Component: field.Component || Component, type, customConfig };
};

export default ({ field, fields, formState }) => {
  if (!field) {
    return <p>Acabaram os forms</p>;
  }
  const { Component, type, customConfig } = parseType(field, fields);
  console.log("formsTAte", formState);
  return (
    <Component
      {...type({
        name: field.name,
        ...customConfig
      })}
      {...field.props}
      label={field.label}
      value={formState.values.onSale}
      formState={formState}
      setValue={value => {
        formState.setField(field.name, value);
      }}
    />
  );
};
