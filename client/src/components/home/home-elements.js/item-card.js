import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Stack, Typography, Card, CardContent, CardActionArea } from '@mui/material';
import { getOneCollection, getOneUser } from '../../../utils/requests/requests';
import ItemTags from '../../item/view-blocks/item-tags';

const ItemCard = ({ _id, title, tags, collectionId }) => {
  let navigate = useNavigate();
  const [collectionData, setCollectionData] = useState({});
  const [authorInfo, setAuthorInfo] = useState({});

  useEffect(() => {
    onCollectionRequest(collectionId);
  }, [collectionId]);

  useEffect(() => {
    if (collectionData.authorId) {
      onUserInfoRequest(collectionData.authorId);
    }
  }, [collectionData.authorId]);

  const onCollectionRequest = (collectionId) => {
    getOneCollection(collectionId)
      .then(res => {
        setCollectionData(res);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const onUserInfoRequest = (userId) => {
    getOneUser(userId)
      .then(res => {
        setAuthorInfo(res);
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <Card
      sx={{
        width: 336,
        boxShadow: "2px 2px 16px rgba(0, 0, 0, 0.08)",
        borderRadius: "8px",
      }}
    >
      <CardActionArea onClick={() => navigate(`/collections/${collectionId}/items/${_id}`)}>
        <CardContent>
          <Stack spacing={1}>
            <Typography fontSize={10} color="#9B9EA4">ID {_id}</Typography>
            <Typography fontSize={16} color="#142339" fontWeight={700}>{title}</Typography>
            <ItemTags tags={tags} />
            <Stack direction="row" spacing={1} sx={{ color: "#797E85" }}>
              <Typography variant="overline">{collectionData.title}</Typography>
              <Typography variant="overline">—</Typography>
              <Typography variant="overline">by {authorInfo.firstName} {authorInfo.lastName}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ItemCard;