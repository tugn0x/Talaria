import React, { useState } from 'react';
import {Row, Col, Button} from 'reactstrap';
import {useIntl} from 'react-intl';
import { generatePath } from "react-router";
import CustomCheckBox from 'components/Form/CustomCheckBox';
import ReferenceCitation from '../../ReferenceCitation';
import FileDownload from '../../../containers/FileDownload';
//import FileDownload from '../FileDownload'
import RequestTags from '../RequestTags';
import './style.scss';
import { Link } from 'react-router-dom';
import {UncontrolledTooltip} from 'reactstrap';
import {daysFromToday,formatDateTime} from '../../../utils/dates';
import {isURL,deliveryMethod,lendingUnfilledReason} from '../BorrowingItem';

const requesturl=(reqPath,id,op) => {
    return generatePath(reqPath, {
        id,
        op
    });
}

const statusIcon = (status) => {
    return "status-icon " + status
}


export const documentAccess=(data) => {
    return (
        <div className="access_document_icons">
                
        {isURL(data) && <a href className="btn btn-primary btn-sm btn-download-icon" target="_blank" href={data.url}><i className="fa-solid fa-arrow-up-right-from-square"></i></a>}         
        </div>
    )
}


const statusInfo = (req) => {
 
  /*let date="";
  switch (req.lending_status)
  {
      case "willSupply": 
      case "requestReceived": date= req.request_date; break;      
      
      case "cancelRequested":  date= req.cancel_request_date; break;

      case "canceledAccepted": date= req.cancel_date; 
                              break;                             

      case "unFilled": 
      case "copyCompleted": date= req.fulfill_date; break;                                                           
      
      default: date= req.created_at; 
  }  */

  return (
      <>
        {req.created_at && <span className="status-date"><i className="fa-solid fa-plus"></i> {formatDateTime(req.created_at)}</span>}        
        {req.request_date && <span className="status-date">
            <i className="fa-solid fa-share"></i> {formatDateTime(req.request_date)}
            {req.request_note && <div className="request_note">
                <span id={`request_note-${req.id}`} className="active"><i className="fa-solid fa-note-sticky"></i></span> 
                <UncontrolledTooltip autohide={false} placement="right" target={`request_note-${req.id}`}>
                    {req.request_note}
                </UncontrolledTooltip>                                
            </div>}                     
        </span>} 

        <>            
            {req.fulfill_date && 
                <span className="status-date">
                    <i className="fa-solid fa-reply"></i> {formatDateTime(req.fulfill_date)}  
                    {req.fulfill_type && <span className="deliverymethod">{deliveryMethod(req)}</span> }                                
                    {req.notfulfill_type && <div className="unfilled_reason">
                    <span id={`unfilled_reason-${req.id}`} className="active"><i className="fa-solid fa-comment text-danger"></i></span> 
                            <UncontrolledTooltip autohide={false} placement="right" target={`unfilled_reason-${req.id}`}>
                                {lendingUnfilledReason(req)}
                            </UncontrolledTooltip>                                
                    </div>}
                    {req.fulfill_note && <div className="fulfill_notes">
                        <span id={`fulfilnote-${req.id}`} className="active"><i className="fa-solid fa-note-sticky"></i></span> 
                        <UncontrolledTooltip autohide={false} placement="right" target={`fulfilnote-${req.id}`}>
                            {req.fulfill_note}
                        </UncontrolledTooltip>                                
                    </div>}                    
                </span>
            }
            {req.borrowing_status=="documentReady" && req.ready_date && <span className="status-date"><i className="fa-solid fa-circle-check"></i> {formatDateTime(req.ready_date)} </span>}
            {req.borrowing_status=="documentNotReady" && req.ready_date && <span className="status-date"><i className="fa-solid fa-xmark-circle"></i> {formatDateTime(req.ready_date)} </span>}            
        </>
        {req.cancel_request_date && <span className="status-date"><i className="fa-solid fa-xmark"></i><i className="fa-solid fa-question"></i> {formatDateTime(req.cancel_request_date)}</span>}
        {req.cancel_date && <span className="status-date"><i className="fa-solid fa-xmark"></i> {formatDateTime(req.cancel_date)}</span>}

        {req.lending_archived==1 && req.lending_archived_date && 
            <span className="status-date"><i className="fa-solid fa-hard-drive"></i> {formatDateTime(req.lending_archived_date)}</span>            
        }

      </>
  )
}


const isRequestReceived=(data) => {
    return data.lending_status=="requestReceived";
}

const isRequestedByMe=(data,libraryId) => {
    return data.borrowing_library_id==libraryId;
}

export const isArchived=(data) => {
    return data.lending_archived
}



export const LendingStatus = (props) => {

    const intl = useIntl();
    const {data,customClass}=props;

    return (
     
        <div className={"lending_status " + (customClass?customClass:'')}>            
            
            <span className={statusIcon(data.lending_status)}></span> 
            <span className="status-text">{data.lending_status ? intl.formatMessage({id: "app.requests."+data.lending_status}):'Pending Request'}
            </span>       
            {
            data.operator && <div className="status-operator">
                <i className="fa-solid fa-user-cog"></i> { 
                data.operator.data.full_name
                }
                
                {data.lending_notes && <span className="lending_notes">
                <a href="#" id={`tooltip-${data.id}`} className="active"><i className="fa-solid fa-note-sticky"></i></a> 
                <UncontrolledTooltip autohide={false} placement="right" target={`tooltip-${data.id}`}>
                    {data.lending_notes}
                </UncontrolledTooltip>                                
                </span>}
            </div>
            }            
            {statusInfo(data)}
            {
                //DEBUG fileDownloader:
                //data.filehash && <FileDownload  reqid={data.id} libraryid={data.library.data.id} filehash={data.filehash} customClass="detail-body" />
            } 
        </div>
    )
}

const LendingRequestIcons = (props) => {
    const {match, data,reqPath,UpdateLendingRequestStatus, UpdateLendingAcceptRequest}=props;    
    const libraryId=match.params.library_id
    return (
        <div className="lending_request_icons icons d-flex">                        
                {isRequestReceived(data) && (data.all_lender==null|| data.all_lender==0)  && 
                    <>
                        <a className="btn btn-icon"  onClick={()=>UpdateLendingRequestStatus(data)}><i className="fa-solid fa-parachute-box"></i></a>
                        <Link className="btn btn-icon" to={requesturl(reqPath,data.id)}><i className="fa-solid fa-ban"></i></Link>
                    </>
                }
                {(data.all_lender==null || data.all_lender==0) && data.lending_archived==null && data.lending_status=="willSupply" && 
                <Link className="btn btn-icon" to={requesturl(reqPath,data.id)}><i className="fa-solid fa-book-open"></i></Link>}
                {(data.all_lender==null || data.all_lender==0) && data.lending_status=="cancelRequested" && <Link className="btn btn-icon" to={requesturl(reqPath,data.id)}><i className="fa-solid fa-book-open"></i></Link>}
                {(data.all_lender==null || data.all_lender==0) && data.lending_status=="cancelRequested" && <a className="btn btn-icon" onClick={()=>UpdateLendingRequestStatus(data)}><i className="far fa-check-circle"></i></a>}
                {(data.all_lender==1) && isRequestReceived(data) && !isRequestedByMe(data,libraryId) && <a className="btn btn-icon" onClick={()=>UpdateLendingAcceptRequest(data)}><i className="fa-solid fa-parachute-box"></i></a>}

                {documentAccess(data)}
        </div>
    )
}

const LendingReferenceIcons = (props) => {
    const {data}=props;    

    return (
        !isArchived && 
            <div className="lending_reference_icons">               
                    <a className="btn btn-icon" onClick={()=>alert('TODO Check holding !')}><i className="fa-solid fa-magnifying-glass-location"></i></a>                                    
            </div>
    )
}

const LendingItem = (props) => {    
    const {match,editPath,data,toggleSelection,checked,removeTag, UpdateLendingRequestStatus, UpdateLendingAcceptRequest} = props      
    const intl = useIntl();  

    return (
        <Row className="list-row justify-content-between">
            <Col sm={3}>
                <CustomCheckBox 
                    handleChange={toggleSelection}
                    checked={checked}
                /> 
              
              <div className="request_id">
                        <Link to={requesturl(editPath,data.id)} className="active"><i className="fa-solid fa-circle-info"></i> <span>{data.id}</span></Link>
                        </div>
                        <LendingStatus data={data} customClass="request_status"/>                                                                             
            </Col>
            <Col sm={3}>
            <>
               {data.borrowinglibrary && 
                <span>
                    <i className="fa-solid fa-landmark"></i> {data.borrowinglibrary.data.name}
                    
                </span>                
               }                        
               {!isArchived(data) && data.request_date && <span className="daysago"><span className="badge badge-pill badge-primary">{daysFromToday(data.request_date)}</span> {intl.formatMessage({id:'app.global.daysago'})}</span>}
               
               {/* <span className="fullfilment">...[Static fulfilled/unfilled status]...</span>               */}
            </>                                      
            </Col>
            
          
            <Col sm={4}>      
            {data.tags && <RequestTags data={data.tags.data} removeTag={!isArchived(data)?removeTag:null}/>}
            <ReferenceCitation data={data.reference.data}/>
            <LendingReferenceIcons data={data} />                
            </Col>
            <Col sm={2}>
            <LendingRequestIcons match={match} data={data} reqPath={editPath} 
            UpdateLendingRequestStatus={(data) => UpdateLendingRequestStatus(data)}             
            UpdateLendingAcceptRequest={(data) => UpdateLendingAcceptRequest(data)}            
            />
            </Col> 
        </Row>
    )
}

export default LendingItem