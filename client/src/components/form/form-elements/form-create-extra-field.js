import React from 'react';
import { Box, TextField, MenuItem, IconButton, Button } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import extraFieldsTypes from '../../../utils/constants/extra-fields-types';

const FormCreateExtraField = ({ extraFields, setExtraFields }) => {

  const handleChange = (i, e) => {
    let newExtraField = [...extraFields];
    newExtraField[i][e.target.name] = e.target.value;
    setExtraFields(newExtraField);
  }

  const addExtraFields = () => {
    setExtraFields([...extraFields, { name: '', type: '' }]);
  }

  const removeExtraFields = (i) => {
    let newExtraField = [...extraFields];
    newExtraField.splice(i, 1);
    setExtraFields(newExtraField);
  }

  return (
    <>
      {extraFields.map((element, index) => (
        <Box 
          my={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={1} key={index}
        >
          <TextField
            name="name"
            label="Name extra field"
            variant="outlined"
            value={element.name || ""}
            onChange={e => handleChange(index, e)}
            sx={{ width: 150 }}
          />
          <TextField
            select
            name="type"
            label="Select type"
            value={element.type || ""}
            onChange={e => handleChange(index, e)}
            sx={{ width: 130 }}
          >
            {extraFieldsTypes.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <IconButton
            size="small"
            onClick={() => removeExtraFields(index)}
            sx={{ width: 35, height: 35 }}
          >
            <RemoveIcon sx={{ width: 20, height: 20 }}/>
          </IconButton>
        </Box>
      ))
      }
      <Button onClick={() => addExtraFields()}>Add extra field for items</Button>
    </>
  )
}

export default FormCreateExtraField;