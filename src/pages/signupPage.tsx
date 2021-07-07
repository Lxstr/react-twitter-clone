import React, { useRef } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";

// from https://emailregex.com/
// used at (4) for pattern based validation to make sure we are getting an email
const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const useStyles = makeStyles((theme) => ({
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export const SignUpPage = () => {
  const classes = useStyles();

  // (1) add useForm() and take what we need
  const { register, handleSubmit, watch, errors } = useForm();

  // (2) use `watch()` to track the value in the pw field
  const password = watch("password");

  const onSubmit = () => {
    alert(`signed up!`);
  };

  return (
    <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
      <div>
        <TextField
          //(3) We register the input element, giving `register()` to ref of the input.
          name="email"
          inputRef={register({
            required: "You must provide an email",
            pattern: emailRegex,
          })} // (4) declare what validation the field needs.
          // (5) Show validation errors to users via `errors` object
          error={errors.email}
          helperText={errors?.email?.message}
          label="Email"
          type="email"
          autoComplete="email"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          name="password"
          inputRef={register({
            required: "You must specify a password",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
          error={errors.password}
          helperText={errors?.password?.message}
          label="Password"
          type="password"
          autoComplete="new-password"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          name="passwordConfirm"
          inputRef={register({
            validate: (value) =>
              value === password || "The passwords do not match",
          })}
          error={errors.passwordConfirm}
          helperText={errors?.passwordConfirm?.message}
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          variant="outlined"
        />
      </div>

      <Button type="submit" onClick={handleSubmit(onSubmit)}>
        Sign up
      </Button>
    </form>
  );
};
