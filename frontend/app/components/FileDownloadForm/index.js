import React from 'react';
import {useIntl} from 'react-intl';
import './style.scss';
import {Card, Button} from 'reactstrap';
import './style.scss';

const FileDownloadForm = (props) => {
    const {FileDownloadCallBack}=props;
    let intl=useIntl();
    
    return (
        <button type="button" onClick={() => FileDownloadCallBack()} className="btn btn-primary btn-sm btn-download-icon" title={intl.formatMessage({id: "app.requests.icon.file"})} ><i className="fa-solid fa-download"></i></button>                    
                
    );
};

export default FileDownloadForm;