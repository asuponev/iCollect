import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Stack } from '@mui/material';

const TagsCloud = ({ tags }) => {

  const tagsView = tags.map((tag, i) => {
    return (
      <Link 
        to={`/search/--tag--${tag}`} key={i} style={{ textDecoration: 'none' }}>
        <Box sx={tagStyle}>{tag}</Box>
      </Link>
    );
  });

  return (
    <Stack
      direction="row"
      justifyContent="center"
      flexWrap="wrap"
      gap={1}
      maxWidth={800}
    >
      {tagsView}
    </Stack>
  );
}

export default TagsCloud;

const tagStyle = {
  color: "#797E85",
  backgroundColor: "#EEEFF0",
  borderRadius: "100px",
  padding: "10px 18px",
  "&:hover": {
    color: "#142339",
    backgroundColor: "#DEDFE1",
  }
};