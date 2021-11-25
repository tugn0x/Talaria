import React from 'react';
import {Row, Col, Button} from 'reactstrap';
import {useIntl} from 'react-intl';
import { generatePath } from "react-router";
import CustomCheckBox from 'components/Form/CustomCheckBox';
import ReferenceCitation from '../../ReferenceCitation';
import RequestTags from '../RequestTags';
import './style.scss';
import { BorrowingPatronRequest } from '../BorrowingPatronRequest';
import { Link } from 'react-router-dom';
import {UncontrolledTooltip} from 'reactstrap';
import {daysFromToday,formatDateTime} from '../../../utils/dates';


export const requesturl=(reqPath,id,op) => {
    return generatePath(reqPath, {
        id,
        op
    });
}

export const statusIcon = (status) => {
    return "status-icon " + status
}

const statusDate = (req) => {
  let date="";
  switch (req.borrowing_status)
  {
      case "requested": date= req.request_date; break;

      case "newrequest": date= req.created_at; 
                         break;                             
      
      case "canceledDirect":
      case "canceled": date= req.cancel_date; 
                       break;                             
      
      case "fulfilled":       
      case "notReceived": date=req.fulfill_date; break;

      case "documentReady": date=req.ready_date; break;
       
      default: date= req.created_at; 
  }  

  /*let datearr=formatDateTime(date).split(" ");  

  let dat=datearr[0];
  let time=datearr[1];

  return (
        <>
            <i class="fas fa-clock"></i> {dat}<br/><span class="status-time">{time} </span>            
        </>
  )*/
  return (
      <>
        <div><i className="fas fa-clock"></i>{formatDateTime(date)}</div>            
        {req.forward==1 && req.forward_date && 
            <div>
                <i className="fas fa-redo"></i> {formatDateTime(req.forward_date)}
            </div>
        }
      </>
  )
}

export const canEdit = (data) => {
    return data.borrowing_status=="newrequest";
}  

export const isPatronRequest = (data) => {
    return data.patrondocdelrequest?true:false;
}


export const canArchive=(data) => {    
    return !isArchived(data) && ( 
    (data.patrondocdelrequest && data.patrondocdelrequest.data.user 
    && data.borrowing_status!="requested" && data.borrowing_status!="newrequest" && data.borrowing_status!="canceled" && data.borrowing_status!="cancelRequested")
    ||(data.borrowing_status=="canceled"||data.borrowing_status=="canceledDirect"|| data.borrowing_status=="notReceived"|| (data.borrowing_status=="documentReady" /*&& isTrashed(data) */ ) ) );
    //todo: add check on status
    //...&& (...in terminal status);
}

export const canDelete=(data) => {
    return (
        (data.borrowing_status=="newrequest" && !isPatronRequest(data))
    );    
}

export const canCancel=(data) => {
    return (
        data.borrowing_status=="requested" && !isPatronRequest(data) // || (other "pending" states) 
        )
}

export const canForward=(data)=>{
    return canArchive(data)
}



export const isArchived=(data) => {
    return data.archived  // || (other "pending" states)
}

export const isTrashed=(data) => {
    return data.trash_date
}

export const inRequest=(data) => {
    return (data.request_date!=null)    
}

export const canRequest=(data) => {
    return data.borrowing_status=="newrequest"
}

export const canDownload=(data) => {
    return !isTrashed(data) && data.borrowing_status=="documentReady" //&& data.file_download==0 //non stampato     
}

/*
export const docDownloaded=(data)=>{
    return data.borrowing_status=="documentReady" && data.file_download==1       
}

export const isURL=(data)=>{
    return data.borrowing_status=="documentReady" //&& ( is an url )       
}*/

export const canRegisterAsReceived=(data) => {
    return data.borrowing_status=="fulfilled" /* && delivery_format=="paperCopy"*/
}

export const canTrash=(data) => {
    return !isTrashed(data) && data.borrowing_status=="documentReady"     
}



const mustCheckData=(data) => {
    return (
        (data.reference.data.material_type==1 && !data.reference.data.issn)||
        (data.reference.data.material_type==2 && !data.reference.data.isbn)
    )        
}



export const BorrowingStatus = (props) => {

    const intl = useIntl();

    const {data,customClass}=props;

    return (
        <div className={"borrowing_status " + (customClass?customClass:'')}>            
            <span className={statusIcon(data.borrowing_status)}></span> 
            <span className="status-text">{data.borrowing_status ? intl.formatMessage({id: "app.requests."+data.borrowing_status}):'xxx'}
            </span>        
            <span className="status-date">{statusDate(data)}</span>   
            {isTrashed(data) && <span className="status-date"><i className="fas fa-trash"></i> {data.trash_date}</span>}                   
            {data.operator && <div className="status-operator">
                <i className="fas fa-user-cog"></i> { data.operator.data.full_name}
            </div>}
        </div>
    )
}

export const BorrowingReferenceIcons = (props) => {
    const {data,reqPath,findAndUpdateOABorrowingReference,oaloading,findISSNISBNtoggle}=props;    

    const issn_search_enabled=(process.env.ISSN_SEARCH && process.env.ISSN_SEARCH=="true")?true:false;
    const isbn_search_enabled=(process.env.ISBN_SEARCH && process.env.ISBN_SEARCH=="true")?true:false;

    const findAndUpdateOA = (ev) => {       
        ev.preventDefault();

        if(findAndUpdateOABorrowingReference)
            findAndUpdateOABorrowingReference();
    }

    return (
        !isArchived(data) && <div className="borrowing_reference_icons">
                {canEdit(data) && <Link className="btn btn-icon" to={requesturl(reqPath,data.id,'edit')}><i className="fas fa-edit"></i></Link>}
                {data.reference.data.oa_link && <a href={data.reference.data.oa_link} target="_blank" className='btn btn-icon'><i className="icon-oa"></i></a>} 
                {canRequest(data) && !oaloading && !data.reference.data.oa_link && <a target="_blank" className='btn btn-icon' onClick={(ev) => findAndUpdateOA(ev) }><i className="fas fa-search"></i>OA</a>}
                {(issn_search_enabled || isbn_search_enabled ) && canRequest(data) &&  mustCheckData(data) && <a target="_blank" className='btn btn-icon' onClick={()=>findISSNISBNtoggle()} title="checkISSN/ISBN"><i className="fas fa-keyboard"></i></a>}
                {canRequest(data) &&  !mustCheckData(data) && <span className="btn btn-icon"><i className="fas fa-check-double"></i></span>}
                {canRequest(data) && oaloading && <i className="fas fa-spinner fa-spin"></i>}                
                {canRequest(data) && <a className="btn btn-icon" onClick={()=>alert('TODO !')}><i className="fa fa-search-location"></i></a>}                
                {canDownload(data) && <a className="btn btn-icon" onClick={()=>alert("TODO: download & VIEW document !")}><i className="fas fa-download"></i></a>}                
                {/* add paper/url/.. type checking and button activation to manage*/}
        </div>
    )
}

export const BorrowingRequestIcons = (props) => {
    const {data,reqPath,forwardRequest,askTrashRequest,askCancelRequest,askArchiveRequest,customClass}=props;    
 
    return (
        <div className={"borrowing_request_icons " + (customClass?customClass:'')}>
                <Link to={requesturl(reqPath,data.id)} className="btn btn-icon"><i className="fas fa-eye"></i></Link>                               
                {canRequest(data) && <Link className="btn btn-icon" to={requesturl(reqPath,data.id)}><i className="fas fa-share"></i></Link>}
                {canCancel(data) && askCancelRequest && <a className="btn btn-icon" onClick={()=>askCancelRequest(data.id)}><i className="fas fa-times"></i></a>}                
                {canDelete(data) && askCancelRequest && <a className="btn btn-icon" onClick={()=>askCancelRequest(data.id)}><i className="fas fa-backspace"></i></a>}                                                
                {canTrash(data) && askTrashRequest && 
                    <>
                        <a className="btn btn-icon" onClick={()=>askTrashRequest(data.id,1)}><i className="fas fa-trash"></i></a>
                        <a className="btn btn-icon" onClick={()=>askTrashRequest(data.id,2)}><i className="fas fa-trash">HC</i></a>
                    </>
                }                
                {canForward(data) && forwardRequest && <a className="btn btn-icon" onClick={()=>forwardRequest(data.id)}><i className="fas fa-redo"></i></a>}                
                {canArchive(data) && askArchiveRequest && <a className="btn btn-icon" onClick={()=>askArchiveRequest(data.id)}><i className="fas fa-hdd"></i></a>}                
                
                {/* add paper/url/.. type checking and button activation to manage*/}
        </div>
    )
}


const BorrowingItem = (props) => {
    const {editPath,data,toggleSelection,checked,removeTag,deleteReference,findAndUpdateOABorrowingReference,oaloading,askCancelRequest,askArchiveRequest,forwardRequest,askTrashRequest,findISSNISBNtoggle} = props      
    const intl = useIntl();  

    return (
        <Row className="list-row justify-content-between">
            <Col sm={2}>
                <CustomCheckBox 
                    handleChange={toggleSelection}
                    checked={checked}
                /> 
                <div className="request_id">
                <Link to={requesturl(editPath,data.id)} className="active">ID: <span>{data.id}</span></Link></div>
                <BorrowingStatus data={data} customClass="request_status"/>                 
                {data.borrowing_notes && <div className="borrowing_notes">
                <a href="#" id={`tooltip-${data.id}`} className="active"><i className="fas fa-sticky-note"></i></a> 
                <UncontrolledTooltip autohide={false} placement="right" target={`tooltip-${data.id}`}>
                    {data.borrowing_notes}
                </UncontrolledTooltip>                                
                </div>}
            </Col>
            <Col sm={2}>
            {data.patrondocdelrequest && data.patrondocdelrequest.data &&
                <BorrowingPatronRequest data={data}/>            
            }              
            </Col>
            <Col sm={5}>      
            <RequestTags data={data.tags.data} removeTag={removeTag}/>                 
            <ReferenceCitation data={data.reference.data}/>
            <BorrowingReferenceIcons data={data} reqPath={editPath} findAndUpdateOABorrowingReference={findAndUpdateOABorrowingReference} oaloading={oaloading} findISSNISBNtoggle={findISSNISBNtoggle} />                
            </Col>
            <Col sm={3} className="">
            <div className="lendersbox">
            {inRequest(data) &&             
            <>
               {data.lendingLibrary && data.lendingLibrary.data.id>0  && 
                <span>
                    <i className="fas fa-landmark"></i> {data.lendingLibrary.data.name}
                </span>                
               }
               {!data.lendingLibrary && data.all_lender==1 &&
                <span>
                    <i className="fas fa-cloud"></i> {intl.formatMessage({id:'app.global.alllibraries'})} 
                </span>
               }
               {!isArchived(data) && data.request_date && <span className="daysago"><span className="badge badge-pill badge-primary">{daysFromToday(data.request_date)}</span> {intl.formatMessage({id:'app.global.daysago'})}</span>}                              
               <span className="fullfilment">{data.lending_status ? intl.formatMessage({id: "app.requests."+data.lending_status}):'xxx'}</span>   
            </>}
            {inRequest(data) &&             
            data.fulfill_note && <div className="fulfill_notes">
                <a href="#" id={`fulfilnote-${data.id}`} className="active"><i className="fas fa-sticky-note"></i></a> 
                <UncontrolledTooltip autohide={false} placement="right" target={`fulfilnote-${data.id}`}>
                    {data.fulfill_note}
                </UncontrolledTooltip>                                
            </div>}            
            <BorrowingRequestIcons customClass="icons d-flex" data={data} reqPath={editPath} forwardRequest={forwardRequest} askTrashRequest={askTrashRequest} askCancelRequest={askCancelRequest} askArchiveRequest={askArchiveRequest}/>                                
            </div>
            </Col> 
        </Row>
    )
}

export default BorrowingItem