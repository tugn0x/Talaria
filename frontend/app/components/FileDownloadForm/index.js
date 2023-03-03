import React from 'react';
import {useIntl} from 'react-intl';
import './style.scss';
import {Card, Button} from 'reactstrap';
import './style.scss';

const FileDownloadForm = (props) => {
    const {FileDownloadCallBack}=props;
    return (
        <button type="button" onClick={() => FileDownloadCallBack()} className="btn btn-primary btn-sm btn-download-icon"><i className="fa-solid fa-file"></i></button>                    
                
    );
};

export default FileDownloadForm;