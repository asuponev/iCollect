import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Box, Button, useTheme } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';

const FormComment = ({ onCreateComment, itemId }) => {
  const [message, setMessage] = useState('');
  const theme = useTheme();
  const intl = useIntl();

  const onFormSubmit = (event, message) => {
    event.preventDefault();
    onCreateComment(itemId, message);
    setMessage('');
  };

  return (
    <form style={{ width: "100%" }} onSubmit={(event) => onFormSubmit(event, message)}>
      <Box mb={2}>
        <TextareaAutosize
          minRows={7}
          value={message}
          onChange={event => setMessage(event.target.value)}
          placeholder={intl.messages["app.item.comments.placeholder"]}
          required
          style={{ 
            width: "100%", 
            resize: "none", 
            padding: "8px 12px", 
            border: `1px solid ${theme.palette.borders.comment}`, 
            borderRadius: 8,
            color: theme.palette.text.main,
            backgroundColor: theme.palette.background.card 
          }}
        />
      </Box>
      <Button type="submit" variant="contained">
        <FormattedMessage id="app.item.comments.send" />
      </Button>
    </form>
  );
}

export default FormComment;