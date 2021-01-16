import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  TextField,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

const ShortQA = (props) => {
  const { problem } = props;
  const classes = useStyles();

  const [value, setValue] = useState("");

  const handleSubmit = () => {};
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{problem.statement}</FormLabel>
        <TextField
          id="answer_field"
          label="Input Here"
          multiline
          fullWidth
          value={value}
          onChange={handleChange}
          variant="filled"
          style={{
            margin: 8,
          }}
        />
        <FormHelperText>helper text tbd</FormHelperText>
      </FormControl>
    </form>
  );
};

export default ShortQA;