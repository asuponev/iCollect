import React, { useEffect, useState, useContext } from 'react';
import { getAllCollectionItems, deleteItem, deleteItems } from '../../utils/requests/requests';
import CollectionInfo from './view-blocks/collection-info';
import CollectionTools from './view-blocks/collection-tools';
import CreateItem from './view-blocks/create-item';
import TableItems from './view-blocks/collection-table-items';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import { ToastContainer, toast } from 'react-toastify';
import GlobalContext from '../../utils/context/GlobalContext';
import { useIntl } from 'react-intl';

const CollectionView = ({ collectionId, collectionData }) => {
  const { status, userInfo } = useContext(GlobalContext);
  const [items, setItems] = useState([]);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentItemId, setCurrentItemId] = useState('');

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

  const onCreateItem = () => {
    setOpenModalForm(true);
  };

  const onEditItem = (itemId) => {
    setCurrentItemId(itemId);
    setTimeout(() => setOpenModalForm(true), 1000);
  };

  const handleCloseModalForm = () => {
    setOpenModalForm(false);
    setTimeout(() => setCurrentItemId(''), 300);
  };

  const onDeleteItem = (itemId) => {
    deleteItem(collectionId, itemId)
      .then(res => {
        toast.info(text.tableTools.successdelete1, { position: 'top-right' });
        onItemsRequest(collectionId);
      })
      .catch(error => {
        console.log(error);
        toast.error(error.message, { position: 'top-right' });
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
      <TableItems
        items={items}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        extraFields={collectionData.extraFields}
        collectionId={collectionId}
        onEditItem={onEditItem}
        onDeleteItem={onDeleteItem}
        authorId={authorId}
      />
    </>
  ) : null;

  return (
    <>
      <ToastContainer />
      <CollectionInfo data={collectionData} />
      {
        (status.isAuth && authorId === userInfo.userId ) || status.isAdmin ? (
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

export default CollectionView;