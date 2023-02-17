import { Box, TextField, FormControlLabel, Checkbox } from '@mui/material';

const FormItemExtraFields = ({ extraFields, register, valuesForEdit }) => {
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
                defaultValue={valuesForEdit[element.type] || ''}
              />
              : element.type.slice(0, -1) === 'checkbox' ?
                <FormControlLabel
                  label={element.name}
                  control={
                    <Checkbox
                      {...register(element.type)}
                      defaultChecked={valuesForEdit[element.type] || false}
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
                    defaultValue={valuesForEdit[element.type] || null}
                  />
                  :
                  element.type.slice(0, -1) === 'text' ?
                    <TextField
                      {...register(element.type)}
                      label={element.name}
                      variant="outlined"
                      fullWidth
                      defaultValue={valuesForEdit[element.type] || ''}
                    />
                    :
                    element.type.slice(0, -1) === 'date' ?
                      <TextField
                        type="date"
                        {...register(element.type)}
                        label={element.name}
                        variant="outlined"
                        fullWidth
                        defaultValue={valuesForEdit[element.type] || ''}
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