import React, { useEffect, useState } from "react";

import { useFormState } from "react-use-form-state";
import get from "lodash/get";
import map from "lodash/map";
import reduce from "lodash/reduce";
import head from "lodash/head";
import startCase from "lodash/startCase";
import filter from "lodash/filter";
import CurrentField from "./CurrentField";
import * as defaultLayout from "./default/Layout";
import { CSSTransition } from 'react-transition-group';

import './Stoopy.css'

const Component = ({
  fields: propFields,
  target,
  onNext,
  children,
  saving,
  components = {},
  ...props
}) => {
  const [formState, fields] = useFormState();

  // Normalize shortened versions into field objects
  const normalizeFields = fields =>
    map(fields, field => {
      if (typeof field === "string") {
        return { name: field, type: "text", label: startCase(field) };
      }
      return { type: "text", label: startCase(field.name), ...field };
    });

  // Filter fields, removing those already on target
  const filteredFields = filter(
    normalizeFields(propFields),
    field => !get(target, field.name)
  );

  // Set current field
  const field = head(filteredFields);

  // Remove empty values from form state. Please find better name
  const filteredOutput = reduce(
    formState.values,
    (result, value, key) => {
      const obj = {};
      obj[key] = value;
      return value !== "" ? { ...result, ...obj } : result;
    },
    {}
  );

  useEffect(
    () => {
      if (field) {
        formState.clearField(field.name);
      }
    },
    // eslint-disable-next-line
    [propFields]
  );

  // NOTE: Repetitive code, clean up.
  const FormHeader = components.FormHeader || defaultLayout.FormHeader;
  const NextButton = components.NextButton || defaultLayout.NextButton;
  const Loading = components.Loading || defaultLayout.Loading;

  const [transition, setTransition] = useState(true)

  return saving ? (
    <Loading />
  ) : (
    <>
      {field && (
        <form
          key="form"
          onSubmit={e => {
            e.preventDefault();
            // setLoading(true)
            // onNext(filteredOutput);
          }}
        >
          <FormHeader />

          <CSSTransition
            in={transition}
            timeout={200}
            classNames="my-node"
            unmountOnExit
            onExited={() => setTransition(true)}
        >
          
          <CurrentField key={field} field={field} fields={fields} formState={formState} />
          </CSSTransition> 
          <NextButton onClick={async () => {
            await setTransition(false)
            setTimeout(() => {
              onNext(filteredOutput)
            }, 200)
          }} />
        </form>
      )}
      {!field && children}
    </>
  );
};

// This is a workaround to a weird bug being investigated. Perhaps use React.memo?
export const Stoopy = props => {
  const Wrapper =
    (props.components && props.components.Wrapper) || defaultLayout.Wrapper;
  return (
    <Wrapper>
      <Component {...props} />
    </Wrapper>
  );
};
