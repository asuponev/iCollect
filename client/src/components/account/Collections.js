import React, { useState, useEffect } from 'react';
import { Stack, Typography, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import { getAllCollectionsUser } from '../../utils/requests/requests';
import CreateCollection from './account-collections/create-collection';

const Collections = ({ id }) => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    onRequestGetCollection(id);
    // eslint-disable-next-line
  }, [id])

  const onRequestGetCollection = (id) => {
    setError(null);
    setLoading(true);
    getAllCollectionsUser(id)
      .then(res => {
        setCollections(res);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      })
  }

  const cards = collections.map(collection => {
    return (
      <CollectionCard
        key={collection._id}
        {...collection}
      />
    )
  })

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <>
      {cards}
    </>
  ) : null;

  return (
    <Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight="500">Collections</Typography>
        <CreateCollection id={id} onRequestGetCollection={onRequestGetCollection}/>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        sx={{ flexWrap: "wrap", rowGap: "24px", columnGap: "16px" }}
        mb={6}
      >
        {errorMessage}
        {spinner}
        {content}
      </Stack>
    </Stack>
  )
}

const CollectionCard = ({ subject, title, description, coverUrl, count }) => {
  return (
    <Card
      sx={{
        width: 336,
        border: "1px solid #F9F9F9",
        boxShadow: "2px 2px 16px rgba(0, 0, 0, 0.08)",
        borderRadius: "8px",
      }}
    >
      <CardMedia
        sx={{ height: 160 }}
        image={coverUrl}
        title={title}
      />
      <CardContent sx={{ padding: "16px 16px 0" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" color="text.secondary">
          <Typography variant="overline" lineHeight="18px">{subject}</Typography>
          <Typography variant="caption">{count} items</Typography>
        </Stack>
        <Typography gutterBottom variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
      </CardContent>
      <CardActions sx={{ padding: 2, alignItems: "center" }}>
        <EditOutlinedIcon fontSize="small" sx={{ color: "#1E70EB" }} />
        <DeleteOutlinedIcon fontSize="small" sx={{ color: "#F43B47" }} />
      </CardActions>
    </Card>
  )
}

export default Collections;