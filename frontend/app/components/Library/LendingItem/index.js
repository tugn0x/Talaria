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
      case "willSupply": 
      case "requestReceived": date= req.request_date; break;      
      
      case "cancelRequested":  date= req.cancel_request_date; break;

      case "canceledAccepted": date= req.cancel_date; 
                              break;                             

      case "unFilled": 
      case "copyCompleted": date= req.fulfill_date; break;                                                           

      /*...*/      
      default: date= req.created_at; 
  }  

  return (
      <>
        <i className="fas fa-clock"></i> {formatDateTime(date)}            
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
            <span className="status-date">{statusDate(data)}</span>
            {
            data.operator && <div className="status-operator">
                <i className="fas fa-user-cog"></i> { 
                data.operator.data.full_name
                }
            </div>
            }

            {data.lending_notes && <div className="borrowing_notes"></div>}
              
        </div>
    )
}

const LendingRequestIcons = (props) => {
    const {match, data,reqPath,UpdateLendingRequestStatus, UpdateLendingAcceptRequest}=props;    
    const libraryId=match.params.library_id
    return (
        <div className="lending_request_icons">                        
                {isRequestReceived(data) && (data.all_lender==null|| data.all_lender==0)  && 
                    <>
                        <a className="btn btn-icon"  onClick={()=>UpdateLendingRequestStatus(data)}><i className="fas fa-parachute-box"></i></a>
                        <Link className="btn btn-icon" to={requesturl(reqPath,data.id)}><i className="fas fa-ban"></i></Link>
                    </>
                }
                {(data.all_lender==null || data.all_lender==0) && data.lending_archived==null && data.lending_status=="willSupply" && 
                <Link className="btn btn-icon" to={requesturl(reqPath,data.id)}><i className="fas fa-book-open"></i></Link>}
                {(data.all_lender==null || data.all_lender==0) && data.lending_status=="cancelRequested" && <Link className="btn btn-icon" to={requesturl(reqPath,data.id)}><i className="fas fa-book-open"></i></Link>}
                {(data.all_lender==null || data.all_lender==0) && data.lending_status=="cancelRequested" && <a className="btn btn-icon" onClick={()=>UpdateLendingRequestStatus(data)}><i className="far fa-check-circle"></i></a>}
                {(data.all_lender==1) && isRequestReceived(data) && !isRequestedByMe(data,libraryId) && <a className="btn btn-icon" onClick={()=>UpdateLendingAcceptRequest(data)}><i className="fas fa-parachute-box"></i></a>}
        </div>
    )
}

const LendingReferenceIcons = (props) => {
    const {data}=props;    

    return (
        !isArchived && 
            <div className="lending_reference_icons">               
                    <a className="btn btn-icon" onClick={()=>alert('TODO Check holding !')}><i className="fa fa-search-location"></i></a>                
            </div>
    )
}

const LendingItem = (props) => {    
    const {match,editPath,data,toggleSelection,checked,removeTag,findAndUpdateOABorrowingReference, UpdateLendingRequestStatus, UpdateLendingAcceptRequest, UpdateLendingArchivedStatus, oaloading} = props      
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
            <>
               {data.borrowinglibrary && 
                <span>
                    <i className="fas fa-landmark"></i> {data.borrowinglibrary.data.name}
                    
                </span>                
                
               }               
               {!isArchived(data) && data.request_date && <span className="daysago"><span className="badge badge-pill badge-primary">{daysFromToday(data.request_date)}</span> {intl.formatMessage({id:'app.global.daysago'})}</span>}
               
               {/* <span className="fullfilment">...[Static fulfilled/unfilled status]...</span>               */}
            </>                                      
            </Col>
            
          
            <Col sm={5}>      
            {data.tags && <RequestTags data={data.tags.data} removeTag={!isArchived(data)?removeTag:null}/>}
            <ReferenceCitation data={data.reference.data}/>
            <LendingReferenceIcons data={data} />                
            </Col>
            <Col sm={2} className="icons align-self-center">
            <LendingRequestIcons match={match} data={data} reqPath={editPath} 
            UpdateLendingRequestStatus={(data) => UpdateLendingRequestStatus(data)}             
            UpdateLendingAcceptRequest={(data) => UpdateLendingAcceptRequest(data)}            
            />
            </Col> 
        </Row>
    )
}

export default LendingItem