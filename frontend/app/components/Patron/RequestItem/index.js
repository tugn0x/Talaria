import React, {useState, useEffect} from 'react';
import {UncontrolledTooltip, Row, Col} from 'reactstrap';
import {NavLink } from 'react-router-dom';
import { generatePath } from "react-router";
import {useIntl} from 'react-intl';
import messages from './messages';
import CustomCheckBox from 'components/Form/CustomCheckBox';
import {formatDate,formatDateTime} from 'utils/dates';
import './style.scss';
import RequestIcons from '../RequestIcons';

/* TODO : trovare il modo di richiamare la visualizzazione di ReferenceItem per la parte dei metadati*/  

const RequestItem = (props) => {
    const {data, editPath,toggleSelection,checked,archiveRequest,askCancelRequest,acceptCost,denyCost} = props
    const intl = useIntl();
        
    
    const matTypeIcon = (mat) => {
        switch (mat)
        {
          case 1: return 'simple_icon fas fa-file'; break;
          case 2: return 'simple_icon fas fa-book'; break;
          case 3: return 'simple_icon fas fa-scroll'; break;
          case 4: return 'simple_icon fas fa-map'; break;
          case 5: return 'simple_icon fas fa-bible'; break;   
        }
        return mat;
      }
    
      const statusIcon = (status) => {
          return "status-icon " + status
      }

      const statusDate = (data) => {
        let date="";
        switch (data.status)
        {
            case "userAskCancel": date = data.cancel_request_date; break;
            case "canceled": date= data.cancel_date; break;
            case "requested": date= data.request_date; break;

            case "costAccepted": 
            case "costNotAccepted": date= data.answer_cost_date; break;
            
            case "readyToDelivery":  date=data.delivery_ready_date; break;
            
            case "received":
            case "fileReceived": 
            case "notReceived":  date=data.fullfill_date; break;
            default: return "";
        }
        
        return <span className="status-date">{formatDateTime(date,'it')}</span>;
      }
    
    const requesturl=(id) => {
        return generatePath(`${editPath}`, {
            id
        });
    }

    //*** TODO: DA SISTEMARE e AGGIUNGERE campi in modo che sia allineato con le ultime modifiche al riferimento e/o importare il componente direttamente ***
    return ( 
        <Row className="list-row justify-content-between">                        
            <Col sm={3} className="select-checkbox">
                {toggleSelection && <CustomCheckBox 
                    handleChange={toggleSelection}
                    checked={checked}
                />}                
                <span className={statusIcon(data.status)}></span> 
                <span className="status-text">{intl.formatMessage(messages[data.status])}
                </span>
                {statusDate(data)}
            </Col>
            <Col sm={7} className="info">
                <span><i className={matTypeIcon(data.reference.data.material_type)}></i></span>
                <span><NavLink to={`${requesturl(data.id)}`}>
                    <span className="pub_title">{data.reference.data.pub_title}</span> <span className="part_title">{data.reference.data.part_title}</span>
                </NavLink>
                </span>
                <div className="authors">
                   {data.reference.data.authors && <span className="authors">Autore <span>{data.reference.data.authors}</span></span>} 
                   <span className="pubyear">Anno <span>{data.reference.data.pubyear}</span></span>
                </div>
                <div>
                {data.reference.data.labels.data && <span className="labels-row">
                    {data.reference.data.labels.data.map(label => <span key={label.id}>{label.name}</span>)}
                </span>}
                {data.reference.data.groups.data && <span className="groups-row">
                    {data.reference.data.groups.data.map(grp => <span key={grp.id}>{grp.name}</span>)}
                </span>}
                </div>                
                {data.library && <span className="libraryLabel pr-3">
                    <span><i className="fas fa-landmark"></i></span> 
                    <span>
                    <a href="#" id={`tooltip-${data.id}-${data.library.data.id}`} className="active">{data.library_label.data.label}</a> 
                    <UncontrolledTooltip placement="right" target={`tooltip-${data.id}-${data.library.data.id}`}>
                        {data.library.data.name}
                    </UncontrolledTooltip>
                    </span>
                </span> }
                {data.delivery && <span className="deliveryLabel pr-3">
                    <span><i className="fas fa-truck"></i></span>
                    <span>
                        <a href="#" id={`tooltip-del-${data.id}-${data.delivery.data.id}`} className="active">{data.delivery.data.name}</a> 
                        <UncontrolledTooltip placement="right" target={`tooltip-del-${data.id}-${data.delivery.data.id}`}>
                        <div> 
                            <span>{data.delivery.data.name}</span><br/>
                            <span><i className="fas fa-envelope"></i> {data.delivery.data.email}</span><br/>
                            <span><i className="fas fa-phone"></i> {data.delivery.data.phone}</span><br/>
                            <span><i className="fas fa-clock"></i> {data.delivery.data.openinghours}</span>
                        </div>
                        </UncontrolledTooltip>
                    </span>
                </span>}       

                {data.request_date && <span className="requestDate"><span>Data richiesta</span> <span>{formatDateTime(data.request_date, 'it')}</span></span>}
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