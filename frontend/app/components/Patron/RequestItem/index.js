import React, {useState, useEffect} from 'react';
import {UncontrolledTooltip, Row, Col} from 'reactstrap';
import {NavLink } from 'react-router-dom';
import { generatePath } from "react-router";
import {useIntl} from 'react-intl';
import CustomCheckBox from 'components/Form/CustomCheckBox';
import {formatDate,formatDateTime} from 'utils/dates';
import './style.scss';
import RequestIcons from '../RequestIcons';

/* TODO: una volta definito l'aspetto finale metto a posto le traduzioni */

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
                {statusDate(data)}
            </Col>
            <Col sm={7} className="info">
                <span><i className={matTypeIcon(data.reference.data.material_type)}></i></span>
                <span>
                <NavLink to={`${requesturl(data.id)}`}>
                    <span className="pub_title">{data.reference.data.pub_title}</span> &nbsp; 
                    {data.reference.data.material_type === 1 && <span className="part_title">{data.reference.data.part_title}</span>}                    
                </NavLink>
                </span>
                <div className="authors">
                   {data.reference.data.material_type != 1 && data.reference.data.authors && <span className="authors">{intl.formatMessage({id: "app.references.authors"})}<span> {data.reference.data.authors}</span></span>} 
                   {(data.reference.data.material_type === 1 || data.reference.data.material_type === 2) && data.reference.data.part_authors && <span className="authors">{intl.formatMessage({id: data.reference.data.material_type === 1 ? "app.references.authors":"app.references.part_authors"})}<span> {data.reference.data.part_authors}</span></span>}                  
                   {data.reference.data.pubyear && <span className="pubyear">{intl.formatMessage({id: "app.references.pubyear"})} <span>{data.reference.data.pubyear}</span></span>}
                </div>
                <div>
                {data.reference.data.material_type === 3 &&
                <div className="university">
                    <span className="university">{intl.formatMessage({id: "app.references.university"})}<span> {data.reference.data.publisher}</span></span>
                </div>}
                {data.reference.data.material_type === 4 &&
                <div className="geographic_area">
                    <span className="geographic_area">{intl.formatMessage({id: "app.references.geographic_area"})}<span> {data.reference.data.geographic_area}</span></span>
                </div>}
                {data.reference.data.labels.data && <span className="labels-row">
                    {data.reference.data.labels.data.map(label => <span key={label.id}>{label.name}</span>)}
                </span>}
                {data.reference.data.groups.data && <span className="groups-row">
                    {data.reference.data.groups.data.map(grp => <span key={grp.id}>{grp.name}</span>)}
                </span>}      
                </div>          
                <div className="deliveryBox">
                    {data.library && <span className="libraryLabel pr-3">
                        <span><i className="fas fa-landmark"></i></span> 
                        <span>
                        <a href="#" id={`tooltip-${data.id}-${data.library.data.id}`} className="active">{data.library_label.data.label}</a> 
                        <UncontrolledTooltip placement="right" target={`tooltip-${data.id}-${data.library.data.id}`}>
                            {data.library.data.name}
                        </UncontrolledTooltip>
                        </span>
                        {data.request_date && <span className="requestDate"><span>{formatDateTime(data.request_date, 'it')}</span></span>}
                        {data.forlibrary_note && <p className="forlibrary_note"><i className="fas fa-sticky-note"></i>Note richiesta: {data.forlibrary_note}</p>}                  
                    </span> }
                    {data.delivery && <span className="deliveryLabel pr-3">
                        <span><i className="fas fa-luggage-cart"></i></span>
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
                        <span className="deliveryReadyDate">
                            {data.delivery_ready_date && 
                                <>
                                    <span>Ritiro dal <span>{formatDateTime(data.delivery_ready_date, 'it')}</span></span> 
                                </>
                            }
                            {!data.delivery_ready_date && <span>Non ancora disponibile</span>}                                                     
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