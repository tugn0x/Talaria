import React from 'react';
import {Button} from 'reactstrap';
import {useIntl} from 'react-intl';

const RequestIcons = (props) => {
    const {data,archiveRequest,askCancelRequest,acceptCost,denyCost} = props

    const intl=useIntl();        
   
    const canArchive = (data) => {
        if(data.status=="canceled" || data.status=="received"|| data.status=="fileReceived" || data.status=="notReceived") return true;
        return false;
    }

    const canDelete = (data) => {
        if(! (data.status=="canceled" || data.status=="received"|| data.status=="fileReceived" || data.status=="notReceived" || data.status=="userAskCancel"|| data.status=="waitingForCost" ) ) return true;
        return false;
    }

    const hasToPay = (data) => {
        if(data.status=="waitingForCost")
            return true;
        return false;    
    }


    return ( 
        <>
        {!data.archived && 
            <>
                {archiveRequest && canArchive(data) && <a href="#" onClick={() => archiveRequest(data.id)} className="btn btn-icon">
                    <i className="fas fa-hdd"></i>
                </a>}
                {askCancelRequest && canDelete(data) && <a href="#" onClick={() => askCancelRequest(data.id)} className="btn btn-icon">
                    <i className="fas fa-times"></i>
                </a> }
                {hasToPay(data) && acceptCost && denyCost &&
                <>
                    <p>L'articolo ha un costo di {data.cost} &euro;</p>
                    <Button color="success" size="sm" onClick={() => acceptCost(data.id)}>{intl.formatMessage({id: 'app.global.accept'})}</Button>                    
                    {' '}
                    <Button color="danger" size="sm" onClick={() => denyCost(data.id)}>{intl.formatMessage({id: 'app.global.deny'})}</Button>
                </>
                }
            </>
        }                             
        </>
    )
}

export default RequestIcons