import React,{useState} from 'react';
import { generatePath } from "react-router";
import {Button} from 'reactstrap';
import {useIntl} from 'react-intl';
import {Link } from 'react-router-dom';
import './style.scss';
import {canRequest} from '../BorrowingItem'
import BorrowingChooseLender from '../BorrowingChooseLender'

const BorrowingRequestOperations = (props) => {
    const {data, sendRequestToLender} = props

    const intl=useIntl();   
         
    return ( 
        <div className="requestOperations">
            {canRequest(data) &&
            <div>
                {( (data.reference.data.material_type==1 && !data.reference.data.issn)||
                    (data.reference.data.material_type==2 && !!data.reference.data.isbn) ) &&                    
                <div className="alert alert-warning" role="alert">
                    <i className="fas fa-tasks"></i> ISSN/ISBN not filled! Please check/edit reference before continue in order to 
                    check holdings on available catalogs !
                </div>
                }
                <BorrowingChooseLender selectLenderCb={sendRequestToLender}/>                                                                
            </div>}
        </div>
    )
}

export default BorrowingRequestOperations