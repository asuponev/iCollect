import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Stack } from '@mui/material';

const TagsCloud = ({ tags }) => {

  const tagsView = tags.map((tag, i) => {
    return (
      <Typography key={i} sx={tagStyle} noWrap>
        <Link
          to={`/search/--tag--${tag}`}
          style={{ textDecoration: 'none' }}
        >
          {tag}
        </Link>
      </Typography>
    );
  });

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      gap={1}
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