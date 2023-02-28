import React from 'react';
import { Stack, Grid, Avatar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import CustomizeMui from '../../utils/theme/customizeMui';

const Comment = ({ comment }) => {
  const { avatarStyles } = CustomizeMui();

  return (
    <Stack direction="row" spacing={2} my={3}>
      <Link to={`/users/${comment.authorId}`} style={{ textDecoration: 'none' }}>
        <Avatar sx={avatarStyles}>
          {comment.firstName[0]}{comment.lastName[0]}
        </Avatar>
      </Link>
      <Grid container wrap="nowrap" direction="column" width="calc(100% - 56px)">
        <Typography fontWeight={500} noWrap>
          <Link to={`/users/${comment.authorId}`} style={{ textDecoration: 'none' }}>
            {comment.firstName} {comment.lastName}
          </Link>
        </Typography>
        <Typography color="text.secondary" sx={{ wordWrap: "break-word" }}>
          {comment.message}
        </Typography>
      </Grid>
    </Stack>
  );
}

export default Comment;