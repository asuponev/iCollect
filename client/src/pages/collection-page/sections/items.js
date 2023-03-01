import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FormattedMessage, useIntl } from 'react-intl';
import { Stack } from '@mui/material';
import CsvDownloadButton from 'react-json-to-csv';

import GlobalContext from '../../../utils/context/GlobalContext';
import { getAllCollectionItems, deleteItem, deleteItems, getItem } from '../../../utils/requests/requests';
import defaultItemValues from '../../../utils/constants/default-item-values';

import Spinner from '../../../components/Spinner';
import ErrorMessage from '../../../components/ErrorMessage';
import CreateItem from '../../../components/modals/create-item';
import TableItems from '../../../components/tables/collection-table/collection-table-items';
import CollectionTools from '../../../components/tables/collection-table/collection-tools';
import EmptyElement from '../../../components/EmptyElement';
import './btn-csv-style.scss';

const Items = ({ collectionId, collectionData }) => {
  const { status, userInfo } = useContext(GlobalContext);
  const [items, setItems] = useState([]);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentItemId, setCurrentItemId] = useState('');
  const [valuesForEdit, setValuesForEdit] = useState({ ...defaultItemValues });
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const { messages } = useIntl();
  const text = messages["app.collection"];

  useEffect(() => {
    onItemsRequest(collectionId);
  }, [collectionId]);

  const onItemsRequest = (collectionId) => {
    setError(null);
    setLoading(true);
    getAllCollectionItems(collectionId)
      .then(res => {
        setItems(res);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      })
  };

  const onGetItemForEdit = (collectionId, itemId) => {
    setCurrentItemId(itemId);
    setLoadingEdit(true);
    getItem(collectionId, itemId)
      .then(res => {
        setValuesForEdit({
          title: res.title,
          tags: res.tags,
          number1: res.number1 || 0,
          number2: res.number2 || 0,
          number3: res.number3 || 0,
          string1: res.string1 || '',
          string2: res.string2 || '',
          string3: res.string3 || '',
          text1: res.text1 || '',
          text2: res.text2 || '',
          text3: res.text3 || '',
          date1: res.date1 || '',
          date2: res.date2 || '',
          date3: res.date3 || '',
          checkbox1: res.checkbox1 || false,
          checkbox2: res.checkbox2 || false,
          checkbox3: res.checkbox2 || false,
        });
        setLoadingEdit(false);
        setOpenModalForm(true);
      }).catch(error => {
        console.log(error);
        toast.error(text.tools.editerror, { position: 'top-right' });
        setLoadingEdit(false);
        setValuesForEdit({ ...defaultItemValues });
      })
  };

  const onCreateItem = () => {
    setOpenModalForm(true);
  };

  const onEditItem = (itemId) => {
    onGetItemForEdit(collectionId, itemId);
  };

  const handleCloseModalForm = () => {
    setOpenModalForm(false);
    setValuesForEdit({ ...defaultItemValues });
    setTimeout(() => setCurrentItemId(''), 300);
  };

  const onDeleteItem = (itemId) => {
    setCurrentItemId(itemId);
    setLoadingDelete(true);
    deleteItem(collectionId, itemId)
      .then(res => {
        toast.info(text.tableTools.successdelete1, { position: 'top-right' });
        onItemsRequest(collectionId);
        setLoadingDelete(false);
      })
      .catch(error => {
        console.log(error);
        toast.error(error.message, { position: 'top-right' });
        setLoadingDelete(false);
      })
  };

  const onDeleteItems = (items) => {
    deleteItems(collectionId, items)
      .then(res => {
        toast.info(text.tableTools.successdelete2, { position: 'top-right' });
        onItemsRequest(collectionId);
      })
      .catch(error => {
        console.log(error);
        toast.error(error.message, { position: 'top-right' });
      })
  };

  const authorId = collectionData.authorId._id;

  const errorMessage = error ? <ErrorMessage error={error} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <>
      {
        items.length > 0 ? (
          <Stack>
            <TableItems
              items={items}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              extraFields={collectionData.extraFields}
              collectionId={collectionId}
              onEditItem={onEditItem}
              onDeleteItem={onDeleteItem}
              authorId={authorId}
              loadingEdit={loadingEdit}
              currentItemId={currentItemId}
              loadingDelete={loadingDelete}
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
              onCreateItem={onCreateItem}
              selectedItems={selectedItems}
              onDeleteItems={onDeleteItems}
            />
            <CreateItem
              collectionId={collectionId}
              openModalForm={openModalForm}
              handleCloseModalForm={handleCloseModalForm}
              onItemsRequest={onItemsRequest}
              extraFields={collectionData.extraFields}
              itemId={currentItemId}
              toast={toast}
              valuesForEdit={valuesForEdit}
            />
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