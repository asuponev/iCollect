import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { Textarea } from '@mui/joy';

const FormComment = () => {
  const [value, setValue] = useState('');

  return (
    <form style={{ width: "100%" }}>
      <Box mb={2}>
        <Textarea
          minRows={4}
          value={value}
          onChange={event => setValue(event.target.value)}
          sx={{ border: "1px solid #DEDFE1" }}
          placeholder="Text"
        />
      </Box>
      <Button type="submit" variant="contained">Send</Button>
    </form>
  );
}

export default FormComment;