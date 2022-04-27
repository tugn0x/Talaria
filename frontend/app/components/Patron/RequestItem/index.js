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
import {PatronRequestData, PatronRequestStatus,deliveryFormat} from '../PatronRequest';

/* TODO: una volta definito l'aspetto finale metto a posto le traduzioni */

const RequestItem = (props) => {
    const {data, editPath,toggleSelection,checked,archiveRequest,askCancelRequest,acceptCost,denyCost} = props
    const intl = useIntl();

    const statusIcon = (status) => {
        return "status-icon " + status
    }


    const isArchived=(data) => {
        return data.archived 
    }

    const isFile=(data) => {
        return data.delivery_format && data.delivery_format==1 
    }

    const isPaper=(data) => {
        return data.delivery_format && data.delivery_format==2
    }
    
    const isURL=(data) => {
        return data.delivery_format && data.delivery_format==3
    }


  const documentAccess=(data) => {
    return (
        <div className="access_document_icons">
        
        {!isArchived(data) && data.status=="received" && isFile(data) && <button type="button" className="btn btn-primary btn-sm btn-download-icon" onClick={()=>alert("TODO: view document !")}><i className="fas fa-file"></i></button>}                
      
        {isURL(data) && data.status=="received" && <button type="button" className="btn btn-primary btn-sm btn-download-icon" onClick={()=>alert("TODO: open url !")}><i className="fas fa-external-link-alt"></i></button>}         
        </div>
    )
}
    
    
    /*const requesturl=(id) => {
        return generatePath(`${editPath}`, {
            id
        });
    }*/

    return ( 
        <Row className="list-row justify-content-between">                        
            <Col sm={3}>
                {toggleSelection && <CustomCheckBox className="select-checkbox"
                    handleChange={toggleSelection}
                    checked={checked}
                />} 
               <div className="request_id active"><i className="fas fa-info-circle"></i> <span>{data.id}</span></div>               
               <div className="patronrequest_status">
                <span className={statusIcon(data.status)}></span> 
                <span className="status-text">{intl.formatMessage({id: "app.requests."+data.status})}</span>        
               </div>
               <PatronRequestStatus data={data}/>
               <PatronRequestData data={data}/>  
            </Col>
            <Col sm={7}>                
                <ReferenceTags data={data.reference.data}/>              
                <ReferenceCitation data={data.reference.data}/>                                                   
            </Col>
            
            <Col sm={2} className="icons align-self-center">
                {documentAccess(data)}    
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