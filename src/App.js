import React, { useState } from 'react';
import './App.css';
import axios from "axios";

function App() {

  const [file, setFile] = useState("");
  const inputFileHandler = (e) => {
    try {
      setFile(e.target.files[0]);
    }
    catch (e) {
      console.error("Something Went Wrong , while selecting the file!!", e);
    }
    console.info("Files", e.target.files);
  }

  const fileUploadHandler = () => {
    const fd = new FormData();
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


  return (
    <div className="App">
      <input type="file" onChange={(e) => inputFileHandler(e)} />
      <button onClick={() => fileUploadHandler()}>
        Upload
      </button>
    </div>
  );
}

export default App;
