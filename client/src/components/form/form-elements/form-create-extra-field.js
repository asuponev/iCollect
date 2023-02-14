import { Box, TextField, MenuItem, IconButton, Button } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';

const FormCreateExtraField = ({ extraFields, setExtraFields }) => {

  const handleChange = (i, e) => {
    let newExtraField = [...extraFields];
    newExtraField[i][e.target.name] = e.target.value;
    setExtraFields(newExtraField);
  }

  const addExtraFields = () => {
    setExtraFields([...extraFields, { name: '', type: '' }])
  }

  const removeExtraFields = (i) => {
    let newExtraField = [...extraFields];
    newExtraField.splice(i, 1);
    setExtraFields(newExtraField);
  }

  const optionsExtraFields = ['number1', 'number2', 'number3', 'string1', 'string2', 'string3', 'text1', 'text2', 'text3', 'date1', 'date2', 'date3', 'checkbox1', 'checkbox2', 'checkbox3'];

  return (
    <>
      {extraFields.map((element, index) => (
        <Box my={2} display="flex" justifyContent="flex-start" gap={1} key={index}>
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
            {optionsExtraFields.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          {
            index ?
              <IconButton
                aria-label="remove"
                size="small"
                onClick={() => removeExtraFields(index)}
              >
                <RemoveIcon sx={{ width: 20, height: 20 }} />
              </IconButton> : null
          }
        </Box>
      ))
      }
      <Button onClick={() => addExtraFields()}>Add extra field for items</Button>
    </>
  )
}

export default FormCreateExtraField;