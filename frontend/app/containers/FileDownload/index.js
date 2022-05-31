import React, {useEffect, useState} from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {requestdownloadFile, cleanFileDownload} from './actions' 
import fileDownloadSelector  from './selectors';
import FileDownloadForm from '../../components/FileDownloadForm';
import downloadFile from 'large-file-downloader';


const FileDownload = (props) => {
    console.log("FileDownlad:", props)      
    const {dispatch,filedownload, isLoading,filehash, libraryid, reqid}=props
    const [downloaded,setdownloaded]=useState(null)

    const GetfiledownloadBase64 = () => {  
      setdownloaded(false)  
      if(filehash)
           dispatch(requestdownloadFile(reqid, filehash,libraryid,"","",""))
    }

    useEffect(() => {
      if (!downloaded)
      { 
        downloadFile('data:application/octet-stream;base64,' + filedownload.filecontent, filehash)
        setdownloaded(true)
      }
        
    }, [filedownload.filecontent])


    useEffect(() => {
      console.log("clear filedownload:")
      //clean filedownloadbase64
      dispatch(cleanFileDownload());
    }, [downloaded])



return (
  <>
    <FileDownloadForm   
          FileDownloadCallBack={ () => GetfiledownloadBase64()}                                        
          isLoading={isLoading}
    />              
    {!downloaded && <span><i className="fas fa-spinner fa-pulse"></i></span>}
  </>
    )
}

const mapStateToProps = createStructuredSelector({  
  filedownload: fileDownloadSelector()
});



function mapDispatchToProps(dispatch) {
  return {
      dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)((FileDownload));
