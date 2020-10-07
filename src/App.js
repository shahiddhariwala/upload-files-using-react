import React, { useState } from 'react';
import './App.css';

function App() {

  const [file, setFile] = useState("");
  const inputFileHandler = (e) => {
    try {
      setFile(e.target.files[0]);
    }
    catch (e) {
      console.error("Something Went Wrong !!", e);
    }
    console.log("Files", e.target.files);
  }
  return (
    <div className="App">
      <input type="file" onChange={(e) => inputFileHandler(e)} />
      <button>
        Upload
      </button>
    </div>
  );
}

export default App;
