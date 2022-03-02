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
    
    if(data.fulfill_type && data.fulfill_type<=4) return <i title={alt} className={"simple_icon fa-border fas "+icon}></i>;     
    if(data.fulfill_type && data.fulfill_type>=5) return alt?<span>({alt})</span>:'';
    
    return '';
    
}

export const unfilledReason = (data) => {
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
    return ret!=""?<><i className="fas fa-comment text-danger"></i> {ret}</>:'';
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

      case "documentReady":
      case "documentNotReady": date=req.ready_date; break;
       
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
        <span className="status-date"><i className="fas fa-clock"></i> {formatDateTime(date)}</span>
        {req.forward==1 && req.forward_date && 
            <span className="status-date"><i className="fas fa-redo"></i> {formatDateTime(req.forward_date)}</span>            
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
     return (data.borrowing_status=="notReceived" || data.borrowing_status=='canceled' || (canArchive(data) && isTrashed(data) ) );
            
}

export const canRequest=(data) => {
    return data.borrowing_status=="newrequest"
}

export const canSavedAsReceived=(data) => {
    return data.borrowing_status=="fulfilled"  && data.fulfill_type && !(isFile(data)||isURL(data))
}

export const canSavedAsNotReceived=(data) => {
    return canSavedAsReceived(data);
}

export const canTrash=(data) => {
    return !isTrashed(data) && data.borrowing_status=="documentReady" && ( !(isFile(data)||isURL(data)) || ( (isFile(data)||isURL(data)) && hasBeenDownloaded(data) ) )    
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
    return data.fulfill_type==1 
}

export const isURL=(data) => {
    return data.fulfill_type==4 /* && data.url!='' */
}

export const hasBeenDownloaded=(data) => {
    return data.download && data.download==1
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
            <span className="status-text">{data.borrowing_status ? intl.formatMessage({id: "app.requests."+data.borrowing_status}):'xxx'} <span className="fulfill_type">{deliveryMethod(data)}</span></span>                    
            <span className="unfilled_reason">{unfilledReason(data)}</span>
            {statusDate(data)}
            {isTrashed(data) && <span className="status-date"><i className="fas fa-trash text-danger"></i> {data.trash_date}</span>}                   
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
                {canRequest(data) && <a className="btn btn-icon" onClick={()=>alert('TODO Check holding !')}><i className="fa fa-search-location"></i></a>}          
                {!isPatronRequest(data) && !canSavedAsDownloaded(data) && data.borrowing_status=="fulfilled" && isFile(data) && <span><a className="btn btn-icon"><i className="fas fa-hourglass-half"></i></a> (waiting HC)</span>}                      
                {!isPatronRequest(data) && canSavedAsDownloaded(data) && isFile(data) && <a className="btn btn-icon" onClick={()=>alert("TODO: open document !")}><i className="fas fa-download"></i></a>}                
                {!isPatronRequest(data) && canSavedAsDownloaded(data) && isURL(data) && <a className="btn btn-icon" onClick={()=>alert("TODO: open URL!")}><i className="fas fa-external-link-alt"></i></a>}                                                
        </div>
    )
}

export const BorrowingRequestIcons = (props) => {
    const {data,reqPath,forwardRequest,askTrashRequest,askCancelRequest,askArchiveRequest,customClass,savedAsDownloaded,setReceivedRequest,setNotReceivedRequest}=props;    
 
    return (
        <div className={"borrowing_request_icons " + (customClass?customClass:'')}>
                <Link to={requesturl(reqPath,data.id)} className="btn btn-icon"><i className="fas fa-eye"></i></Link>                               
                {canRequest(data) && <Link className="btn btn-icon" to={requesturl(reqPath,data.id)}><i className="fas fa-share"></i></Link>}
                {canCancel(data) && askCancelRequest && <a className="btn btn-icon" onClick={()=>askCancelRequest()}><i className="fas fa-times"></i></a>}                
                {canDelete(data) && askCancelRequest && <a className="btn btn-icon" onClick={()=>askCancelRequest()}><i className="fas fa-backspace"></i></a>}                                                
                {canTrash(data) && askTrashRequest && <a className="btn btn-icon" onClick={()=>askTrashRequest(1)}><i className="fas fa-trash"></i></a>}                
                {canForward(data) && forwardRequest && <a className="btn btn-icon" onClick={()=>forwardRequest()}><i className="fas fa-redo"></i></a>}                
                {canArchive(data) && askArchiveRequest && <a className="btn btn-icon" onClick={()=>askArchiveRequest()}><i className="fas fa-hdd"></i></a>}                                                
                {isPatronRequest(data) && canRequest(data) && <span><button>evadi dir</button><button>inevadi dir</button></span>}
                {isPatronRequest(data) && data.borrowing_status=="documentNotReady" && <span><button>inevadi/noconsegna a patron</button></span>}                
                {isPatronRequest(data) && data.borrowing_status=="documentReady" && <span><button>evadi/consegna a patron</button></span>}                
                {isPatronRequest(data) && data.borrowing_status=="notReceived" && <span><button>inevadi a patron</button></span>}                                
                {!isPatronRequest(data) && canSavedAsDownloaded(data) && savedAsDownloaded && <a className="btn btn-icon" onClick={()=>savedAsDownloaded()}><i className="fas fa-arrow-circle-right"></i></a>}                
                {!isPatronRequest(data) && canSavedAsReceived(data) && setReceivedRequest && setNotReceivedRequest && <><a className="btn btn-icon" onClick={()=>setReceivedRequest()}><i className="fas fa-box"></i></a> <a className="btn btn-icon" onClick={()=>setNotReceivedRequest()}><i className="fas fa-box-open"></i></a></>}                
        </div>
    )
}


const BorrowingItem = (props) => {
    const {editPath,data,toggleSelection,checked,removeTag,deleteReference,findAndUpdateOABorrowingReference,oaloading,askCancelRequest,askArchiveRequest,forwardRequest,askTrashRequest,findISSNISBNtoggle,setReceivedRequest,setNotReceivedRequest,savedAsDownloaded} = props      
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
            {data.tags && <RequestTags data={data.tags.data} removeTag={!isArchived(data)?removeTag:null}/>}                 
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
            </>}
            {inRequest(data) &&             
            data.fulfill_note && <div className="fulfill_notes">
                <a href="#" id={`fulfilnote-${data.id}`} className="active"><i className="fas fa-sticky-note"></i></a> 
                <UncontrolledTooltip autohide={false} placement="right" target={`fulfilnote-${data.id}`}>
                    {data.fulfill_note}
                </UncontrolledTooltip>                                
            </div>}            
            <BorrowingRequestIcons customClass="icons d-flex" data={data} reqPath={editPath} forwardRequest={forwardRequest} askTrashRequest={askTrashRequest} askCancelRequest={askCancelRequest} askArchiveRequest={askArchiveRequest} savedAsDownloaded={savedAsDownloaded}  setReceivedRequest={setReceivedRequest} setNotReceivedRequest={setNotReceivedRequest} />                                
            </div>
            </Col> 
        </Row>
    )
}

export default BorrowingItem