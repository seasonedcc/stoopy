import React from "react";
import {
  CircularProgress,
  FormControl,
  Box,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
  MenuItem,
  Button,
  Typography,
  Select,
  InputLabel,
  Container
} from "@material-ui/core";

// LAYOUT COMPONENTS

// Button to next step. This should come from props, and default to basic one
// if none was provided

const justifyContent = ({ children, maxWidth = "sm", ...props }) => (
  <Container maxWidth={maxWidth}>
    <Box mb={2} {...props}>
      {children}
    </Box>
  </Container>
);

export const NextButton = props => {
  return (
    <div>
      <Button type="submit" variant="contained" color="primary" {...props}>
        Next
      </Button>
    </div>
  );
};

export const BackButton = props => {
  return (
    <div>
      <Button type="button" variant="contained" color="secondary" {...props}>
        Back
      </Button>
    </div>
  );
};

export const ProgressTracker = ({ progress }) => {
  return (
    <div style={{ marginTop: 10 }}>
      <Typography variant="h5">
        {progress.currentStep}/{progress.totalSteps}
      </Typography>
    </div>
  );
};
// Form header, title, etc...
export const FormHeader = ({
  title = "Almost there! Just a few more steps..."
}) => {
  return (
    <Typography style={{ marginBottom: 20 }} variant="h5">
      {title}
    </Typography>
  );
};

// Default Loading component for transitions. Not sure if will still
// be used after setting up transitions
export const Loading = props => (
  <div textAlign="center" maxWidth="lg" {...props}>
    <CircularProgress />
  </div>
);
