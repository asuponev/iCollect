import React from 'react';
import { useSelector } from 'react-redux';
import { useIntl, FormattedMessage } from 'react-intl';
import { Box, TextField, MenuItem, Tooltip, IconButton, Button } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';

import extraFieldsTypes from '../../../utils/constants/extra-fields-types';

const FormCreateExtraField = ({ extraFields, setExtraFields, toast }) => {
  const { lang } = useSelector(state => state.options);
  const { messages } = useIntl();
  const text = messages["app.collection.form"];

  const handleChangeName = (i, e) => {
    let newExtraField = [...extraFields];
    newExtraField[i][e.target.name] = e.target.value;
    setExtraFields(newExtraField);
  };

  // TO DO: FUNCTION REFACTORING
  const handleChangeType = (i, e) => {
    const selectedTypes = extraFields.map(field => field.type)
    let newExtraField = [...extraFields];
    newExtraField[i][e.target.name] = e.target.value;
    if (!selectedTypes[0]) {
      newExtraField[i].type = `${newExtraField[i].type}1`;
      setExtraFields(newExtraField);
    } else {
      if (selectedTypes.includes(`${newExtraField[i].type}1`)
        && selectedTypes.includes(`${newExtraField[i].type}2`)
        && selectedTypes.includes(`${newExtraField[i].type}3`)) {
        toast.info(text.extrafields, { position: 'top-right' });
        return
      } else if (selectedTypes.includes(`${newExtraField[i].type}1`)
        && selectedTypes.includes(`${newExtraField[i].type}2`)) {
        newExtraField[i].type = `${newExtraField[i].type}3`;
        setExtraFields(newExtraField);
      } else if (selectedTypes.includes(`${newExtraField[i].type}2`)
        && selectedTypes.includes(`${newExtraField[i].type}3`)) {
        newExtraField[i].type = `${newExtraField[i].type}1`;
        setExtraFields(newExtraField);
      } else if (selectedTypes.includes(`${newExtraField[i].type}1`)
        && selectedTypes.includes(`${newExtraField[i].type})3`)) {
        newExtraField[i].type = `${newExtraField[i].type}2`;
        setExtraFields(newExtraField);
      } else if (selectedTypes.includes(`${newExtraField[i].type}1`)) {
        newExtraField[i].type = `${newExtraField[i].type}2`;
        setExtraFields(newExtraField);
      } else if (selectedTypes.includes(`${newExtraField[i].type}2`)) {
        newExtraField[i].type = `${newExtraField[i].type}1`;
        setExtraFields(newExtraField);
      } else {
        newExtraField[i].type = `${newExtraField[i].type}1`;
        setExtraFields(newExtraField);
      }
    }
  }

  const addExtraFields = () => {
    setExtraFields([...extraFields, { name: '', type: '' }]);
  };

  const removeExtraFields = (i) => {
    let newExtraFields = [...extraFields];
    newExtraFields.splice(i, 1);
    setExtraFields(newExtraFields);
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
            select
            name="type"
            label={text.extraselect}
            value={element.type.slice(0, -1) || ""}
            onChange={e => handleChangeType(index, e)}
            sx={{ width: "40%" }}
          >
            {extraFieldsTypes[lang].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="name"
            label={text.extraname}
            variant="outlined"
            value={element.name || ""}
            onChange={e => handleChangeName(index, e)}
            sx={{ width: "50%" }}
          />
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