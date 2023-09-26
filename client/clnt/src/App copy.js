import React from "react";
import "./App.css";

function App() {
  return (
    <div className={{ textAlign: center }}>
      <p>
        Use the form below to upload a list of authors. Click
        <a href="/template">here</a> for an example template.
      </p>
      <form
        action="http://localhost:5000/"
        method="POST"
        enctype="multipart/form-data"
      >
        <input type="file" name="file" accept="*.csv" />
        <br />
        <br />
        <input type="submit" value="Upload Users CSV" />
      </form>
    </div>
  );
}

export default App;
