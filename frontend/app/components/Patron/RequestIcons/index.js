import React from 'react';
import { generatePath } from "react-router";
import {Button} from 'reactstrap';
import {useIntl} from 'react-intl';
import {Link } from 'react-router-dom';
import './style.scss';

const RequestIcons = (props) => {
    const {data,archiveRequest,askCancelRequest,acceptCost,denyCost} = props

    const intl=useIntl();        

    const referenceurl=(id) => {
        return generatePath('/patron/references/:id?/:op?', {
            id
        });
    }
   
    const canArchive = (data) => {
        if(data.status=="canceled" || data.status=="received"|| data.status=="notReceived") return true;
        return false;
    }

    const canDelete = (data) => {
        if(! (data.status=="canceled" || data.status=="received"|| data.status=="notReceived" || data.status=="waitingForCost" ) ) return true;
        return false;
    }

    const hasToPay = (data) => {
        if(data.cost && data.cost>0)
            return true;
        return false;    
    }

    const costPolicy = (data) => {
        let policy="";
        switch (data.cost_policy)
        {
            case 0: policy=<><i className="fas fa-times-circle"></i><span>Deny any cost</span></>; break;
            case 1: policy=<><i className="fas fa-check-circle"></i><span>Accept any cost</span></>;break;
            case 2: policy=<><i className="fas fa-question-circle"></i><span>Ask for confirmation</span></>;break;
        }
        return policy;
    }


    return ( 
        <div className="requestIcons">
        <Link className="btn btn-icon" to={`${referenceurl(data.reference.data.id)}`}>        
        <i className="fas fa-eye"></i>
        </Link>
        {!data.archived && 
            <>
                {archiveRequest && canArchive(data) && <a href="#" onClick={() => archiveRequest(data.id)} className="btn btn-icon">
                    <i className="fas fa-hdd"></i>
                </a>}
                {askCancelRequest && canDelete(data) && <a href="#" onClick={() => askCancelRequest(data.id)} className="btn btn-icon">
                    <i className="fas fa-times"></i>
                </a> }
                {hasToPay(data) && acceptCost && denyCost &&
                <div className="costIcons">                    
                    <i className="fas fa-coins"></i> {data.cost} &euro;   
                    <span className="cost_policy">Cost Policy: {costPolicy(data)}</span>                                         
                    {data.cost_policy==2 && 
                        <div className="costButtons">
                            <Button color="success" size="sm" onClick={() => acceptCost(data.id)}>{intl.formatMessage({id: 'app.global.accept'})}</Button>{' '}<Button color="danger" size="sm" onClick={() => denyCost(data.id)}>{intl.formatMessage({id: 'app.global.deny'})}</Button>
                        </div>
                    }                    
                </div>
                }
            </>
        }                             
        </div>
    )
}

export default RequestIcons