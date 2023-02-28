import React, { useState, useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Box, Button, Stack, Avatar } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import GlobalContext from '../../utils/context/GlobalContext';
import CustomizeMui from '../../utils/theme/customizeMui';

const FormComment = ({ onCreateComment, itemId }) => {
  const { userInfo } = useContext(GlobalContext);
  const [message, setMessage] = useState('');
  const intl = useIntl();
  const { avatarStyles, textareaCommentStyles } = CustomizeMui();

  const onFormSubmit = (event, message) => {
    event.preventDefault();
    onCreateComment(itemId, message);
    setMessage('');
  };

  return (
    <Stack direction="row" spacing={1} mt={3}>
      <Avatar sx={avatarStyles}>
        {userInfo.firstName[0]}{userInfo.lastName[0]}
      </Avatar>
      <form style={{ width: "100%" }} onSubmit={(event) => onFormSubmit(event, message)}>
        <Box mb={1}>
          <TextareaAutosize
            minRows={7}
            value={message}
            onChange={event => setMessage(event.target.value)}
            placeholder={intl.messages["app.item.comments.placeholder"]}
            required
            style={textareaCommentStyles}
          />
        </Box>
        <Button type="submit" variant="contained">
          <FormattedMessage id="app.item.comments.send" />
        </Button>
      </form>
    </Stack>
  );
}

export default FormComment;