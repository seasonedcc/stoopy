import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useFormState } from 'react-use-form-state'
import get from 'lodash/get'
import map from 'lodash/map'
import head from 'lodash/head'
import size from 'lodash/size'
import reduce from 'lodash/reduce'
import find from 'lodash/find'
import omit from 'lodash/omit'
import startCase from 'lodash/startCase'
import filter from 'lodash/filter'
import debounce from 'lodash/debounce'

import CurrentField from './CurrentField'
import * as defaultLayout from './default/Layout'
import parseType from './fieldTypes'

const DEBOUNCING_TIME = 2000

const Stoopy = ({
  fields: propFields,
  initialState,
  onNext,
  onEnd,
  children,
  saving,
  onProgress,
  title,
  layout = {},
}) => {
  const [values, setValues] = useState({})
  const [formState, fields] = useFormState()

  // Refs and state for managing transitions
  // NOTE: Perhaps too complex implementation
  const [visible, setVisible] = useState(true)
  const [animations, setAnimations] = useState({})
  const invert = useRef(true)
  const firstRender = useRef(true)
  const fowardAnimation = { enter: 'fadeInRight', exit: 'fadeOutLeft' }
  const backAnimation = { enter: 'fadeInLeft', exit: 'fadeOutRight' }

  //  Key of first step (to disable back button)
  const firstStepKey = useRef(1)

  // Normalize shortened versions into field objects and parse type defaults
  const normalizedFields = map(propFields, (field, index) => {
    const defaultOpts = parseType(field.type, fields)
    if (typeof field === 'string') {
      return {
        name: field,
        stepKey: index + 1,
        type: 'text',
        label: startCase(field),
        validate: value => value.length > 0,
        ...defaultOpts,
      }
    }
    return {
      type: 'text',
      stepKey: index + 1,
      label: startCase(field.name),
      optional: defaultOpts.optional || undefined,
      ...defaultOpts,
      ...field,
    }
  })

  // Include initialState values in initial state
  if (initialState && Object.keys(values).length === 0) {
    const initialValues = reduce(
      initialState,
      (result, value, key) => {
        if (find(normalizedFields, ['name', key]) && value) {
          result[key] = value
        }
        return result
      },
      {},
    )
    // Update key after acounting for skipped ones
    firstStepKey.current = 1 + Object.keys(initialState).length
    setValues(initialValues)
  }

  // Filter fields, removing those already on state
  const filteredFields = filter(normalizedFields, field => {
    return get(values, field.name) === undefined
  })

  // Set current field
  const field = head(filteredFields)

  // Progress tracking
  const progress = {
    currentStep: field && field.stepKey,
    totalSteps: size(normalizedFields),
  }

  // Action after each step back
  const onStepBack = ({ stepKey }) =>
    debounce(
      async () => {
        const last = find(normalizedFields, ['stepKey', stepKey - 1])

        // hide field with transitions
        await setAnimations(backAnimation)
        firstRender.current = true
        setVisible(!visible)

        await setValues(omit(values, last.name))
      },
      DEBOUNCING_TIME,
      {
        leading: true,
        trailing: false,
      },
    )

  // Action after each step foward
  const onStepFoward = debounce(
    async e => {
      e.preventDefault()
      const value = {}
      value[field.name] = get(formState.values, field.name)
      onNext &&
        (await onNext({
          value: { ...value },
          values: { ...values, ...value },
          progress,
        }))

      // Call onEnd if its the last step
      if (field.stepKey === propFields.length)
        onEnd && (await onEnd({ ...values, ...value }))

      // Hide field with transition
      await setAnimations(fowardAnimation)
      firstRender.current = true
      setVisible(!visible)

      // Wait for the transition before changing state
      await setValues({ ...values, ...value })
    },
    DEBOUNCING_TIME,
    {
      leading: true,
      trailing: false,
    },
  )

  // NOTE: Repetitive code, clean up.
  const FormHeader = layout.FormHeader || defaultLayout.FormHeader
  const NextButton = layout.NextButton || defaultLayout.NextButton
  const BackButton = layout.BackButton || defaultLayout.BackButton
  const ProgressTracker =
    layout.ProgressTracker || defaultLayout.ProgressTracker
  const Loading = layout.Loading || defaultLayout.Loading

  //  Destructuring properties to avoid errors if field is undefined
  const { stepKey, name, optional } = field

  // Updates progress when step changes
  useEffect(
    () => {
      if (onProgress) {
        onProgress(progress)
      }
    },
    // eslint-disable-next-line
    [stepKey],
  )

  useLayoutEffect(() => {
    // Runs once, when there is a new field. Shows field.
    if (firstRender.current) {
      invert.current = !invert.current
      firstRender.current = false
    }
  }, [name])

  // NOTE: Prettier render conditionals possible?
  return saving ? (
    <Loading />
  ) : (
    <>
      {field && (
        <form key="form" onSubmit={onStepFoward}>
          <FormHeader progress={progress} title={title} />
          <CurrentField
            {...animations}
            field={field}
            fields={fields}
            formState={formState}
            show={invert.current ? !visible : visible}
          />
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <BackButton
              onClick={onStepBack(field)}
              disabled={field.stepKey === firstStepKey.current}
            />
            <ProgressTracker progress={progress} />
            {console.log('formState', formState)}
            {console.log('opt', optional)}
            <NextButton
              disabled={!(optional || get(formState.validity, name))}
            />
          </div>
        </form>
      )}
      {(!field && children) || null}
    </>
  )
}

export default Stoopy
