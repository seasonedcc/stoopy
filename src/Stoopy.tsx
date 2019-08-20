import React, { useEffect, useState } from "react";

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
import { CSSTransition } from "react-transition-group";

import "./Stoopy.css";

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
  const [transition, setTransition] = useState(true);
  const [values, setValues] = useState({});
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
        console.log("chamou");
      }
    },
    [field && field.stepKey]
  );

  const LayoutComponent = ({
    CurrentField,
    backProps,
    nextProps,
    progress
  }) => {
    const {
      FormHeader,
      BackButton,
      NextButton,
      ProgressTracker
    } = defaultLayout;
    return (
      <>
        <FormHeader title="Add your book in a few steps!" />
        <CurrentField />
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20
          }}
        >
          <BackButton {...backProps} />
          <ProgressTracker progress={progress} />
          <NextButton />
        </div>
      </>
    );
  };

  // se layout é uma funcao, eu passo tudo pra ele. Tudo o que?
  // CurrentField, progress, nextProps and backProps,

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
            await setTransition(false);
            setTimeout(async () => {
              const value = {};
              value[field.name] = get(formState.values, field.name);
              setValues({ ...values, ...value });
              onNext &&
                (await onNext({
                  value: { ...value },
                  values: { ...values, ...value },
                  progress
                }));

              // Call onEnd if is the last field
              if (field.stepKey === propFields.length)
                onEnd && (await onEnd({ ...values, ...value }));
            }, 400);
          }}
        >
          <FormHeader progress={progress} title={title} />
          <CSSTransition
            in={transition}
            timeout={300}
            classNames="my-node"
            unmountOnExit
            onExited={() => setTransition(true)}
          >
            <CurrentField field={field} fields={fields} formState={formState} />
          </CSSTransition>

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
