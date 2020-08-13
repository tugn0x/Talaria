import React from 'react';
import {Button} from 'reactstrap';
import {useIntl} from 'react-intl';
import messages from '../RequestItem/messages';

const RequestStatus = props => {
    console.log('RequestStatus', props)
    const {patronrequest,acceptCost,denyCost}=props
        
    const intl = useIntl()

    const statusIcon = (status) => {
        return "status-icon " + status
    }

    const waitingForCostOperations = () => {
        
        return (
            patronrequest.cost && patronrequest.cost>0 && 
            <>
                <p>L'articolo ha un costo di {patronrequest.cost}€</p>
                <div className="d-flex justify-content-between">
                    <Button onClick={() => acceptCost() }>
                        {intl.formatMessage({id: 'app.global.accept'})}
                    </Button>
                    <Button onClick={() => denyCost() }>
                        {intl.formatMessage({id: 'app.global.deny'})}
                    </Button>
                </div>
            </>

        )
    }
    
    const statusOperations = ()=>{
    
        let opBlock=null;
    
        switch (patronrequest.status)
        {
            case "waitingForCost": opBlock=waitingForCostOperations(); break;
            
            case "costAccepted":
            case "costNotAccepted":
            case "readyToDelivery":
            case "userAskCancel": 
            case "canceled": 
            case "requested":
            case "received":
            case "fileReceived": 
            case "notReceived": break;
        }
    
        return (
            <div>
                <span className={statusIcon(patronrequest.status)}></span> {intl.formatMessage(messages[patronrequest.status])}<br/>  
                <span className="archived"><i className="fas fa-hdd"></i> Archiviata: {patronrequest.archived?'SI':'NO'}</span>
                {opBlock}
            </div>
        )
    }


    return (
        <div>
            {statusOperations(patronrequest)}
        </div>
    )


}



export default RequestStatus;
