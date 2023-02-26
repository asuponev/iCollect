import React, { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import Pusher from 'pusher-js';
import { ToastContainer, toast } from 'react-toastify';

import { createComment, getAllItemComment } from '../../../utils/requests/requests';

import ErrorMessage from '../../../components/ErrorMessage';
import Spinner from '../../../components/Spinner';
import Comment from '../../../components/comment/comment';
import FormComment from '../../../components/form/form-comment';

const ItemComments = ({ itemId }) => {
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

    return (() => pusher.unsubscribe(process.env.REACT_APP_pusher_channel));
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

  const commentsBlock = commentsData.map(comment => {
    return <Comment key={comment._id} comment={comment} />
  });

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <Stack spacing={4}>
      <ToastContainer />
      <Typography variant="h6" gutterBottom>
        <FormattedMessage id="app.item.comments" />
      </Typography>
      {commentsBlock}
      <FormComment onCreateComment={onCreateComment} itemId={itemId} />
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