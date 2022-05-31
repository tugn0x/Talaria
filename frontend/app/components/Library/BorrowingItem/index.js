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
import {documentAccess as patronRequestDocumentAccess}  from '../../Patron/PatronRequest';
import FileDownload from '../../../containers/FileDownload';


export const requesturl=(reqPath,id,op) => {
    return generatePath(reqPath, {
        id,
        op
    });
}

export const statusIcon = (status) => {
    return "status-icon " + status
}

export const deliveryMethod=(data) => {
    let intl=useIntl();
    let icon=""
    let alt="";
    switch (data.fulfill_type) {
        case 1: icon="fa-file"; alt=intl.formatMessage({id: "app.requests.deliveryMethod.file"}); break;
        case 2: icon="fa-envelope"; alt=intl.formatMessage({id: "app.requests.deliveryMethod.mail"}); break;
        case 3: icon="fa-fax"; alt=intl.formatMessage({id: "app.requests.deliveryMethod.fax"}); break;
        case 4: icon="fa-external-link-alt"; alt=intl.formatMessage({id: "app.requests.deliveryMethod.url"}); break;
        case 5: icon="Article Exch."; alt=intl.formatMessage({id: "app.requests.deliveryMethod.articleexchange"}); break;
        case 6: icon="Other"; alt=intl.formatMessage({id: "app.requests.deliveryMethod.other"}); break;
    }
    
    if(data.fulfill_type && data.fulfill_type<=4) return <i title={alt} className={"simple_icon fas "+icon}></i>;     
    if(data.fulfill_type && data.fulfill_type>=5) return alt?<span>({alt})</span>:'';
    
    return '';
    
}

export const deskDeliveryFormat=(data) => {
    let intl=useIntl();
    let icon=""
    let alt="";
    switch (data.desk_delivery_format) {
        case 1: icon="fa-file"; alt=intl.formatMessage({id: "app.requests.desk_delivery_format.file"}); break;
        case 2: icon="fa-envelope"; alt=intl.formatMessage({id: "app.requests.desk_delivery_format.mail"}); break;        
    }
    
    return <i title={alt} className={"simple_icon fas "+icon}></i>;         
}



export const lendingUnfilledReason = (data) => {
    let intl=useIntl();
    let ret=""
    switch (data.notfulfill_type) {
        case 1: ret=intl.formatMessage({id: "app.requests.notfulfill_type.NotAvailableForILL"}); break;
        case 2: ret=intl.formatMessage({id: "app.requests.notfulfill_type.NotHeld"}); break;
        case 3: ret=intl.formatMessage({id: "app.requests.notfulfill_type.NotOnShelf"}); break;
        case 4: ret=intl.formatMessage({id: "app.requests.notfulfill_type.ILLNotPermittedByLicense"}); break;
        case 5: ret=intl.formatMessage({id: "app.requests.notfulfill_type.WrongRef"}); break;
        case 6: ret=intl.formatMessage({id: "app.requests.notfulfill_type.MaxReqNumber"}); break; 
        case 7: ret=intl.formatMessage({id: "app.requests.notfulfill_type.Other"}); break;
    }
    //return ret!=""?<><i className="fas fa-comment text-danger"></i> {ret}</>:'';
    return ret;
}

export const documentAccess=(data) => {
    return (
        <div className="access_document_icons">
            
        {!isArchived(data) && isFile(data) && !canSavedAsDownloaded(data) && data.borrowing_status=="fulfilled"  && <button type="button" className="btn btn-warning btn-sm"><i className="fas fa-hourglass-half"></i> (waiting HC)</button>}   
        
        {!isArchived(data) && isFile(data) &&  data.filehash &&            
            <FileDownload  reqid={data.id} libraryid={data.library.data.id} filehash={data.filehash} customClass="detail-body" />
        }                
      
        {isURL(data) && <a href className="btn btn-primary btn-sm btn-download-icon" target="_blank" href={data.url}><i className="fas fa-external-link-alt"></i></a>}         
        </div>
    )
}

const statusInfo = (req) => {
  /*let date="";
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

      case "documentReady":
      case "documentNotReady": date=req.ready_date; break;

      case "notDeliveredToUser":
      case "notDeliveredToUserDirect": date=req.user_delivery_date; break;
       
      default: date= req.created_at; 
  }  */

  return (
      <>
        {req.created_at && <span className="status-date"><i className="fas fa-plus"></i> {formatDateTime(req.created_at)}</span>}        
        {req.request_date && <span className="status-date">
            <i className="fas fa-share"></i> {formatDateTime(req.request_date)}
            {req.request_note && <div className="request_note">
                <span id={`request_note-${req.id}`} className="active"><i className="fas fa-sticky-note"></i></span> 
                <UncontrolledTooltip autohide={false} placement="right" target={`request_note-${req.id}`}>
                    {req.request_note}
                </UncontrolledTooltip>                                
            </div>}                     
        </span>}        
        {/*(req.borrowing_status=="fulfilled"||req.borrowing_status=="notReceived" ||
         req.borrowing_status=="documentReady"||req.borrowing_status=="documentNotReady" ||
         req.borrowing_status=="notDeliveredToUser"||req.borrowing_status=="notDeliveredToUserDirect") &&*/
        
        <>            
            {req.fulfill_date && 
                <span className="status-date">
                    <i className="fas fa-reply"></i> {formatDateTime(req.fulfill_date)}  
                    {req.fulfill_type && <span className="deliverymethod">{deliveryMethod(req)}</span> }                                
                    {req.notfulfill_type && <div className="unfilled_reason">
                    <span id={`unfilled_reason-${req.id}`} className="active"><i className="fas fa-comment text-danger"></i></span> 
                            <UncontrolledTooltip autohide={false} placement="right" target={`unfilled_reason-${req.id}`}>
                                {lendingUnfilledReason(req)}
                            </UncontrolledTooltip>                                
                    </div>}                    
                    {req.fulfill_note && <div className="fulfill_notes">
                        <span id={`fulfilnote-${req.id}`} className="active"><i className="fas fa-sticky-note"></i></span> 
                        <UncontrolledTooltip autohide={false} placement="right" target={`fulfilnote-${req.id}`}>
                            {req.fulfill_note}
                        </UncontrolledTooltip>                                
                    </div>}
                </span>
            }
            {req.borrowing_status=="documentReady" && req.ready_date && <span className="status-date"><i className="fas fa-check-circle"></i> {formatDateTime(req.ready_date)} </span>}
            {req.borrowing_status=="documentNotReady" && req.ready_date && <span className="status-date"><i className="fas fa-times-circle"></i> {formatDateTime(req.ready_date)} </span>}            
        </>
        }              
        {req.cancel_request_date && <span className="status-date"><i className="fas fa-times"></i><i className="fas fa-question"></i> {formatDateTime(req.cancel_request_date)}</span>}
        {req.cancel_date && <span className="status-date"><i className="fas fa-times"></i> {formatDateTime(req.cancel_date)}</span>}
       
        {req.forward==1 && req.forward_date && 
            <span className="status-date"><i className="fas fa-redo"></i> {formatDateTime(req.forward_date)}</span>            
        }
       
        {req.download==1 && req.download_date && 
            <span className="status-date"><i className="fas fa-download"></i> {formatDateTime(req.download_date)}</span>            
        }

        {req.trash_date && <span className="status-date"><i className="fas fa-trash text-danger"></i> {formatDateTime(req.trash_date)}</span>}   
        
        {req.desk_delivery_date && <span className="status-date">
            <i className="fas fa-truck-loading"></i> {formatDateTime(req.desk_delivery_date)}
            {req.desk_delivery_format && <span className="deskDeliveryFormat">{deskDeliveryFormat(req)}</span>}
        </span>}  
        {req.desk_received_date && <span className="status-date"><i className="fas fa-box-open"></i> {formatDateTime(req.desk_received_date)}</span>}
        
        {req.user_delivery_date && <span className="status-date"><i className="fas fa-luggage-cart"></i> {formatDateTime(req.user_delivery_date)} </span>}                                                                              
        
        {req.archived==1 && req.archived_date && 
            <span className="status-date"><i className="fas fa-hdd"></i> {formatDateTime(req.archived_date)}</span>            
        }
               
      </>
  )
}

export const canEdit = (data) => {
    return data.borrowing_status=="newrequest";
}  

export const isPatronRequest = (data) => {
    return data.patrondocdelrequest && data.patrondocdelrequest.data.user ?true:false;
}


export const canArchive=(data) => {    
    return !isArchived(data) && 
    ( 
        (
            isPatronRequest(data) && (data.borrowing_status=="canceled" || data.borrowing_status=="canceledDirect") 
        )
        ||
        (
            !isPatronRequest(data) && 
            (
                data.borrowing_status=="canceled"|| data.borrowing_status=="notReceived" || 
                (data.borrowing_status=="documentReady" && isTrashed(data)) ||
                (data.borrowing_status=="documentReady" && hasBeenDownloaded(data)) ||
                (data.borrowing_status=="documentReady" && !(isFile(data) || isURL(data) ) ) ||
                (data.borrowing_status=="documentNotReady" && !(isFile(data) || isURL(data) ))
                

            ) 
        )     
    );    
}

export const hasParentRequest=(data) => {
    return data.docdel_request_parent_id!=null && data.docdel_request_parent_id>0;
}

export const canDelete=(data) => {
    return (
        (data.borrowing_status=="newrequest" && !isPatronRequest(data) && !hasParentRequest(data))
    );    
}

export const canCancel=(data) => {
    return (
        data.borrowing_status=="requested" && !isPatronRequest(data) 
        )
}

//OK
export const canForward=(data)=>{
   /*return (data.patrondocdelrequest && data.patrondocdelrequest.data.user 
     && ( data.borrowing_status!="requested" && data.borrowing_status!="newrequest" && data.borrowing_status!="canceledDirect" && data.borrowing_status!="canceled")
     )
     ||
     (!data.patrondocdelrequest && canArchive(data)
     )      */
     return ( (!isArchived(data) && (data.borrowing_status=="notReceived" || data.borrowing_status=='canceled') || (data.borrowing_status=="documentNotReady")) || (canArchive(data) && isTrashed(data) ) );
            
}

export const canRequest=(data) => {
    return data.borrowing_status=="newrequest"
}

export const canSavedAsReceived=(data) => {
    return data.borrowing_status=="fulfilled"  && !(isFile(data)||isURL(data))
}

export const canSavedAsNotReceived=(data) => {
    return canSavedAsReceived(data);
}

export const canTrash=(data) => {
    return !isArchived(data) && !isTrashed(data) && data.borrowing_status=="documentReady" && ( !(isFile(data)||isURL(data)) || ( (isFile(data)||isURL(data)) && hasBeenDownloaded(data) ) )    
}

//means "document downloaded/or accessed by url"
export const canSavedAsDownloaded=(data) => {
    return (!isTrashed(data) && data.borrowing_status=="documentReady" && (isFile(data)||isURL(data)) && !hasBeenDownloaded(data));
}
 
export const isArchived=(data) => {
    return data.archived 
}

export const isTrashed=(data) => {
    return data.trash_date
}

export const inRequest=(data) => {
    return (data.request_date!=null)    // && not in final status 
}

export const isFile=(data) => {
    return data.fulfill_type && data.fulfill_type==1 
}

export const isMail=(data) => {
    return data.fulfill_type && data.fulfill_type==2 
}

export const isURL=(data) => {
    return data.fulfill_type && data.fulfill_type==4 /* && data.url!='' */
}

export const isFAX=(data) => {
    return data.fulfill_type && data.fulfill_type==3 
}

export const isArticleExchange=(data) => {
    return data.fulfill_type && data.fulfill_type==5
}

export const isOther=(data) => {
    return data.fulfill_type && data.fulfill_type==6
}

export const hasBeenDownloaded=(data) => {
    return data.borrowing_status=="documentReady" && data.download && data.download==1
}

export const canPatronReqDirectManaged=(data)=> {
    return isPatronRequest(data) && !isArchived(data) && !data.lendingLibrary
}

export const canFulfillToPatron=(data)=> {
    return isPatronRequest(data) && 
        (
            (data.borrowing_status=="documentReady" && (isFile(data)||isURL(data)) && hasBeenDownloaded(data))||
            (!isFile(data) && !isURL(data) && data.borrowing_status=="documentReady")
        )    
}

export const canUnfillToPatron=(data)=> {
    return (isPatronRequest(data) && (data.borrowing_status=="documentNotReady" || data.borrowing_status=="notReceived"));
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
            <span className="status-text">{data.borrowing_status ? intl.formatMessage({id: "app.requests."+data.borrowing_status}):'xxx'}</span>                    
            {data.operator && <div className="status-operator">
                <i className="simple_icon fas fa-user-cog"></i> { data.operator.data.full_name}
                {data.borrowing_notes && <span className="borrowing_notes">
                <span id={`tooltip-${data.id}`} className="active"><i className="fas fa-sticky-note"></i></span> 
                <UncontrolledTooltip autohide={false} placement="right" target={`tooltip-${data.id}`}>
                    {data.borrowing_notes}
                </UncontrolledTooltip>                                
                </span>}
            </div>}            
            {statusInfo(data)}              
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
                {canRequest(data) && (issn_search_enabled || isbn_search_enabled ) && mustCheckData(data) && <a target="_blank" className='btn btn-icon' onClick={()=>findISSNISBNtoggle()} title="checkISSN/ISBN"><i className="fas fa-keyboard"></i></a>}
                {canRequest(data) &&  !mustCheckData(data) && <span className="btn btn-icon"><i className="fas fa-check-double"></i></span>}
                {canRequest(data) && oaloading && <i className="fas fa-spinner fa-spin"></i>}                
                {canRequest(data) && <a className="btn btn-icon" onClick={()=>alert('TODO Check holding !')}><i className="fa fa-search-location"></i></a>}                                                                         
        </div>
    )
}

export const BorrowingRequestIcons = (props) => {
    const {data,reqPath,forwardRequest,askTrashRequest,askCancelRequest,deleteRequest,askArchiveRequest,askArchiveRequestAsNotReceived,customClass,savedAsDownloaded,setReceivedRequest,setNotReceivedRequest}=props;    
  
    return (        
        <div className={"borrowing_request_icons " + (customClass?customClass:'')}>                                                  

                {/*<Link to={requesturl(reqPath,data.id)} className="btn btn-icon"><i className="fas fa-eye"></i></Link>*/}                              
                {canRequest(data) && <Link className="btn btn-icon" to={requesturl(reqPath,data.id,"request")}><i className="fas fa-share"></i></Link>}
                {canCancel(data) && askCancelRequest && <a className="btn btn-icon" onClick={()=>askCancelRequest()}><i className="fas fa-times"></i></a>}                
                {canDelete(data) && deleteRequest && <a className="btn btn-icon" onClick={()=>deleteRequest()}><i className="fas fa-backspace"></i></a>}                                                
                {canTrash(data) && askTrashRequest && <a className="btn btn-icon" onClick={()=>askTrashRequest(1)}><i className="fas fa-trash"></i></a>}                
                {canForward(data) && forwardRequest && <a className="btn btn-icon" onClick={()=>forwardRequest()}><i className="fas fa-redo"></i></a>}                
                {canArchive(data) && askArchiveRequest && <a className="btn btn-icon" onClick={()=>askArchiveRequest()}><i className="fas fa-hdd"></i></a>}                                                
                                   
                
                
                {canSavedAsDownloaded(data) && savedAsDownloaded && (isFile(data)||isURL(data)) &&
                        <a className="btn btn-icon" onClick={()=>savedAsDownloaded()}><i className="fas fa-arrow-circle-right"></i></a>                   
                }                
                
                {canSavedAsReceived(data) && setReceivedRequest && setNotReceivedRequest && <><a className="btn btn-icon" onClick={()=>setReceivedRequest()}><i className="fas fa-box"></i></a> <a className="btn btn-icon" onClick={()=>setNotReceivedRequest()}><i className="fas fa-box-open"></i></a></>}                                
                
                {/*casi di evasione/inevasione a patron DIRETTA*/}
                {canPatronReqDirectManaged(data) && canRequest(data) &&
                <>
                    <Link className="btn btn-icon" to={requesturl(reqPath,data.id,'deliver')}>
                        <i className="fas fa-truck text-info"></i> 
                    </Link>                                     
                </>
                }    
                {/*casi di evasione/inevasione a patron DOPO DD*/}
                {canFulfillToPatron(data) &&  <Link className="btn btn-icon" to={requesturl(reqPath,data.id,'deliver')}><i className="fas fa-truck text-success"></i></Link>}                                                
                {canUnfillToPatron(data) && <Link className="btn btn-icon" to={requesturl(reqPath,data.id,'deliver')}>
                <span className="fa-stack"><i className="fas fa-truck fa-stack-2x text-warning"></i><i className="fas fa-times fa-stack-2x"></i></span>
                </Link>}                                
                
                {/*casi di evasione/inevasione SENZA patron DOPO DD*/}
                

                {/*casi di archiviazione come inevasione SENZA patron DIRETTA dopo diversi forward/inevasioni dd
                sembra un caso di "DIRETTA" ma solo perchè è una nuova richiesta ma di fatto è collegata alle altre
                x cui il dd c'e' stato!*/}
                {!isPatronRequest(data) && hasParentRequest(data) && !isArchived(data) && canRequest(data) && askArchiveRequestAsNotReceived && <a className="btn btn-icon" onClick={()=>askArchiveRequestAsNotReceived()}><i className="fas fa-hdd text-warning"></i></a>} 
        </div>
    )
}


const BorrowingItem = (props) => {
    const {editPath,data,toggleSelection,checked,removeTag,deleteReference,findAndUpdateOABorrowingReference,oaloading,askCancelRequest,askArchiveRequest,forwardRequest,askTrashRequest,findISSNISBNtoggle,setReceivedRequest,setNotReceivedRequest,savedAsDownloaded,askArchiveRequestAsNotReceived,deleteRequest} = props      
    const intl = useIntl();  

    return (
        <Row className="list-row justify-content-between">
            <Col sm={3}>
                <CustomCheckBox 
                    handleChange={toggleSelection}
                    checked={checked}
                /> 
                <div className="request_id"><Link to={requesturl(editPath,data.id)} className="active"><i className="fas fa-info-circle"></i> <span>{data.id}</span></Link></div>
                <BorrowingStatus data={data} customClass="request_status"/>                                 
            </Col>
            <Col sm={3}>
            {data.patrondocdelrequest && data.patrondocdelrequest.data &&
                <>
                    <BorrowingPatronRequest data={data}/>            
                    {!isArchived(data) && data.patrondocdelrequest.data.status=="requested" && data.patrondocdelrequest.data.request_date && <span className="daysago"><span className="badge badge-pill badge-primary">{daysFromToday(data.patrondocdelrequest.data.request_date)}</span> {intl.formatMessage({id:'app.global.daysago'})}</span>}
                    {patronRequestDocumentAccess(data.patrondocdelrequest.data)}               
                </>
            }              
            </Col>
            <Col sm={4}>      
            {data.tags && <RequestTags data={data.tags.data} removeTag={!isArchived(data)?removeTag:null}/>}                 
            <ReferenceCitation data={data.reference.data}/>
            <BorrowingReferenceIcons data={data} reqPath={editPath} findAndUpdateOABorrowingReference={findAndUpdateOABorrowingReference} oaloading={oaloading} findISSNISBNtoggle={findISSNISBNtoggle} />                
            </Col>
            <Col sm={2} className="">
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
               {!isArchived(data) && data.borrowing_status=="requested" && data.request_date && <span className="daysago"><span className="badge badge-pill badge-primary">{daysFromToday(data.request_date)}</span> {intl.formatMessage({id:'app.global.daysago'})}</span>}                                                            
            </>}       
            {documentAccess(data)}            
            {!isArchived(data) && <BorrowingRequestIcons customClass="icons d-flex" data={data} reqPath={editPath} forwardRequest={forwardRequest} askTrashRequest={askTrashRequest} askCancelRequest={askCancelRequest} deleteRequest={deleteRequest} askArchiveRequest={askArchiveRequest} askArchiveRequestAsNotReceived={askArchiveRequestAsNotReceived} savedAsDownloaded={savedAsDownloaded}  setReceivedRequest={setReceivedRequest} setNotReceivedRequest={setNotReceivedRequest} />}                                
            </div>
            </Col> 
        </Row>
    )
}

export default BorrowingItem