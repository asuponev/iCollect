import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import { Stack } from '@mui/material';
import CsvDownloadButton from 'react-json-to-csv';

import { requestGetItems } from '../../../store/action-creators/items';
import { getTags } from '../../../store/action-creators/tags';

import Spinner from '../../../components/Spinner';
import ErrorMessage from '../../../components/ErrorMessage';
import CreateItem from '../../../components/modals/create-item';
import TableItems from '../../../components/tables/collection-table/collection-table-items';
import CollectionTools from '../../../components/tables/collection-table/collection-tools';
import EmptyElement from '../../../components/EmptyElement';
import './btn-csv-style.scss';

const Items = ({ collectionId }) => {
  const dispatch = useDispatch();
  const { status, userInfo  } = useSelector(state => state.auth);
  const { loading, items, error } = useSelector(state => state.items);
  const { collection } = useSelector(state => state.collection);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    dispatch(requestGetItems(collectionId));
    // eslint-disable-next-line
  }, [collectionId]);

  useEffect(() => {
    dispatch(getTags());
    // eslint-disable-next-line
  }, []);

  const authorId = collection.authorId?._id;

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <>
      {
        items.length > 0 ? (
          <Stack>
            <TableItems
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              extraFields={collection.extraFields}
              collectionId={collectionId}
              authorId={authorId}
            />
            <CsvDownloadButton data={items} className="btn-export-to-csv">
              <FormattedMessage id="app.exportsvg" />
            </CsvDownloadButton>
          </Stack>
        ) : <EmptyElement target={'table'} />
      }
    </>
  ) : null;

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
      {errorMessage}
      {spinner}
      {content}
    </>
  );
}

export default Items;