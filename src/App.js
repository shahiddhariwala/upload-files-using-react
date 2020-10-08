import React, { useState, useRef } from 'react';
import './App.css';
import axios from "axios";

function App() {

  const [files, setFile] = useState([]);
  const inputRef = useRef();

  const inputFileHandler = (e) => {
    console.log(e.target.files);
    try {
      setFile(e.target.files);
    }
    catch (e) {
      console.error("Something Went Wrong , while selecting the file!!", e);
    }
  }

  const fileUploadHandler = () => {
    const fd = new FormData();
    if (files) {
      files.values().forEach(file => fd.append('image', file, file.name))
      console.log("form Data", fd);
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

    console.log("Files Selected", files);
    if (files.length > 0) {
      let details = [];
      for (let file of files) {

        details.push(
          <>
            <hr></hr>
            File Name: {file.name} <br></br>
              File Size: {file.size} bytes<br></br>
              Last Modified: {new Date(file.lastModifiedDate).toUTCString()} <br></br>
          </>
        );
      }
      return details;
    }
    else {
      return <div>
        Click Pick Files to select the files.
      </div>;
    }
  }


  return (
    <div className="App">
      <input style={{ display: "none" }} type="file" multiple onChange={(e) => inputFileHandler(e)} ref={inputRef} />
      <button onClick={() => inputRef.current.click()} >Pick Files</button>
      <button onClick={() => fileUploadHandler()}>
        Upload
      </button>
      {fileData()}
    </div>
  );
}

export default App;
