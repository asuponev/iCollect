import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Stack, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import Pusher from 'pusher-js';
import { ToastContainer, toast } from 'react-toastify';

import { createComment, getAllItemComment } from '../../../utils/requests/requests';
import GlobalContext from '../../../utils/context/GlobalContext';

import ErrorMessage from '../../../components/ErrorMessage';
import Spinner from '../../../components/Spinner';
import FormComment from '../../../components/form/form-comment';

const ItemComments = ({ itemId }) => {
  const { userInfo } = useContext(GlobalContext);
  const [commentsData, setCommentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { messages } = useIntl();
  const texterror = messages["app.item.comments.senderror"];

  useEffect(() => {
    const pusher = new Pusher(process.env.REACT_APP_pusher_key, {
      cluster: process.env.REACT_APP_pusher_cluster,
      encrypted: true
    });
    const channel = pusher.subscribe(process.env.REACT_APP_pusher_channel);
    channel.bind('new_comment', comment => {
      setCommentData(prevData => [...prevData, comment]);
    });

    return (() => {
      pusher.unsubscribe('icollect-comments')
    });
  }, []);

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
      .then()
      .catch(error => {
        console.log(error);
        toast.error(texterror, { position: 'top-right' });
      })
  };

  const avatarStyles = {
    background: "linear-gradient(180deg, #F43B47 0%, #453A94 100%)",
    width: 40,
    height: 40,
    fontSize: 16,
    color: "#FFFFFF"
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
      <ToastContainer />
      {errorMessage}
      {spinner}
      {content}
    </>
  );
}

export default ItemComments;