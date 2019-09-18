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
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { DropPicture } from 'uploods'
import startCase from 'lodash/startCase'
import LuxonUtils from '@date-io/luxon'
import { DateTime } from 'luxon'

export const YearInput = props => {
  return <DateInput views={['year']} {...props} />
}
export const MonthYearInput = props => {
  return <DateInput views={['month', 'year']} {...props} />
}

export const TimeInput = () => {
  return null
}

export const DateInput = ({ label, value, onChange, views }) => {
  const normalizedValue =
    value === '' ? DateTime.local() : DateTime.fromISO(value)
  return (
    <MuiPickersUtilsProvider utils={LuxonUtils}>
      <DatePicker
        views={views}
        label={label}
        autoOk
        onChange={onChange}
        value={normalizedValue}
      />
    </MuiPickersUtilsProvider>
  )
}

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

export const DropAvatar = ({ setValue, ...props }) => {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <DropPicture maxDimension={200} {...props} />
    </div>
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
