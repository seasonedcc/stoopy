import React from 'react'
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  RadioGroup,
  FormLabel,
  Radio,
  MenuItem,
  Select,
  TextField,
  Checkbox,
  InputLabel,
} from '@material-ui/core'
import startCase from 'lodash/startCase'

export const CheckboxInput = ({
  label,
  choices,
  value,
  onChange,
  topLabel,
  setValue,
  ...props
}) => {
  return (
    <FormControl component="fieldset">
      {topLabel && <FormLabel component="legend">{topLabel}</FormLabel>}
      <FormGroup {...props}>
        <FormControlLabel
          control={
            <Checkbox checked={!!value} onChange={onChange} value="true" />
          }
          label={label}
        />
      </FormGroup>
    </FormControl>
  )
}

// What to do about booleans in values transformed to string?
export const RadioInput = ({ label, choices, setValue, ...props }) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup {...props}>
        {choices.map(choice => {
          const opts =
            typeof choice === 'object'
              ? choice
              : {
                  label: choice,
                  value: choice,
                }
          return (
            <FormControlLabel key={opts.value} control={<Radio />} {...opts} />
          )
        })}
      </RadioGroup>
    </FormControl>
  )
}
export const SelectInput = ({ label, value, choices, setValue }) => {
  return (
    <FormControl style={{ minWidth: 120 }}>
      <InputLabel>{label}</InputLabel>
      <Select onChange={event => setValue(event.target.value)} value={value}>
        {choices.map(choice => (
          <MenuItem key={choice} value={choice}>
            {choice}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export const Input = ({
  disabled,
  name,
  error,
  setValue,
  helper = ' ',
  label = startCase(name),
  placeholder = label,
  ...props
}) => {
  const helperText = error || helper
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
        marginBottom: 10,
      }}
    />
  )
}
