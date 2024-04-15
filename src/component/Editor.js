import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; // Import Quill styles if needed

const Editor = ({ placeholder }) => {
  const [editorHtml, setEditorHtml] = useState('');
  const [theme, setTheme] = useState('snow');

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  const handleThemeChange = (newTheme) => {
    if (newTheme === "core") newTheme = null;
    setTheme(newTheme);
  };

  return (
    <div>
      <ReactQuill 
        theme={theme}
        onChange={handleChange}
        value={editorHtml}
        modules={Editor.modules}
        formats={Editor.formats}
        bounds={'.app'}
        placeholder={placeholder}
      />
      <div className="themeSwitcher">
        <label>Theme </label>
        <select onChange={(e) => handleThemeChange(e.target.value)}>
          <option value="snow">Snow</option>
          <option value="bubble">Bubble</option>
          <option value="core">Core</option>
        </select>
      </div>
    </div>
  );
};

// Quill modules to attach to editor
Editor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
};

// Quill editor formats
Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

// PropType validation
Editor.propTypes = {
  placeholder: PropTypes.string,
};

export default Editor;