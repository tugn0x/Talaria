import React from 'react';
import './style.scss';
import {useState} from 'react'
import { useIntl } from 'react-intl';
import {Label} from 'reactstrap';


const FileUploadForm = (props) => {
    const {FileUploadCallBack, customClass, data, AllowedFileTypes}=props;
    const [file, setFile] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [originalFilename, setFilename] = useState(null);
    const [validfiletype, setvalidfiletype] = useState(false);
    var hideMessageFlag = 0;
    const intl=useIntl();

  function onChange(e) {
    let files = e.target.files || e.dataTransfer.files;
    console.log("file name is " + JSON.stringify(e.target.files[0].name))
    
    if (!files.length)
        return;

    const fileType = e.target.files[0].name.substring(e.target.files[0].name.lastIndexOf('.') + 1);
  
    if (AllowedFileTypes.includes(fileType)) {
      setSelectedFile(e.target.files[0])
      setFilename(e.target.files[0].name)
      createFile(files[0]);
      setvalidfiletype(true)  
      console.log("valid file extension")
    }
    else
    {
      console.log("invalid file extension")
      setvalidfiletype(false)
      // Display an alert message containing the allowed file types.
      alert(`${intl.formatMessage({id: "message_to_display_file_extension"})} ${AllowedFileTypes}`);
      return;
    } 
}

function createFile(file) {
    let reader = new FileReader();
    reader.onload = (e) => {
        setFile(reader.result)
      };
    reader.readAsDataURL(file);
    FileUploadCallBack(data, file, originalFilename, hideMessageFlag)
}
    return (          
            <div className={customClass}>
              <br></br>                
                    <Label for="uploadfile">{intl.formatMessage({id: "app.components.FileUploadForm.filechoose"})}</Label>
                    <input type="file" id="uploadfile" name="file" accept={AllowedFileTypes} capture="camera" onChange={onChange}  />
                    {selectedFile && validfiletype && <button type="button" onClick={() => FileUploadCallBack(data, file, originalFilename, hideMessageFlag+1)} className="btn btn-info">Upload file</button>}
            </div>    

    );
};

export default FileUploadForm;