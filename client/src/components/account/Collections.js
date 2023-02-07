import { Stack, Typography, Card, CardActions, CardContent, CardMedia, Button } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const blank = [
  {
    "author": "author 1",
    "subject": "subject 1",
    "title": "title 1",
    "description": "description 1",
    "cover": "https://loremflickr.com/640/480/nature",
    "count": 16,
    "id": "1"
  },
  {
    "author": "author 2",
    "subject": "subject 2",
    "title": "title 2",
    "description": "description 2",
    "cover": "https://loremflickr.com/640/480/nature",
    "count": 7,
    "id": "2"
  },
  {
    "author": "author 3",
    "subject": "subject 3",
    "title": "title 3",
    "description": "description 3",
    "cover": "https://loremflickr.com/640/480/nature",
    "count": 43,
    "id": "3"
  },
]

const Collections = () => {

  const cards = blank.map(collection => {
    return (
      <CollectionCard
        key={collection.id}
        {...collection}
      />
    )
  })

  return (
    <Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight="500">Collections</Typography>
        <Button variant="contained">+ Add Collection</Button>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ flexWrap: "wrap", rowGap: "24px", columnGap: "16px" }}
      >
        {cards}
      </Stack>
    </Stack>
  )
}

const CollectionCard = ({ subject, title, description, cover, count }) => {
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
        image={cover}
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