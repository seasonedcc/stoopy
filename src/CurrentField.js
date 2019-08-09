import React from "react";
import get from "lodash/get";
import {
  SelectInput,
  CheckboxInput,
  RadioInput,
  DropAvatar,
  DateInput,
  YearInput,
  MonthYearInput,
  TimeInput,
  Input
} from "./default/Inputs";
import reduce from "lodash/reduce";

// Get correct component and field type from type provided
export const parseType = (type, fields) => {
  const list = {
    select: {
      Component: SelectInput,
      field: fields.select,
      baseOpts: {
        onChange: e => e.target.value
      }
    },
    checkbox: {
      Component: CheckboxInput,
      field: fields.checkbox,
      baseOpts: {
        onChange: e => e.target.value
      }
    },
    radio: {
      Component: RadioInput,
      field: fields.radio,
      baseOpts: {
        onChange: e => e.target.value
      }
    },
    // TODO: Finish/improve DateTime related fields
    date: {
      Component: DateInput,
      field: fields.raw,
      baseOpts: {
        // NOTE: Erase time?
        onChange: dateTime => dateTime.toUTC().toString()
      }
    },
    year: {
      Component: YearInput,
      field: fields.raw,
      baseOpts: {
        onChange: dateTime => {
          return dateTime.c.year;
        }
      }
    },
    yearMonth: {
      Component: MonthYearInput,
      field: fields.raw,
      baseOpts: {
        // NOTE: Erase time?
        onChange: dateTime => dateTime.toUTC().toString()
      }
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
        onChange: file => file.url
      }
    }
    // images: { Component: ImagesComponent, field: 'raw' },
    // files: { Component: FilesComponent, field: 'raw' },
  };

  return get(list, type, {
    Component: Input,
    field: get(fields, type, fields.text)
  });
};

export default ({
  field: {
    name,
    type,
    onChange,
    onBlur,
    validate,
    validadeOnBlur,
    touchOnChange,
    Component,
    ...props
  },
  fields,
  formState
}) => {
  if (!name) {
    return <p>That's It!</p>;
  }

  const { Component: DefaultComponent, field, baseOpts } = parseType(
    type,
    fields
  );

  const FieldComponent = Component || DefaultComponent;
  const filteredOutput = obj =>
    reduce(
      obj,
      (result, value, key) => {
        const obj = {};
        obj[key] = value;
        return value && value !== "" ? { ...result, ...obj } : result;
      },
      {}
    );

  console.log("aa", formState);

  return (
    <FieldComponent
      {...field({
        ...baseOpts,
        ...filteredOutput({
          name,
          onChange,
          onBlur,
          validate,
          validadeOnBlur,
          touchOnChange
        })
      })}
      {...props}
      value={get(formState.values, name, null)}
      setValue={value => {
        formState.setField(name, value);
      }}
      formState={formState}
    />
  );
};
