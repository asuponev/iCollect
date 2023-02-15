import React, { useContext } from 'react';
import { Avatar, Stack, Typography } from '@mui/material';

import GlobalContext from '../../../utils/context/GlobalContext';
import FormComment from '../../form/form-comment';

const ItemComments = () => {
  const { userInfo } = useContext(GlobalContext);

  const comments = [
    {
      _id: '1',
      authorfirstName: 'Sarah',
      authorlastName: 'Lynch',
      message: 'Marketing non-disclosure agreement scrum project alpha lean startup startup business plan user experience angel investor focus research & development value proposition graphical user interface investor. ',
      itemId: '1111'
    },
    {
      _id: '2',
      authorfirstName: 'Sarah',
      authorlastName: 'Lynch',
      message: 'Marketing non-disclosure agreement scrum project alpha lean startup startup business plan user experience angel investor focus research & development value proposition graphical user interface investor. ',
      itemId: '2222'
    }
  ]

  const avatarStyles = {
    background: "linear-gradient(180deg, #F43B47 0%, #453A94 100%)",
    width: 40,
    height: 40,
    fontSize: 16,
  }

  const commentsBlock = comments.map(comment => {
    return (
      <Stack
        key={comment._id}
        direction="row"
        spacing={2}
        my={3}
      >
        <Avatar sx={avatarStyles}>
          {comment.authorfirstName[0]} {comment.authorlastName[0]}
        </Avatar>
        <Stack spacing={1}>
          <Typography color="#142339" fontWeight={500}>{comment.authorfirstName} {comment.authorlastName}</Typography>
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
        <FormComment />
      </Stack>
    </Stack>
  )
}

export default ItemComments;