import React from 'react';
import {UncontrolledTooltip} from 'reactstrap';
import {useIntl} from 'react-intl';
import {formatDate,formatDateTime} from '../../../utils/dates';
import './style.scss';


const statusIcon = (status) => {
    return "status-icon " + status
}

const statusDate = (data) => {
  let date="";
  switch (data.status)
  {
      //case "userAskCancel": date = data.cancel_request_date; break;
      case "canceled": date= data.cancel_date; break;
      case "requested": date= data.request_date; break;

      case "costAccepted": 
      case "costNotAccepted": date= data.answer_cost_date; break;
      case "waitingForCost": date=data.waiting_cost_date; break;
      
      case "readyToDelivery":  date=data.delivery_ready_date; break;
      
      case "received": date=data.fulfill_date; break;            
      case "notReceived":  date=data.notfulfill_date; break;
      
      default: return "";
  }
  
  return formatDateTime(date,'it');
}

export const PatronRequestStatus = (props) => {

    const intl = useIntl();

    const {data,customClass}=props;

    return (
        <div className={"patronrequest_status " + (customClass?customClass:'')}>
        <span className={statusIcon(data.status)}></span> 
        <span className="status-text">{intl.formatMessage({id: "app.requests."+data.status})}
        </span>
        <span className="request_id">ID: <span>{data.id}</span></span>
        <span className="status-date">{statusDate(data)}</span>
        </div>
    )
}

export const PatronRequestData = (props) => {
    const {data,customClass}=props

    const intl = useIntl();

    return (
        <div className={"patronrequest_data " + (customClass?customClass:'')}>
            {data.library && <span className="libraryLabel pr-3">
                <span><i className="fas fa-landmark"></i></span> 
                <span>
                <a href="#" id={`tooltip-${data.id}-${data.library.data.id}`} className="active">{data.library_label.data.label}</a> 
                <UncontrolledTooltip autohide={false} placement="right" target={`tooltip-${data.id}-${data.library.data.id}`}>
                    {data.library.data.name}
                </UncontrolledTooltip>
                </span>
                {data.request_date && <span className="requestDate"><span>Richiesto il {formatDateTime(data.request_date, 'it')}</span></span>}
                {data.forlibrary_note && <div className="forlibrary_note">
                <a href="#" id={`tooltip-${data.id}`} className="active"><i className="fas fa-sticky-note"></i></a> 
                <UncontrolledTooltip autohide={false} placement="right" target={`tooltip-${data.id}`}>
                    {data.forlibrary_note}
                </UncontrolledTooltip>                                
                </div>}
            </span> }
            {data.delivery && <span className="deliveryLabel pr-3">
                <span><i className="fas fa-luggage-cart"></i></span>
                <span>
                    <a href="#" id={`tooltip-del-${data.id}-${data.delivery.data.id}`} className="active">{data.delivery.data.name}</a> 
                    <UncontrolledTooltip autohide={false} placement="right" target={`tooltip-del-${data.id}-${data.delivery.data.id}`}>
                    <div> 
                        <span>{data.delivery.data.name}</span><br/>
                        <span><i className="fas fa-envelope"></i> {data.delivery.data.email}</span><br/>
                        <span><i className="fas fa-phone"></i> {data.delivery.data.phone}</span><br/>
                        <span><i className="fas fa-clock"></i> {data.delivery.data.openinghours}</span>
                    </div>
                    </UncontrolledTooltip>
                </span>
                <span className="deliveryReadyDate">
                    {data.delivery_ready_date && 
                        <>
                            <span>Ritiro disponibile dal <span>{formatDateTime(data.delivery_ready_date, 'it')}</span></span> 
                        </>
                    }
                    {!data.delivery_ready_date && <span>Non ancora disponibile al ritiro</span>}                                                     
                </span>
            </span>}    
        {data.fromlibrary_note && <p className="fromlibrary_note"><i className="fas fa-sticky-note"></i>Note per l'utente: {data.fromlibrary_note}</p>}                  
        </div>  
    )
}