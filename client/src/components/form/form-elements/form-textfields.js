import { TextField } from '@mui/material';

export const FormTextField = ({ name, label, register, errors }) => {
  const validValue = name === 'title' ? 20 : 50;

  return (
    <TextField
      {...register(name, {
        required: `${label} is required`,
        minLength: {
          value: 2,
          message: "Min length is 2"
        },
        maxLength: {
          value: {validValue},
          message: `Max length is ${validValue}`
        }
      })}
      label={label}
      variant="outlined"
      error={!!errors[name]}
      helperText={errors[name]?.message}
      fullWidth
    />
  )
}

export const FormEmailField = ({ register, errors }) => {
  return (
    <TextField
      {...register("email", {
        required: "Email is required",
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: "Value not match email format"
        }
      })}
      type="email"
      label="Email"
      variant="outlined"
      error={!!errors.email}
      helperText={errors.email && `${errors.email.message}`}
    />
  )
}

export const FormPswField = ({ register, errors }) => {
  return (
    <TextField
      {...register("password", {
        required: "Password is required",
        minLength: {
          value: 5,
          message: "Min length is 5"
        }
      })}
      type="password"
      label="Password"
      variant="outlined"
      error={!!errors.password}
      helperText={errors.password && `${errors.password.message}`}
    />
  )
}

export const FieldDescription = ({ name, label, register, errors }) => {
  return (
    <TextField
      {...register(name, {
        required: `${label} is required`,
        minLength: {
          value: 5,
          message: "Min length is 5"
        }
      })}
      label={label}
      variant="outlined"
      error={!!errors[name]}
      helperText={errors[name]?.message}
      fullWidth
    />
  )
}
