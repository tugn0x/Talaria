import React, {useEffect} from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {cleanFileUpload, requestuploadFile} from './actions' 
import fileUploadSelector  from './selectors';
import {Card, Row, Col} from 'reactstrap';
import FileUploadForm from '../../components/FileUploadForm';
import {useIntl} from 'react-intl';
    
const FileUpload = (props) => {
  console.log("FileUpload:", props)      
  const {dispatch, data, fileupload, cleanuploadprops}=props
  const intl = useIntl()
  const uploadFile = (data, file, originalfilename) => {
      console.log(file)
      console.log(originalfilename)
      dispatch(requestuploadFile(props.data.id, props.data.lending_library_id, file, originalfilename, props.data.lending_status,"",""))
  }

  useEffect(() => {                
    props.parentCallback(fileupload);
  }, [fileupload])


  useEffect(() => {
    if(cleanuploadprops)  // when cleanuploadprops is set to true, it dispatch the cleanfileupload. Otherwise do nothing
      dispatch(cleanFileUpload())  
  }, [cleanuploadprops])


return (
  <>
    <FileUploadForm FileUploadCallBack={uploadFile} />  
    {fileupload && fileupload.status && <span className={"fileuploadstatusmessage"}>
    { 
          (fileupload.status=='uploaded') &&   
           <span className="text-success"><h4>{intl.formatMessage({id: "app.requests.UploadSuccess"})}</h4></span>    
    }
    {
          (fileupload.status=='failed') &&
          <span className="text-danger"> <h3>{intl.formatMessage({id: "app.requests.UploadFail"})}</h3></span>                        
    }
    </span>
    }
    
  </>
    )
}

const mapStateToProps = createStructuredSelector({  
  fileupload: fileUploadSelector()
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

export default compose(withConnect)((FileUpload));
