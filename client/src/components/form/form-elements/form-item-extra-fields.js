import { Box, TextField, FormControlLabel, Checkbox } from '@mui/material';

const FormItemExtraFields = ({ extraFields, register }) => {
  return (
    <>
      {extraFields.map((element, index) => {
        return (<Box my={2} key={index}>
          {
            element.type.slice(0, -1) === 'string' ?
              <TextField
                {...register(element.type)}
                label={element.name}
                variant="outlined"
                fullWidth
              />
              : element.type.slice(0, -1) === 'checkbox' ?
                <FormControlLabel
                  label={element.name}
                  control={
                    <Checkbox
                      {...register(element.type)}
                    />
                  }
                />
                :
                element.type.slice(0, -1) === 'number' ?
                  <TextField
                    type="number"
                    {...register(element.type)}
                    label={element.name}
                    variant="outlined"
                    fullWidth
                  />
                  :
                  element.type.slice(0, -1) === 'text' ?
                    <TextField
                      {...register(element.type)}
                      label={element.name}
                      variant="outlined"
                      fullWidth
                    />
                    :
                    element.type.slice(0, -1) === 'date' ?
                      <TextField
                        type="date"
                        {...register(element.type)}
                        label={element.name}
                        variant="outlined"
                        fullWidth
                      />
                      : null
          }
        </Box>
        )
      })}
    </>
  )
}

export default FormItemExtraFields;