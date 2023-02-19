import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { Textarea } from '@mui/joy';

const FormComment = ({ onCreateComment, itemId }) => {
  const [message, setMessage] = useState('');

  const onFormSubmit = (event, message) => {
    event.preventDefault();
    onCreateComment(itemId, message);
    setMessage('');
  };

  return (
    <form style={{ width: "100%" }} onSubmit={(event) => onFormSubmit(event, message)}>
      <Box mb={2}>
        <Textarea
          minRows={4}
          value={message}
          onChange={event => setMessage(event.target.value)}
          sx={{ border: "1px solid #DEDFE1" }}
          placeholder="Text"
        />
      </Box>
      <Button type="submit" variant="contained">Send</Button>
    </form>
  );
}

export default FormComment;