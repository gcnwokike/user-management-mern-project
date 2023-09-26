import React from "react";
import { post } from "axios";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      response: ""
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }
  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    this.fileUpload(this.state.file).then(res => {
      //console.log(res.data);
      this.setState({ response: res.data });
      console.log(res.data);
    });
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }
  async fileUpload(file) {
    const url = "http://localhost:5000";
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return await post(url, formData, config);
  }

  render() {
    //console.log(message);
    return (
      <form onSubmit={this.onFormSubmit} style={{ textAlign: "center" }}>
        <h4 style={{ align: "center" }}>{this.state.response}</h4>
        <h1>Users CSV Upload</h1>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
    );
  }
}

export default Upload;
