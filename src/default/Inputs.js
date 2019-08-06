import React from 'react'
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
  InputLabel,
} from '@material-ui/core'
import { DropPicture } from 'uploods'
import Container from 'ui/Container'
import startCase from 'lodash/startCase'
import theme from 'theme'

const DateTimeInput = props => {
  return null
}

const CheckboxInput = props => {
  return null
}
const RadioInput = ({ label, setValue }) => {
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
  )
}
export const SelectInput = ({ label, options, ...props }) => {
  return (
    <FormControl style={{ minWidth: 120 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        inputProps={{ name: 'estadocivil' }}
        onChange={value => props.setValue(value.target.value)}
        value={props.formState.values.maritalStatus}
      >
        {options.map(option => (
          <MenuItem value={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export const DropAvatar = props => {
  return (
    <DropPicture
      maxDimension={200}
      config={{
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      }}
      {...props}
    />
  )
}

export const Input = ({
  children,
  disabled,
  name,
  error,
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
        marginBottom: theme.spacing(1),
      }}
    />
  )
}
