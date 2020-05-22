import React from 'react';

const FormUpload = () => {
  return (
    <div>
      <h1>Upload file</h1>
      <form method="post" enctype="multipart/form-data">
        <label>Файл</label>
        <br />
        <input type="file" name="filedata" />
        <br />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default FormUpload;
