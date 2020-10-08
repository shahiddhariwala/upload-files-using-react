import React, { useState, useRef } from 'react';
import './App.css';
import axios from "axios";

function App() {

  const [file, setFile] = useState("");
  const inputRef = useRef();

  const inputFileHandler = (e) => {
    try {
      setFile(e.target.files[0]);
    }
    catch (e) {
      console.error("Something Went Wrong , while selecting the file!!", e);
    }
  }

  const fileUploadHandler = () => {
    const fd = new FormData();
    if (file) {
      fd.append('image', file, file.name);

      axios.post(`http://yourApi/uploadFile`, fd, {
        onUploadProgress: progressEvent => {
          console.log("Upload Progress: " + Math.round(progressEvent.loaded / progressEvent.total * 100) + " %");
        }
      }).then(success => {
        console.log("success", success);
      }).catch((error) => {
        console.error("Something went Wrong while Uploading File", error);
      })
    }
  }

  const fileData = () => {

    console.log("File Selected", file);
    if (file) {
      return <div>
        File Name: {file.name} <br></br>
        File Size: {file.size} bytes<br></br>
        Last Modified: {new Date(file.lastModifiedDate).toUTCString()} <br></br>
      </div>
    }
    else {
      return <div>
        Click Pick File to select the file.
      </div>;
    }
  }


  return (
    <div className="App">
      <input style={{ display: "none" }} type="file" onChange={(e) => inputFileHandler(e)} ref={inputRef} />
      <button onClick={() => inputRef.current.click()} >Pick File</button>
      <button onClick={() => fileUploadHandler()}>
        Upload
      </button>
      {fileData()}
    </div>
  );
}

export default App;
