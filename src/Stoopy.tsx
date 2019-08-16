import React, { useEffect, useState } from 'react'

import { useFormState } from 'react-use-form-state'
import get from 'lodash/get'
import map from 'lodash/map'
import head from 'lodash/head'
import size from 'lodash/size'
import find from 'lodash/find'
import omit from 'lodash/omit'
import startCase from 'lodash/startCase'
import filter from 'lodash/filter'
import CurrentField from './CurrentField'
import * as defaultLayout from './default/Layout'
import { CSSTransition } from 'react-transition-group';

import './Stoopy.css'

export default ({
  fields: propFields,
  target,
  onNext,
  onEnd,
  children,
  saving,
  progress: progressHandler,
  title,
  components = {},
  ...props
}) => {
  const [values, setValues] = useState({})
  const [formState, fields] = useFormState()

  // Normalize shortened versions into field objects
  const normalizeFields = fields =>
    map(fields, (field, index) => {
      if (typeof field === 'string') {
        return {
          name: field,
          stepKey: index + 1,
          type: 'text',
          label: startCase(field),
        }
      }
      return {
        type: 'text',
        stepKey: index + 1,
        label: startCase(field.name),
        ...field,
      }
    })

  // Filter fields, removing those already on target/state
  const filteredFields = filter(
    normalizeFields(propFields),
    field => !get(values, field.name),
  )

  // Set current field
  const field = head(filteredFields)

  // Progress
  const progress = {
    currentStep: field && field.stepKey,
    totalSteps: size(normalizeFields(propFields)),
  }

  if (progressHandler) {
    progressHandler(progress)
  }

  // Back functionalities
  const goBack = ({ stepKey }) => () => {
    const last = find(normalizeFields(propFields), ['stepKey', stepKey - 1])
    setValues(omit(values, last.name))
  }

  // Run function after last field is completed
  if (!field) {
    onEnd && onEnd(values)
  }

  // NOTE: Repetitive code, clean up.
  const FormHeader = components.FormHeader || defaultLayout.FormHeader
  const NextButton = components.NextButton || defaultLayout.NextButton
  const BackButton = components.BackButton || defaultLayout.BackButton
  const ProgressTracker =
    components.ProgressTracker || defaultLayout.ProgressTracker
  const Loading = components.Loading || defaultLayout.Loading

  const [transition, setTransition] = useState(true)

  return saving ? (
    <Loading />
  ) : (
    <>
      {field && (
        <form
           key="form"
          onSubmit={e => {
            e.preventDefault()
            await setTransition(false)


            setTimeout(() => {
                 // NOTE: Ugly code
            
              const value = {}
              value[field.name] = get(formState.values, field.name)
              setValues({ ...values, ...value })
              onNext &&
              onNext({
                value: { ...value },
                values: { ...values, ...value },
                progress,
              })            }, 200)
            

          }}
        >
          <FormHeader progress={progress} title={title} />
           <CSSTransition
            in={transition}
            timeout={200}
            classNames="my-node"
            unmountOnExit
            onExited={() => setTransition(true)}
        >
          <CurrentField field={field} fields={fields} formState={formState} />
                       </CSSTransition> 

          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <BackButton onClick={goBack(field)} />
            <ProgressTracker progress={progress} />
            <NextButton />
          </div>
        </form>
      )}
      {!field && children}
    </>
  )
}
