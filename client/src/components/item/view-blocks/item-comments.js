import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Stack, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { createComment, getAllItemComment } from '../../../utils/requests/requests';
import GlobalContext from '../../../utils/context/GlobalContext';
import FormComment from '../../form/form-comment';
import ErrorMessage from '../../ErrorMessage';
import Spinner from '../../Spinner';

const ItemComments = ({ itemId }) => {
  const { userInfo } = useContext(GlobalContext);
  const [commentsData, setCommentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    onRequestComment(itemId);
  }, [itemId]);

  const onRequestComment = (itemId) => {
    setError(null);
    setLoading(true);
    getAllItemComment(itemId)
      .then(res => {
        setCommentData(res);
        setLoading(false);
      }).catch(error => {
        setLoading(false);
        setError(error.message);
      })
  };

  const onCreateComment = (itemId, message) => {
    createComment(itemId, message)
      .then(res => {
        setCommentData([...commentsData, res]);
      })
      .catch(error => {
        console.log(error);
      })
  };

  const avatarStyles = {
    background: "linear-gradient(180deg, #F43B47 0%, #453A94 100%)",
    width: 40,
    height: 40,
    fontSize: 16,
  };

  const commentsBlock = commentsData.map(comment => {
    return (
      <Stack key={comment._id} direction="row" spacing={2} my={3}>
        <Link to={`/users/${comment.authorId}`} style={{ textDecoration: 'none' }}>
          <Avatar sx={avatarStyles}>
            {comment.firstName[0]}{comment.lastName[0]}
          </Avatar>
        </Link>
        <Grid container wrap="nowrap" direction="column" width="calc(100% - 56px)">
          <Typography color="#142339" fontWeight={500} noWrap>
            <Link to={`/users/${comment.authorId}`} style={{ textDecoration: 'none' }}>
              {comment.firstName} {comment.lastName}
            </Link>
          </Typography>
          <Typography color="#585E67" sx={{ wordWrap: "break-word" }}>
            {comment.message}
          </Typography>
        </Grid>
      </Stack>
    )
  });

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <Stack>
      <Typography variant="h6" gutterBottom>
        <FormattedMessage id="app.item.comments" />
      </Typography>
      {commentsBlock}
      <Stack direction="row" spacing={1} mt={3}>
        <Avatar sx={avatarStyles}>
          {userInfo.firstName[0]}{userInfo.lastName[0]}
        </Avatar>
        <FormComment onCreateComment={onCreateComment} itemId={itemId} />
      </Stack>
    </Stack>
  ) : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
}

export default ItemComments;