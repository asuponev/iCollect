import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import { Controller } from 'react-hook-form';
import { convert } from 'html-to-text';
import { useIntl } from 'react-intl';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './form-mdeditor.scss';

const FormMdEditor = ({ name, control, errors, placeholder, extrafield, defaultValue }) => {
  const { mode } = useSelector(state => state.options);
  const { messages } = useIntl();
  const text = messages["app.collection.form.errors"];

  useEffect(() => {
    const editor = document.querySelector('.editor')
    if (errors[name]) {
      editor.classList.add(`custom-error-${mode}`);
    } else {
      editor.classList.remove(`custom-error-${mode}`);
    }
    // eslint-disable-next-line
  }, [errors[name]]);

  return (
    <Controller
      render={
        ({ field: { onChange, value } }) =>
          <WYSIWYGEditor
            onChange={onChange}
            value={value}
            placeholder={placeholder}
          />
      }
      name={name}
      control={control}
      defaultValue={defaultValue || ""}
      rules={
        !extrafield ? {
          validate: {
            required: (v) =>
              (v && convert(v).length > 0) ||
              `${placeholder} ${text.required}`,
            maxLength: (v) =>
              (v && convert(v).length <= 200) ||
              text.descrmax,
          },
        } :
          {
            validate: {
              maxLength: (v) =>
                (v && convert(v).length <= 200) ||
                text.descrmax,
            },
          }
      }
    />
  );
};

export default FormMdEditor;


const WYSIWYGEditor = ({ onChange, value, placeholder }) => {
  const { mode } = useSelector(state => state.options);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (!updated) {
      const defaultValue = value ? value : "";
      const blocksFromHtml = htmlToDraft(defaultValue);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHtml.contentBlocks,
        blocksFromHtml.entityMap
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
    // eslint-disable-next-line
  }, [value]);

  const onEditorStateChange = (editorState) => {
    setUpdated(true);
    setEditorState(editorState);
    return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  return (
    <React.Fragment>
      <div className={`editor editor-${mode}`}>
        <Editor
          spellCheck
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          placeholder={placeholder}
          stripPastedStyles={true}
          toolbar={{
            options: ['inline']
          }}
        />
      </div>
    </React.Fragment>
  );
}