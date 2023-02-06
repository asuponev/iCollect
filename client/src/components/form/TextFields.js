import { TextField } from '@mui/material';

export const FieldFirstName = ({ register, errors }) => {
  return (
    <TextField
      {...register("firstName", {
        required: "First name is required",
        minLength: {
          value: 2,
          message: "Min length is 2"
        },
        maxLength: {
          value: 50,
          message: "Max length is 50"
        }
      })}
      label="First name"
      variant="outlined"
      error={!!errors.firstName}
      helperText={errors.firstName && `${errors.firstName.message}`}
    />
  )
}

export const FieldLastName = ({ register, errors }) => {
  return (
    <TextField
      {...register("lastName", {
        required: "Last name is required",
        minLength: {
          value: 2,
          message: "Min length is 2"
        },
        maxLength: {
          value: 50,
          message: "Max length is 50"
        }
      })}
      label="Last name"
      variant="outlined"
      error={!!errors.lastName}
      helperText={errors.lastName && `${errors.lastName.message}`}
    />
  )
}

export const FieldEmail = ({ register, errors }) => {
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

export const FieldPassword = ({ register, errors }) => {
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
