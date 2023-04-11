import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import { Stack } from '@mui/material';
import CsvDownloadButton from 'react-json-to-csv';

import { getTags } from '../../../store/action-creators/tags';
import { useGetAllCollectionItemsQuery } from '../../../store/api/items.api';

import Spinner from '../../../components/Spinner';
import ErrorMessage from '../../../components/ErrorMessage';
import CreateItem from '../../../components/modals/create-item';
import TableItems from '../../../components/tables/collection-table/collection-table-items';
import CollectionTools from '../../../components/tables/collection-table/collection-tools';
import EmptyElement from '../../../components/EmptyElement';
import './btn-csv-style.scss';

const Items = ({ collectionId }) => {
  const { isLoading, data, isError, error } = useGetAllCollectionItemsQuery(collectionId);
  const dispatch = useDispatch();
  const { status, userInfo } = useSelector(state => state.auth);
  const { collection } = useSelector(state => state.collection);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    dispatch(getTags());
    // eslint-disable-next-line
  }, []);

  const authorId = collection.authorId?._id;

  if (isLoading) {
    return <Spinner />;
  };

  if (isError) {
    return <ErrorMessage error={error.error} />;
  };

  return (
    <>
      <ToastContainer />
      {
        (status.isAuth && authorId === userInfo.userId) || status.isAdmin ? (
          <>
            <CollectionTools
              collectionId={collectionId}
              selectedItems={selectedItems}
            />
            <CreateItem collectionId={collectionId} />
          </>
        ) : null
      }
      {
        data.length > 0 ? (
          <Stack>
            <TableItems
              items={data}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              extraFields={collection.extraFields}
              collectionId={collectionId}
              authorId={authorId}
            />
            <CsvDownloadButton data={data} className="btn-export-to-csv">
              <FormattedMessage id="app.exportsvg" />
            </CsvDownloadButton>
          </Stack>
        ) : <EmptyElement target={'table'} />
      }
    </>
  );
}

export default Items;