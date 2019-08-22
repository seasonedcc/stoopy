import React from "react";
import get from "lodash/get";
import reduce from "lodash/reduce";
import Animated from "react-animated-transitions";
import { parseType } from "./fieldTypes";
import "animate.css";

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
    stepKey,
    ...props
  },
  fields,
  formState,
  show
}) => {
  if (!name) {
    return <p>That's It!</p>;
  }

  // Get base settings from field.type
  const { Component: DefaultComponent, field, baseOpts } = parseType(
    type,
    fields
  );

  const FieldComponent = Component || DefaultComponent;

  // Remove null/empty values to prevent false overwritting baseOpts
  const cleanProps = obj =>
    reduce(
      obj,
      (result, value, key) => {
        const obj = {};
        obj[key] = value;
        return value && value !== "" ? { ...result, ...obj } : result;
      },
      {}
    );
  return (
    <Animated>
      <Animated items>
        {show && (
          <Animated item enter="fadeInLeft" exit="fadeOutRight">
            <FieldComponent
              {...field({
                ...baseOpts,
                ...cleanProps({
                  name,
                  onChange,
                  onBlur,
                  validate,
                  validadeOnBlur,
                  touchOnChange
                })
              })}
              {...props}
              value={get(formState.values, name, "")}
              setValue={value => {
                formState.setField(name, value);
              }}
            />
          </Animated>
        )}
      </Animated>
    </Animated>
  );
};
