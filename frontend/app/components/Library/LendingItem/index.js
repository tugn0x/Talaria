import React from 'react';
import {Row, Col, Button} from 'reactstrap';
import {useIntl} from 'react-intl';
import { generatePath } from "react-router";
import CustomCheckBox from 'components/Form/CustomCheckBox';
import ReferenceCitation from '../../ReferenceCitation';
import RequestTags from '../RequestTags';
import './style.scss';
import { Link } from 'react-router-dom';
import {UncontrolledTooltip} from 'reactstrap';
import {daysFromToday,formatDateTime} from '../../../utils/dates';


const requesturl=(reqPath,id,op) => {
    return generatePath(reqPath, {
        id,
        op
    });
}

const statusIcon = (status) => {
    return "status-icon " + status
}

const statusDate = (req) => {
 
  let date="";
  switch (req.lending_status)
  {
      case "requestReceived": date= req.request_date; break;

      case "willSupply": 
      case "canceled": 
      case "canceleddirect":  date= req.created_at; 
                              break;                             
      /*...*/      
      default: date= req.created_at; 
  }  

  return (
      <>
        <i class="fas fa-clock"></i> {formatDateTime(date)}            
      </>
  )
}

// const canEdit = (data) => {
//     return data.borrowing_status=="newrequest";
// }  

// const canArchive=(data) => {
//     //todo: add check on status
//     return data.patrondocdelrequest && data.patrondocdelrequest.data.user;
// }

// const canDelete=(data) => {
//     return (
//         (data.borrowing_status=="newrequest" || data.borrowing_status=="requested")
//     );    
// }

// const canTrash=(data) => {    
//     return data.borrowing_status=="documentready";
// }

const isRequested=(data) => {
    return data.lending_status!="newrequest";
}

const isRequestReceived=(data) => {
    
    return data.lending_status=="requestReceived";
}


const canSupply=(data)=> {
    return data.lending_status=="willSupply";
}

export const LendingStatus = (props) => {

    const intl = useIntl();

    const {data,customClass}=props;

    //alert(JSON.stringify(data))

   
    return (
     
        <div className={"borrowing_status " + (customClass?customClass:'')}>            
            
            <span className={statusIcon(data.lending_status)}></span> 
            <span className="status-text">{data.lending_status ? intl.formatMessage({id: "app.requests."+data.lending_status}):'Pending Request'}
            </span>        
            <span className="status-date">{statusDate(data)}</span>
            {
            data.operator && <div className="status-operator">
                <i className="fas fa-user-cog"></i> { 
                data.operator.data.full_name
                }
            </div>
            }

            {data.borrowing_notes && <div className="borrowing_notes"></div>}
              
        </div>
    )
}

export const LendingReferenceIcons = (props) => {
    const {data,reqPath,findAndUpdateOABorrowingReference,oaloading, UpdateLendingRequestStatus, UpdateLendingAcceptRequest}=props;    
   
    const findAndUpdateOA = (ev) => {       
        ev.preventDefault();
        if(findAndUpdateOABorrowingReference)
            findAndUpdateOABorrowingReference();
    }

    // const updatelendingstatus = (data) =>{
    //     if (UpdateLendingRequestStatus)
    //     {
    //         //alert(JSON.stringify(data))
    //         data.lending_status = "Fulfill"
            
    //         requestChangeStatusLending(data.id, data.lending_library_id, data.lending_status)
            
    //         //alert(data.lending_status)
    //     }
    // }


    return (
        <div className="borrowing_reference_icons">
                {oaloading && <i className="fas fa-spinner fa-spin"></i>}                
                {isRequestReceived(data) && (data.all_lender==null) && <a className="btn btn-icon"  onClick={()=>UpdateLendingRequestStatus(data)}><i className="fas fa-parachute-box"></i></a>}
                {(data.all_lender==null || data.all_lender==0) && data.lending_archived==null && data.lending_status=="willSupply" && 
                <Link className="btn btn-icon" to={requesturl(reqPath,data.id)}><i className="fas fa-book-open"></i></Link>}
                {(data.all_lender==null || data.all_lender==0) && data.lending_status=="cancelRequested" && <Link className="btn btn-icon" to={requesturl(reqPath,data.id)}><i className="fas fa-book-open"></i></Link>}
                {(data.all_lender==null || data.all_lender==0) && data.lending_status=="cancelRequested" && <a className="btn btn-icon" onClick={()=>UpdateLendingRequestStatus(data)}><i class="far fa-check-circle"></i></a>}
                {(data.all_lender==1) && isRequested(data) && <a className="btn btn-icon" onClick={()=>UpdateLendingAcceptRequest(data)}><i className="fas fa-parachute-box"></i></a>}
        </div>
    )
}

// export const LendingRequestIcons = (props) => {
//     const {data,reqPath}=props;    
 
//     return (
//         <div className="borrowing_request_icons">
//                 {/*<Link to={requesturl(reqPath,data.id)} className="btn btn-icon"><i className="fas fa-eye"></i></Link>*/}
//                 {!isRequested(data) && <a className="btn btn-icon" onClick={()=>alert("TODO !")}><i className="fas fa-share"></i></a>}
//                 {canDelete(data) && <a className="btn btn-icon" onClick={()=>alert("TODO !")}><i className="fas fa-times"></i></a>}                
//                 {canTrash(data) && <a className="btn btn-icon" onClick={()=>alert("TODO !")}><i className="fas fa-trash"></i></a>}                
//                 {canArchive(data) && <a className="btn btn-icon" onClick={()=>alert("TODO !")}><i className="fas fa-hdd"></i></a>}                
//         </div>
//     )
// }


const LendingItem = (props) => {
    const {editPath,data,toggleSelection,checked,removeTag,findAndUpdateOABorrowingReference, UpdateLendingRequestStatus, UpdateLendingAcceptRequest, UpdateLendingArchivedStatus, oaloading} = props      
    const intl = useIntl();  

    return (
        <Row className="list-row justify-content-between">
            <Col sm={2}>
                <CustomCheckBox 
                    handleChange={toggleSelection}
                    checked={checked}
                /> 
              
              <div className="request_id">
                        <Link to={requesturl(editPath,data.id)} className="active">ID: <span>{data.id}</span></Link>
                        </div>
                <LendingStatus data={data} customClass="request_status"/>                 
                {data.lending_notes && <div className="borrowing_notes">
                 <a href="#" id={`tooltip-${data.id}`} className="active"><i className="fas fa-sticky-note"></i></a> 
                 <UncontrolledTooltip autohide={false} placement="right" target={`tooltip-${data.id}`}>
                     {data.lending_notes}
                 </UncontrolledTooltip>                                
                 </div>}
               
            </Col>
            <Col sm={3}>
            {isRequested(data) &&             
            <>
               {data.borrowinglibrary && 
                <span>
                    <i className="fas fa-landmark"></i> {data.borrowinglibrary.data.name}
                    
                </span>                
                
               }
               {
                   <span className="daysago"> 
                       
                        <span className="status-date">{statusDate(data)}</span>
                    </span>
                    
               }
               {!data.lendingLibrary && data.all_lender==1 &&
                <span>
                    <i className="fas fa-cloud"></i> {intl.formatMessage({id:'app.global.alllibraries'})} 
                </span>
               }
               {data.request_date && <span className="daysago"><span class="badge badge-pill badge-primary">{daysFromToday(data.request_date)}</span> {intl.formatMessage({id:'app.global.daysago'})}</span>}
               
               {/* <span className="fullfilment">...[Static fulfilled/unfilled status]...</span>               */}

              
            </>            
            }            
                          
            </Col>
            
            {/* <Col sm={2}>
            {
            data.patrondocdelrequest && data.patrondocdelrequest.data &&
                <BorrowingPatronRequest data={data}/>            
            }              
            </Col> */}
            <Col sm={5}>      
           
            <RequestTags data={data.tags.data} removeTag={removeTag}/>                 
           
            

            <ReferenceCitation data={data.reference.data}/>
            
            {/* <LendingReferenceIcons data={data} reqPath={editPath} findAndUpdateOABorrowingReference={findAndUpdateOABorrowingReference} oaloading={oaloading}/>                 */}
            </Col>
            <Col sm={2} className="icons align-self-center">
            {/* <LendingRequestIcons data={data} reqPath={editPath} />                                 */}
            <LendingReferenceIcons data={data} reqPath={editPath} 
            UpdateLendingRequestStatus={(data) => UpdateLendingRequestStatus(data)} 
            UpdateLendingArchivedStatus={(data) => UpdateLendingArchivedStatus(data)}
            UpdateLendingAcceptRequest={(data) => UpdateLendingAcceptRequest(data)}
            findAndUpdateOABorrowingReference={findAndUpdateOABorrowingReference} 
            
            oaloading={oaloading}/>
            </Col> 
        </Row>
    )
}

export default LendingItem