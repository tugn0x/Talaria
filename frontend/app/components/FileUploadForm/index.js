import React from 'react';
import './style.scss';
import './style.scss';
import {useState} from 'react'

const FileUploadForm = (props) => {
    const {FileUploadCallBack, customClass, data, File_Extension}=props;
    const [file, setFile] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [originalFilename, setFilename] = useState(null)

  function onChange(e) {
    let files = e.target.files || e.dataTransfer.files;
    console.log("file name is " + JSON.stringify(e.target.files[0].name))
    
    if (!files.length)
          return;
    setSelectedFile(e.target.files[0])
    setFilename(e.target.files[0].name)
    createFile(files[0]);
}

function createFile(file) {
    let reader = new FileReader();
    reader.onload = (e) => {
        setFile(reader.result)
      };
    reader.readAsDataURL(file);
}
    return (
        <>    
            <div className={customClass}>
                <div>
                    <input type="file" name="file" accept={File_Extension} onChange={onChange}  />
                    <button type="button" onClick={() => FileUploadCallBack(data, file, originalFilename)} className="btn btn-info">Upload file</button>
                        {/* {file ? <textarea id="base64File" rows="30" cols="150" value={file} readOnly></textarea> : null } */}
                </div>
            </div> 
        </>
    );
};

export default FileUploadForm;