import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useFormState } from "react-use-form-state";
import get from "lodash/get";
import map from "lodash/map";
import head from "lodash/head";
import size from "lodash/size";
import find from "lodash/find";
import omit from "lodash/omit";
import startCase from "lodash/startCase";
import filter from "lodash/filter";
import CurrentField from "./CurrentField";
import * as defaultLayout from "./default/Layout";

export const Stoopy = ({
  fields: propFields,
  target,
  onNext,
  onEnd,
  children,
  saving,
  progressHandler,
  title,
  layout = {}
}) => {
  const [values, setValues] = useState({});
  const [visible, setVisible] = useState(true);
  const invert = useRef(true);
  const firstRender = useRef(true);

  const [formState, fields] = useFormState();

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

  // Filter fields, removing those already on target/state
  const filteredFields = filter(
    normalizedFields,
    field => !get(values, field.name)
  );

  // Set current field
  const field = head(filteredFields);

  // Progress
  const progress = {
    currentStep: field && field.stepKey,
    totalSteps: size(normalizedFields)
  };

  // Back functionalities
  const goBack = ({ stepKey }) => () => {
    const last = find(normalizedFields, ["stepKey", stepKey - 1]);
    setValues(omit(values, last.name));
  };

  // NOTE: Repetitive code, clean up.
  const FormHeader = layout.FormHeader || defaultLayout.FormHeader;
  const NextButton = layout.NextButton || defaultLayout.NextButton;
  const BackButton = layout.BackButton || defaultLayout.BackButton;
  const ProgressTracker =
    layout.ProgressTracker || defaultLayout.ProgressTracker;
  const Loading = layout.Loading || defaultLayout.Loading;

  useEffect(
    () => {
      if (progressHandler) {
        progressHandler(progress);
      }
    },
    [field && field.stepKey]
  );

  useLayoutEffect(
    () => {
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
        <form
          key="form"
          onSubmit={async e => {
            e.preventDefault();
            const value = {};
            value[field.name] = get(formState.values, field.name);
            onNext &&
              (await onNext({
                value: { ...value },
                values: { ...values, ...value },
                progress
              }));

            // Call onEnd if is the last field
            if (field.stepKey === propFields.length)
              onEnd && (await onEnd({ ...values, ...value }));

            firstRender.current = true;
            setVisible(!visible);
            setTimeout(async () => {
              await setValues({ ...values, ...value });
            }, 900);
          }}
        >
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
            <BackButton onClick={goBack(field)} />
            <ProgressTracker progress={progress} />
            <NextButton />
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
