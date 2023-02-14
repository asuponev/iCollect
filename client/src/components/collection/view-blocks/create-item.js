import { Dialog, DialogTitle, DialogContent, Tooltip, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { createItem } from '../../../utils/requests/requests';
import FormCreateItem from '../../form/form-create-item';

const CreateItem = ({
  collectionId,
  openModalForm,
  handleCloseModalForm,
  onItemsRequest,
  extraFields
}) => {

  const onRequestCreateItem = (collectionId, values) => {
    createItem(collectionId, { ...values })
      .then(res => {
        console.log(res);
        onItemsRequest(collectionId);
      }).catch(error => {
        console.log(error);
        // toast.error(error.message, { position: 'top-right' });
      })
  }

  return (
    <Dialog open={openModalForm} onClose={handleCloseModalForm}>
      <Tooltip
        title="Close form"
        placement="top"
        sx={{ position: "relative" }}
      >
        <IconButton
          onClick={() => handleCloseModalForm()}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <CloseIcon />
        </IconButton>
      </Tooltip>
      <DialogTitle>Add new item</DialogTitle>
      <DialogContent>
        <FormCreateItem
          collectionId={collectionId}
          handleClose={handleCloseModalForm}
          onRequestCreate={onRequestCreateItem}
          extraFields={extraFields}
        />
      </DialogContent>
    </Dialog>
  )
}

export default CreateItem;