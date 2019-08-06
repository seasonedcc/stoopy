import React from 'react'
import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
  MenuItem,
  Button,
  Typography,
  Select,
  InputLabel,
} from '@material-ui/core'
import { DropPicture } from 'uploods'
import Container from 'ui/Container'

// LAYOUT COMPONENTS

// Button to next step. This should come from props, and default to basic one
// if none was provided
export const NextButton = props => {
  return (
    <div
      style={{
        marginTop: 20,
        width: '100%',
      }}
    >
      <Button type="submit" variant="contained" color="primary" {...props}>
        Next
      </Button>
    </div>
  )
}

// Form header, title, etc...
export const FormHeader = props => {
  return (
    <>
      <Typography style={{ marginBottom: 20 }} variant="h5">
        STOOPY: THE MULTISTEP FORM
      </Typography>
    </>
  )
}

// Wrapper for the whole component. Is it worth it?
export const Wrapper = props => (
  <div
    style={{
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {props.children}
  </div>
)

// Default Loading component for transitions. Not sure if will still
// be used after setting up transitions
export const Loading = props => (
  <Container textAlign="center" maxWidth="lg" {...props}>
    <CircularProgress />
  </Container>
)
