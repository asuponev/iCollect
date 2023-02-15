import React, { useContext, useState } from 'react';
import { Avatar, Stack, Typography } from '@mui/material';

import { createComment } from '../../../utils/requests/requests';
import GlobalContext from '../../../utils/context/GlobalContext';
import FormComment from '../../form/form-comment';

const ItemComments = ({ itemId }) => {
  const { userInfo } = useContext(GlobalContext);
  const [commentsData, setCommentData] = useState([]);

  const onCreateComment = (itemId, message) => {
    createComment(itemId, message)
      .then(res => {
        setCommentData([...commentsData, res]);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const avatarStyles = {
    background: "linear-gradient(180deg, #F43B47 0%, #453A94 100%)",
    width: 40,
    height: 40,
    fontSize: 16,
  }

  const commentsBlock = commentsData.map(comment => {
    return (
      <Stack
        key={comment._id}
        direction="row"
        spacing={2}
        my={3}
      >
        <Avatar sx={avatarStyles}>
          {comment.firstName[0]} {comment.lastName[0]}
        </Avatar>
        <Stack spacing={1}>
          <Typography color="#142339" fontWeight={500}>{comment.firstName} {comment.lastName}</Typography>
          <Typography color="#585E67">{comment.message}</Typography>
        </Stack>
      </Stack>
    )
  })

  return (
    <Stack>
      <Typography variant="h6" gutterBottom>Comments</Typography>
      {commentsBlock}
      <Stack direction="row" spacing={1} mt={3} mb={10}>
        <Avatar sx={avatarStyles}>
          {userInfo.firstName[0]} {userInfo.lastName[0]}
        </Avatar>
        <FormComment onCreateComment={onCreateComment} itemId={itemId}/>
      </Stack>
    </Stack>
  )
}

export default ItemComments;