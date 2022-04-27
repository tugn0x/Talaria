import React from 'react';
import {Row, Col, Button} from 'reactstrap';
import {useIntl} from 'react-intl';
import { generatePath } from "react-router";
import { Link } from 'react-router-dom';
import {UncontrolledTooltip} from 'reactstrap';
import {daysFromToday,formatDateTime} from '../../../utils/dates';
import {BorrowingStatus, isArchived, BorrowingReferenceIcons} from '../BorrowingItem';
import {BorrowingPatronRequest} from '../BorrowingPatronRequest';
import ReferenceCitation from '../../ReferenceCitation';
import '../BorrowingItem/style.scss';
import './style.scss';


export const requesturl=(reqPath,id,op) => {
    return generatePath(reqPath, {
        id,
        op
    });
}



export const canSavedAsDeskReceived=(data) => {
    return data.borrowing_status=="deliveringToDesk" && data.desk_delivery_format==2 //paper
}

export const canSavedAsDeskNotReceived=(data) => {
    return canSavedAsDeskReceived(data);
}

const deskReceivedFile =(data) => {
    return data.desk_delivery_format==1 && data.borrowing_status=="deskReceived";
}

const deskReceivedPaper=(data) => {
    return data.desk_delivery_format==2 && data.borrowing_status=="deskReceived";
}

const canDeliverToPatron = (data) => {
    return (deskReceivedFile(data) || deskReceivedPaper(data));
}

const documentAccess=(data) => {
    return (
        <div className="delivery_access_document_icons">
            {/* TODO: use Rabih Download component*/}
            {deskReceivedFile(data) && <button type="button" className="btn btn-primary btn-sm btn-download-icon" onClick={()=>alert("TODO: view document !")}><i className="fas fa-file"></i></button>}                
        </div>
    )
}


export const DeliveryIcons = (props) => {
    const {data,customClass,setDeskReceivedRequest,setDeskNotReceivedRequest, userNotTaken,deliverToUser }=props;    
  
    return (        
        <div className={"delivery_request_icons " + (customClass?customClass:'')}>                                                  
                {canSavedAsDeskReceived(data) && setDeskReceivedRequest && setDeskNotReceivedRequest && <><a className="btn btn-icon" onClick={()=>setDeskReceivedRequest()}><i className="fas fa-box"></i></a> <a className="btn btn-icon" onClick={()=>setDeskNotReceivedRequest()}><i className="fas fa-box-open"></i></a></>}                  
                {canDeliverToPatron(data) && 
                    <>
                    {deliverToUser && <button type="button" className="btn btn-icon" onClick={()=>deliverToUser()}><i className="fas fa-luggage-cart"></i></button>}
                    {userNotTaken && <button type="button" className="btn btn-icon" onClick={()=>userNotTaken()}><i className="fas fa-user-alt-slash"></i></button>}
                    </>
                }
        </div>
    )
}


const DeliveryItem = (props) => {
    const {editPath,data,setDeskReceivedRequest,setDeskNotReceivedRequest,userNotTaken,deliverToUser} = props   
    console.log("DeliveryItem",data)   
    const intl = useIntl();  

    return (                           
        <Row className="list-row justify-content-between">
            <Col sm={3}>
                <div className="request_id"><Link to={requesturl(editPath,data.id)} className="active"><i className="fas fa-info-circle"></i> <span>{data.id}</span></Link></div>
                <BorrowingStatus data={data} customClass="request_status"/>                                 
            </Col>
            {<Col sm={3}>
            {data.patrondocdelrequest && data.patrondocdelrequest.data &&
                <>
                    <BorrowingPatronRequest data={data}/>            
                    {!isArchived(data) && data.patrondocdelrequest.data.status=="requested" && data.patrondocdelrequest.data.request_date && <span className="daysago"><span className="badge badge-pill badge-primary">{daysFromToday(data.patrondocdelrequest.data.request_date)}</span> {intl.formatMessage({id:'app.global.daysago'})}</span>}
                </>
            }              
            </Col>}
            <Col sm={4}>                 
            <ReferenceCitation data={data.reference.data}/>
            <BorrowingReferenceIcons data={data}/>
            </Col>
            {
            <Col sm={2} className="">
            <div className="deliveryBox">                  
            {documentAccess(data)}               
            {!isArchived(data) && <DeliveryIcons customClass="icons d-flex" data={data} setDeskReceivedRequest={setDeskReceivedRequest} setDeskNotReceivedRequest={setDeskNotReceivedRequest} userNotTaken={userNotTaken} deliverToUser={deliverToUser} />}                                
            </div>
            </Col> }
        </Row>        
    )
}

export default DeliveryItem;