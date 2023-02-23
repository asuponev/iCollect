import React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { Box, TextField, MenuItem, Tooltip, IconButton, Button } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';

import extraFieldsTypes from '../../../utils/constants/extra-fields-types';

const FormCreateExtraField = ({ extraFields, setExtraFields }) => {
  const { messages } = useIntl();
  const text = messages["app.collection.form"];

  const handleChange = (i, e) => {
    let newExtraField = [...extraFields];
    newExtraField[i][e.target.name] = e.target.value;
    setExtraFields(newExtraField);
  };

  const addExtraFields = () => {
    setExtraFields([...extraFields, { name: '', type: '' }]);
  };

  const removeExtraFields = (i) => {
    let newExtraField = [...extraFields];
    newExtraField.splice(i, 1);
    setExtraFields(newExtraField);
  };

  return (
    <>
      {extraFields.map((element, index) => (
        <Box
          my={2}
          display="flex"
          alignItems="center"
          gap={1} key={index}
        >
          <TextField
            name="name"
            label={text.extraname}
            variant="outlined"
            value={element.name || ""}
            onChange={e => handleChange(index, e)}
            sx={{ width: "50%" }}
          />
          <TextField
            select
            name="type"
            label={text.extraselect}
            value={element.type || ""}
            onChange={e => handleChange(index, e)}
            sx={{ width: "40%" }}
          >
            {extraFieldsTypes.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Tooltip title={text.extraremove} placement="top">
            <IconButton
              size="small"
              onClick={() => removeExtraFields(index)}
              sx={{ width: 35, height: 35 }}
            >
              <RemoveIcon sx={{ width: 20, height: 20 }} />
            </IconButton>
          </Tooltip>
        </Box>
      ))
      }
      <Button onClick={() => addExtraFields()}>
        <FormattedMessage id="app.collection.form.addextra" />
      </Button>
    </>
  );
}

export default FormCreateExtraField;