import { DialogContentText } from '@mui/material';
import { Controller } from 'react-hook-form';
import MDEditor from '@uiw/react-md-editor';

const FormMarkdownText = ({ control, name }) => {

  return (
    <>
      <DialogContentText mb={1}>Description</DialogContentText>
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field }) => (
          <MDEditor
            {...field}
          />
        )}
      />
    </>
  );
}

export default FormMarkdownText;