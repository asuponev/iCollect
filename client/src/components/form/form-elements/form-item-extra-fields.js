import React from 'react';
import { useSelector } from 'react-redux';
import { Box, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { useIntl } from 'react-intl';

import FormMdEditor from './form-mdeditor';

const FormItemExtraFields = ({ extraFields, register, valuesForEdit, control, errors }) => {
  const { mode } = useSelector(state => state.options);
  const { messages } = useIntl();
  const text = messages["app.collection.form.errors"];

  return (
    <>
      {extraFields.map((element, index) => {
        return (<Box my={2} key={index}>
          {
            element.type.slice(0, -1) === 'string' ?
              <TextField
                {...register(element.type, {
                  maxLength: {
                    value: 50,
                    message: text.titlemax
                  }
                })}
                label={element.name}
                variant="outlined"
                error={!!errors[element.type]}
                helperText={errors[element.type]?.message}
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
                    <>
                      <FormMdEditor
                        name={element.type}
                        control={control}
                        errors={errors}
                        extrafield={true}
                        placeholder={element.name}
                        defaultValue={valuesForEdit[element.type] || ''}
                      />
                      <p className={`custom-error-text-${mode}`}>{errors[element.type]?.message}</p>
                    </>
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
  );
}

export default FormItemExtraFields;