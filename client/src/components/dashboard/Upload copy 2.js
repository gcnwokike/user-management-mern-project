import React, { useState } from "react";
import { post } from "axios";

function Upload() {
  const [state, setState] = useState({
    file: null,
    response: ""
  });

  const { fileSent, response } = state;

  function onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    fileUpload(fileSent).then(res => {
      //console.log(res.data);
      setState({ response: res.data });
      console.log(res.data);
    });
  }
  function onChange(e) {
    setState({ fileSent: e.target.files[0] });
  }
  async function fileUpload(file) {
    const url = "http://localhost:5000/api/auth/upload";
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return await post(url, formData, config);
  }

  //console.log(message);
  return (
    <form onSubmit={e => onFormSubmit(e)} style={{ textAlign: "center" }}>
      <h4 style={{ align: "center" }}>{response} </h4>
      <h1>Users CSV Upload</h1>
      <input type="file" onChange={e => onChange(e)} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default Upload;
