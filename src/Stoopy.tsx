import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useFormState } from "react-use-form-state";
import get from "lodash/get";
import map from "lodash/map";
import head from "lodash/head";
import size from "lodash/size";
import reduce from "lodash/reduce";
import find from "lodash/find";
import omit from "lodash/omit";
import startCase from "lodash/startCase";
import filter from "lodash/filter";
import CurrentField from "./CurrentField";
import * as defaultLayout from "./default/Layout";

export const Stoopy = ({
  fields: propFields,
  initialState,
  onNext,
  onEnd,
  children,
  saving,
  onProgress,
  title,
  layout = {}
}) => {
  const [values, setValues] = useState({});
  const [formState, fields] = useFormState();

  // Refs and state for managing transitions
  // NOTE: Weird names, but probally the whole aproach will change anyways
  const [visible, setVisible] = useState(true);
  const invert = useRef(true);
  const firstRender = useRef(true);

  //  Key of first step (to disable back button)
  const firstStepKey = useRef(1);

  // Normalize shortened versions into field objects
  const normalizedFields = map(propFields, (field, index) => {
    if (typeof field === "string") {
      return {
        name: field,
        stepKey: index + 1,
        type: "text",
        label: startCase(field)
      };
    }
    return {
      type: "text",
      stepKey: index + 1,
      label: startCase(field.name),
      ...field
    };
  });

  // Include initialState values in initial state
  if (initialState && Object.keys(values).length === 0) {
    const initialValues = reduce(
      initialState,
      (result, value, key) => {
        if (find(normalizedFields, ["name", key]) && value) {
          result[key] = value;
        }
        return result;
      },
      {}
    );
    // Update key after acounting for skipped ones
    firstStepKey.current = 1 + Object.keys(initialState).length;
    setValues(initialValues);
  }

  // Filter fields, removing those already on state
  const filteredFields = filter(
    normalizedFields,
    field => !get(values, field.name)
  );

  // Set current field
  const field = head(filteredFields);

  // Progress tracking
  const progress = {
    currentStep: field && field.stepKey,
    totalSteps: size(normalizedFields)
  };

  // Action after each step back
  const onStepBack = ({ stepKey }) => () => {
    const last = find(normalizedFields, ["stepKey", stepKey - 1]);

    firstRender.current = true;
    setVisible(!visible);
    setTimeout(async () => {
      await setValues(omit(values, last.name));
    }, 900);
  };

  // Action after each step foward
  const onStepFoward = async e => {
    e.preventDefault();
    const value = {};
    value[field.name] = get(formState.values, field.name);
    onNext &&
      (await onNext({
        value: { ...value },
        values: { ...values, ...value },
        progress
      }));

    // Call onEnd if its the last step
    if (field.stepKey === propFields.length)
      onEnd && (await onEnd({ ...values, ...value }));

    // Hide field with transition
    firstRender.current = true;
    setVisible(!visible);

    // Wait for the transition before changing state
    setTimeout(async () => {
      await setValues({ ...values, ...value });
    }, 900);
  };

  // NOTE: Repetitive code, clean up.
  const FormHeader = layout.FormHeader || defaultLayout.FormHeader;
  const NextButton = layout.NextButton || defaultLayout.NextButton;
  const BackButton = layout.BackButton || defaultLayout.BackButton;
  const ProgressTracker =
    layout.ProgressTracker || defaultLayout.ProgressTracker;
  const Loading = layout.Loading || defaultLayout.Loading;

  // Updates progress when step changes
  useEffect(
    () => {
      if (onProgress) {
        onProgress(progress);
      }
    },
    [field && field.stepKey]
  );

  useLayoutEffect(
    () => {
      // Runs once, when there is a new field
      if (firstRender.current) {
        invert.current = !invert.current;
        firstRender.current = false;
      }
    },
    [field && field.name]
  );

  // NOTE: Prettier render conditionals possible?
  return saving ? (
    <Loading />
  ) : (
    <>
      {field && (
        <form key="form" onSubmit={onStepFoward}>
          <FormHeader progress={progress} title={title} />
          <CurrentField
            field={field}
            fields={fields}
            formState={formState}
            show={invert.current ? !visible : visible}
          />
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20
            }}
          >
            <BackButton
              onClick={onStepBack(field)}
              disabled={field.stepKey === firstStepKey.current}
            />
            {console.log("backb", field.stepKey, initialState)}
            <ProgressTracker progress={progress} />
            <NextButton disabled={!get(formState.validity, field.name)} />
          </div>
        </form>
      )}
      {(!field && children) || null}
    </>
  );
};

//
// RENDER PROP IMPLEMENTATION
//
// const LayoutComponent = ({
//   CurrentField,
//   backProps,
//   nextProps,
//   progress
// }) => {
//   const {
//     FormHeader,
//     BackButton,
//     NextButton,
//     ProgressTracker
//   } = defaultLayout;
//   return (
//     <>
//       <FormHeader title="Add your book in a few steps!" />
//       <CurrentField />
//       <div
//         style={{
//           display: "flex",
//           width: "100%",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginTop: 20
//         }}
//       >
//         <BackButton {...backProps} />
//         <ProgressTracker progress={progress} />
//         <NextButton />
//       </div>
//     </>
//   );
// };
