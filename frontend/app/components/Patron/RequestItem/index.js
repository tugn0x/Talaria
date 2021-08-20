import React, {useState, useEffect} from 'react';
import {UncontrolledTooltip, Row, Col} from 'reactstrap';
import {NavLink } from 'react-router-dom';
import { generatePath } from "react-router";
import {useIntl} from 'react-intl';
import CustomCheckBox from 'components/Form/CustomCheckBox';
import {formatDate,formatDateTime} from 'utils/dates';
import './style.scss';
import RequestIcons from '../RequestIcons';
import ReferenceCitation from '../../ReferenceCitation';
import ReferenceTags from '../ReferenceTags';

/* TODO: una volta definito l'aspetto finale metto a posto le traduzioni */

const RequestItem = (props) => {
    const {data, editPath,toggleSelection,checked,archiveRequest,askCancelRequest,acceptCost,denyCost} = props
    const intl = useIntl();
        
    
    
    
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
    
    /*const requesturl=(id) => {
        return generatePath(`${editPath}`, {
            id
        });
    }*/

    return ( 
        <Row className="list-row justify-content-between">                        
            <Col sm={3} className="select-checkbox">
                {toggleSelection && <CustomCheckBox 
                    handleChange={toggleSelection}
                    checked={checked}
                />}                
                <span className={statusIcon(data.status)}></span> 
                <span className="status-text">{intl.formatMessage({id: "app.requests."+data.status})}
                </span>
                <span className="request_id">ID: <span>{data.id}</span></span>
                <span className="status-date">{statusDate(data)}</span>
            </Col>
            <Col sm={7}>                
                <ReferenceTags data={data.reference.data} removeLabel={(labelId)=>removeLabel(labelId )} removeGroup={(groupId)=>removeGroup(groupId)}/>              
                <ReferenceCitation full={false} data={data.reference.data}/>       
                <div className="deliveryBox">
                    {data.library && <span className="libraryLabel pr-3">
                        <span><i className="fas fa-landmark"></i></span> 
                        <span>
                        <a href="#" id={`tooltip-${data.id}-${data.library.data.id}`} className="active">{data.library_label.data.label}</a> 
                        <UncontrolledTooltip autohide={false} placement="right" target={`tooltip-${data.id}-${data.library.data.id}`}>
                            {data.library.data.name}
                        </UncontrolledTooltip>
                        </span>
                        {data.request_date && <span className="requestDate"><span>Richiesto il {formatDateTime(data.request_date, 'it')}</span></span>}
                        {data.forlibrary_note && <p className="forlibrary_note"><i className="fas fa-sticky-note"></i>Note richiesta: {data.forlibrary_note}</p>}                  
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
            </Col>
            
            <Col sm={2} className="icons align-self-center">
                <RequestIcons 
                    data={data} 
                    archiveRequest={archiveRequest}
                    askCancelRequest={askCancelRequest}
                    acceptCost={acceptCost}
                    denyCost={denyCost}/>
            </Col> 
        </Row>
        
    )
}

export default RequestItem