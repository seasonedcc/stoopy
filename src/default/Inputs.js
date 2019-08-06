import React from "react";
import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
  MenuItem,
  Select,
  TextField,
  Checkbox,
  InputLabel
} from "@material-ui/core";
import { DropPicture } from "uploods";
import startCase from "lodash/startCase";

const DateTimeInput = props => {
  return null;
};

const CheckboxInput = props => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup name="" value={null} handleChange={null}>
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
        <FormControlLabel
          value="disabled"
          disabled
          control={<Radio />}
          label="(Disabled option)"
        />
      </RadioGroup>
    </FormControl>
  );
};

// What to do about booleans?
export const RadioInput = ({ label, choices, ...props }) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup {...props}>
        {choices.map(choice => {
          const opts =
            typeof choice === "object"
              ? choice
              : {
                  label: choice,
                  value: choice
                };
          return <FormControlLabel control={<Radio />} {...opts} />;
        })}
      </RadioGroup>
    </FormControl>
  );
};
export const SelectInput = ({ label, value, choices, ...props }) => {
  return (
    <FormControl style={{ minWidth: 120 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        onChange={value => props.setValue(value.target.value)}
        value={value}
      >
        {choices.map(choice => (
          <MenuItem value={choice}>{choice}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const DropAvatar = props => {
  return (
    <DropPicture
      maxDimension={200}
      config={{
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
      }}
      {...props}
    />
  );
};

export const Input = ({
  children,
  disabled,
  name,
  error,
  helper = " ",
  label = startCase(name),
  placeholder = label,
  ...props
}) => {
  const helperText = error || helper;
  return (
    <TextField
      {...props}
      name={name}
      id={name}
      label={label}
      placeholder={placeholder}
      fullWidth
      error={!!error}
      helperText={helperText}
      disabled={disabled}
      style={{
        marginBottom: 10
      }}
    />
  );
};
