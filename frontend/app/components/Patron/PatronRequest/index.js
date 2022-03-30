import React from 'react';
import {UncontrolledTooltip} from 'reactstrap';
import {useIntl} from 'react-intl';
import {formatDate,formatDateTime} from '../../../utils/dates';
import './style.scss';



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
      case "notReceived":  date=data.fulfill_date; break;
      
      default: return "";
  }
  
  return <span className="status-date"><i className="fas fa-clock"></i> {formatDateTime(date)}</span>
}

const notfulfillReason = (data) => {
    let intl=useIntl();
    let ret=""
    switch (data.notfulfill_type) {
        case 1: ret=intl.formatMessage({id: "app.patronrequest.notfulfill_type.NotAvailable"}); break;
        case 2: ret=intl.formatMessage({id: "app.patronrequest.notfulfill_type.PatronNotEnabled"}); break;
        case 3: ret=intl.formatMessage({id: "app.patronrequest.notfulfill_type.PatronNotTake"}); break;
        case 4: ret=intl.formatMessage({id: "app.patronrequest.notfulfill_type.PatronNotAcceptCost"}); break;
        case 5: ret=intl.formatMessage({id: "app.patronrequest.notfulfill_type.PatronNotAnswerCost"}); break;
        case 6: ret=intl.formatMessage({id: "app.patronrequest.notfulfill_type.NotAvailableForFree"}); break; 
        case 7: ret=intl.formatMessage({id: "app.patronrequest.notfulfill_type.WrongRef"}); break;
    }
            
    return ret;
}


const costPolicy = (data) => {    
        let intl=useIntl();
        let ret=""
        switch (data.cost_policy) {
            case 1: ret=intl.formatMessage({id: "app.requests.acceptAnyExtraCost"}); break;
            case 0: ret=intl.formatMessage({id: "app.requests.denyAnyExtraCost"}); break;
            case 2: ret=intl.formatMessage({id: "app.requests.toBeInformedAboutExtraCost"}); break;            
        }
                
        return ret;    
}
  


export const PatronRequestStatus = (props) => {

    const intl = useIntl();

    const {data}=props;    

    return (
        <>        
        {data.request_date && <span className="status-date">
            <i className="fas fa-share"></i> {formatDateTime(data.request_date)}
            {data.forlibrary_note && <div className="forlibrary_note">
                <span id={`tooltip-${data.id}`} className="active"><i className="fas fa-sticky-note"></i></span> 
                <UncontrolledTooltip autohide={false} placement="right" target={`tooltip-${data.id}`}>
                    {data.forlibrary_note}
                </UncontrolledTooltip>                                
            </div>} 
        </span>}                    
               
        {data.cancel_date && <span className="status-date"><i className="fas fa-times"></i> {formatDateTime(data.cancel_date)}</span>}
        {data.fulfill_date && 
        <span className="status-date"><i className="fas fa-reply"></i> {formatDateTime(data.fulfill_date)}
            {data.notfulfill_type && <div className="notfulfillreason">
            <span id={`notfulfill_type-${data.id}`} className="active"><i className="fas fa-comment text-danger"></i></span> 
                    <UncontrolledTooltip autohide={false} placement="right" target={`notfulfill_type-${data.id}`}>
                        {notfulfillReason(data)}
                    </UncontrolledTooltip>                                
            </div>}
        
            {data.fromlibrary_note && <div className="fromlibrary_note">
                <span id={`tooltipfulfillnote-${data.id}`} className="active"><i className="fas fa-sticky-note"></i></span> 
                <UncontrolledTooltip autohide={false} placement="right" target={`tooltipfulfillnote-${data.id}`}>
                    {data.fromlibrary_note}
                </UncontrolledTooltip>                                
            </div>}           
        </span>}
        {data.delivery_ready_date && <span className="status-date"><i className="fas fa-luggage-cart"></i> {formatDateTime(data.delivery_ready_date)}</span>}        
        {<span className="costpolicy"><i className="fas fa-coins"></i> {costPolicy(data)} </span>}                
        </>
    )
}

export const PatronRequestData = (props) => {
    const {data,customClass}=props

    const intl = useIntl();

    return (
        <div className={"patronrequest_data " + (customClass?customClass:'')}>
            {data.library && <div className="libraryLabel pr-3">
                <span><i className="fas fa-landmark"></i></span>                 
                <span id={`tooltip-${data.id}-${data.library.data.id}`} className="active">{data.library_label.data.label}</span> 
                <UncontrolledTooltip autohide={false} placement="right" target={`tooltip-${data.id}-${data.library.data.id}`}>
                    {data.library.data.name}
                </UncontrolledTooltip>                  
            </div> }
            {data.delivery && <div className="deliveryLabel pr-3">
                <span><i className="fas fa-luggage-cart"></i></span>
                    <span id={`tooltip-del-${data.id}-${data.delivery.data.id}`} className="active">{data.delivery.data.name}</span> 
                    <UncontrolledTooltip autohide={false} placement="right" target={`tooltip-del-${data.id}-${data.delivery.data.id}`}>
                    <div> 
                        <span>{data.delivery.data.name}</span><br/>
                        <span><i className="fas fa-envelope"></i> {data.delivery.data.email}</span><br/>
                        <span><i className="fas fa-phone"></i> {data.delivery.data.phone}</span><br/>
                        <span><i className="fas fa-clock"></i> {data.delivery.data.openinghours}</span>
                    </div>
                    </UncontrolledTooltip>                
            </div>}            
        </div>  
    )
}