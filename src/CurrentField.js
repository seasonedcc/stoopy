import React from 'react'
import get from 'lodash/get'
import reduce from 'lodash/reduce'
import Animated from 'react-animated-transitions'
import './animations.css'

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
    field,
    baseOpts,
    optional,
    ...props
  },
  formState,
  show,
  enter,
  exit,
}) => {
  // Remove null/empty values to prevent falsely overwritting baseOpts
  const cleanProps = values =>
    reduce(
      values,
      (result, value, key) => {
        const obj = {}
        obj[key] = value
        return value && value !== '' ? { ...result, ...obj } : result
      },
      {},
    )

  return name ? (
    <Animated>
      <Animated items>
        {show && (
          <Animated item enter={enter} exit={exit}>
            <Component
              {...field({
                ...cleanProps({
                  name,
                  onChange,
                  onBlur,
                  validate,
                  validadeOnBlur,
                  touchOnChange,
                }),
              })}
              autoFocus
              {...props}
              value={get(formState.values, name, '')}
              error={get(formState.errors, name, '')}
              setValue={value => {
                formState.setField(name, value)
              }}
            />
          </Animated>
        )}
      </Animated>
    </Animated>
  ) : null
}
