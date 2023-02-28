import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Typography, Grid } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';

import { getSearchItems } from '../../utils/requests/requests';

import BreadCrumbs from '../../components/BreadCrumbs';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import ItemCard from '../../components/cards/item-card/item-card';
import EmptyElement from '../../components/EmptyElement';

export const SearchResult = () => {
  const { value } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [byTag, setByTag] = useState(false);

  const { messages } = useIntl();

  useEffect(() => {
    value.slice(0, 7) === '--tag--' ? setByTag(true) : setByTag(false);
  }, [value]);

  useEffect(() => {
    onRequest(value);
  }, [value]);

  const onRequest = (value) => {
    setError(null);
    setLoading(true);
    getSearchItems(value)
      .then(res => {
        setItems(res);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      })
  };

  const itemsCards = items.map(item => {
    return (
      <Grid item lg={3} md={4} sm={6} xs={12} key={item._id}>
        <ItemCard {...item} />
      </Grid>
    );
  });

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <>
      {
        items.length > 0 ? (
          <Grid container spacing={2} mt={4} mb={10}>
            {itemsCards}
          </Grid>
        ) : (
          <EmptyElement target={'search'} values={{ br: <br />, value }} />
        )
      }
    </>
  ) : null;

  return (
    <>
      <BreadCrumbs current={messages["app.search-results.breadcrumbs"]} />
      <Stack mt={4} spacing={1}>
        <Typography variant="h6" noWrap>
          {
            byTag
              ? <><FormattedMessage id="app.search-results.bytag" /> «{value.slice(7)}»</>
              : <><FormattedMessage id="app.search-results.byinput" /> «{value}»</>
          }
        </Typography>
        <Typography fontSize={14} color="#9B9EA4">
          <FormattedMessage id="app.search-results.results" /> {items.length}
        </Typography>
      </Stack>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
}