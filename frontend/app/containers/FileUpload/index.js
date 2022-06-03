import React, {useEffect} from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {requestuploadFile} from './actions' 
import fileUploadSelector  from './selectors';
import {Card, Row, Col} from 'reactstrap';
import FileUploadForm from '../../components/FileUploadForm';
import {useIntl} from 'react-intl';
    
const FileUpload = (props) => {
  console.log("FileUpload:", props)      
  const {dispatch, data, fileupload}=props
  const intl = useIntl()
  const displaymsg = <h4>{intl.formatMessage({id: "app.requests.lendingUploadSuccess"})}</h4>
  const displaymsgerror = <h3>{intl.formatMessage({id: "app.requests.lendingUploadFail"})}</h3>
  const uploadFile = (data, file, originalfilename) => {
      console.log(file)
      console.log(originalfilename)
      dispatch(requestuploadFile(props.data.id, props.data.lending_library_id, file, originalfilename, props.data.lending_status,"",""))
  }

  useEffect(() => {                
    props.parentCallback(fileupload);
  }, [fileupload])

return (
  <>
    <FileUploadForm FileUploadCallBack={uploadFile} />  
    {fileupload && fileupload.status && <span className={"fileuploadstatusmessage"}>
    { 
          (fileupload.status=='uploaded') &&   
           <span className="text-success">{displaymsg}</span>    
    }
    {
          (fileupload.status=='failed') &&
          <span className="text-danger">{displaymsgerror}</span>                        
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
