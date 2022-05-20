import React from 'react';
import {useIntl} from 'react-intl';
import './style.scss';
import {Card, Button} from 'reactstrap';
import './style.scss';

const FileDownloadForm = (props) => {
    const {FileDownloadCallBack}=props;
    return (
        <>       
                <div>
                    <button type="button" onClick={() => FileDownloadCallBack()} className="btn btn-info">Download</button>
                </div> 
        </>
    );
};

export default FileDownloadForm;