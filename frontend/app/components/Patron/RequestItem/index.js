import React, {useState, useEffect} from 'react';
import {UncontrolledTooltip, Row, Col} from 'reactstrap';
import {NavLink } from 'react-router-dom';
import { generatePath } from "react-router";
import {useIntl} from 'react-intl';
import messages from './messages';
import CustomCheckBox from 'components/Form/CustomCheckBox';
import {formatDate} from 'utils/dates';
import './style.scss';

const RequestItem = (props) => {
    const {data, editPath,toggleSelection,checked,archiveRequest,askCancelRequest} = props
    const intl = useIntl();
        
    
    const matTypeIcon = (mat) => {
        switch (mat)
        {
          case 1: return 'simple_icon fas fa-file'; break;
          case 2: return 'simple_icon fas fa-book'; break;
          /*case 3: return 'simple_icon icon-diploma'; break;*/
          case 3: return 'simple_icon fas fa-scroll'; break;
        }
        return mat;
      }
    
      const statusIcon = (status) => {
          return "status-icon " + status
      }

      const requestDate = (data) => {
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
        
        return <span className="request-date">{date}</span>;
      }
    
    const requesturl=(id) => {
        return generatePath(`${editPath}`, {
            id
        });
    }

    const canArchive = (data) => {
        if(data.status=="canceled" || data.status=="received"|| data.status=="fileReceived" || data.status=="notReceived") return true;
        return false;
    }

    const canDelete = (data) => {
        if(! (data.status=="canceled" || data.status=="received"|| data.status=="fileReceived" || data.status=="notReceived" || data.status=="userAskCancel"|| data.status=="waitingForCost" ) ) return true;
        return false;
    }

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
                {requestDate(data)}
                <i className={matTypeIcon(data.reference.data.material_type)}></i>
            </Col>
            <Col sm={7} className="info">
                <NavLink to={`${requesturl(data.id)}`}>
                    <p><span className="pub_title">{data.reference.data.pub_title}</span> <span className="part_title">{data.reference.data.part_title}</span></p>
                </NavLink>
                <div className="authors">
                   {data.reference.data.first_author && <span className="first_author">Autore <span>{data.reference.data.first_author}</span></span>} 
                   <span className="pubyear">Anno <span>{data.reference.data.pubyear}</span></span>
                </div>
                {data.library && <span className="libraryLabel pr-3">
                    <span>Biblioteca</span> 
                    <span>
                    <a href="#" id={`tooltip-${data.id}-${data.library.data.id}`} className="active">{data.library_label.data.label}</a> 
                    <UncontrolledTooltip placement="right" target={`tooltip-${data.id}-${data.library.data.id}`}>
                        {data.library.data.name}
                    </UncontrolledTooltip>
                    </span>
                </span> }
                {data.delivery && <span className="delivery"><span>Delivery</span> <span>{data.delivery.data.name}</span></span>}
                {data.request_date && <span className="requestDate"><span>Data richiesta</span> <span>{formatDate(data.request_date, 'it')}</span></span>}
                {data.fullfill_date && <span className="fullfillDate"><span>Data evasione</span> <span>{formatDate(data.fullfill_date, 'it')}</span></span>}
                
                {data.reference.data.labels.data && <span className="labels-row">
                    {data.reference.data.labels.data.map(label => <span key={label.id}>{label.name}</span>)}
                </span>}
                {data.reference.data.groups.data && <span className="groups-row">
                    {data.reference.data.groups.data.map(grp => <span key={grp.id}>{grp.name}</span>)}
                </span>}
                
                
            </Col>
            
            <Col sm={2} className="icons align-self-center">
            {!data.archived && 
            <>
                {archiveRequest && canArchive(data) && <a href="#" onClick={() => archiveRequest(data.id)} className="btn btn-icon">
                    <i className="fas fa-hdd"></i>
                </a>}
                {askCancelRequest && canDelete(data) && <a href="#" onClick={() => askCancelRequest(data.id)} className="btn btn-icon">
                    <i className="fas fa-trash"></i>
                </a> }
            </>
            }
            </Col> 
        </Row>
        
    )
}

export default RequestItem