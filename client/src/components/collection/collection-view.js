import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllCollectionItems } from '../../utils/requests/requests';
import CollectionInfo from './view-blocks/collection-info';
import CollectionTools from './view-blocks/collection-tools';
import CreateItem from './view-blocks/create-item';
import TableItems from './view-blocks/collection-table-items';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';

const CollectionView = ({ collectionData }) => {
  const collectionId = useParams().id;
  const [items, setItems] = useState([]);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentItemId, setCurrentItemId] = useState('');

  useEffect(() => {
    onItemsRequest(collectionId);
  }, [collectionId])

  const onItemsRequest = (id) => {
    setError(null);
    setLoading(true);
    getAllCollectionItems(id)
      .then(res => {
        setItems(res);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      })
  }

  const onCreateItem = () => {
    setOpenModalForm(true);
  }

  const onEditItem = (itemId) => {
    setCurrentItemId(itemId);
    setTimeout(() => setOpenModalForm(true), 500);
  };

  const handleCloseModalForm = () => {
    setOpenModalForm(false);
    setTimeout(() => setCurrentItemId(''), 300);
  };

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
      />
    </>
  ) : null;

  return (
    <>
      <CollectionInfo data={collectionData} />
      <CollectionTools
        onCreateItem={onCreateItem}
      />
      <CreateItem
        collectionId={collectionId}
        openModalForm={openModalForm}
        handleCloseModalForm={handleCloseModalForm}
        onItemsRequest={onItemsRequest}
        extraFields={collectionData.extraFields}
        itemId={currentItemId}
      />
      {errorMessage}
      {spinner}
      {content}
    </>
  );
}

export default CollectionView;