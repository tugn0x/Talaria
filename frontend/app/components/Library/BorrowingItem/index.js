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
import {formatDate,formatDateTime} from '../../../utils/dates';

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
  switch (req.borrowing_status)
  {
      case "requested": date= req.request_date; break;
      case "newrequest": date= req.created_at; break;
      /*...*/      
      default: date="gg/mm/yyyy";      
  }

  let datearr=formatDateTime(date,'it').split(" ");  

  let dat=datearr[0];
  let time=datearr[1];

  return (
        <>
            <i class="fas fa-clock"></i> {dat}<br/><span class="status-time">{time} </span>            
        </>
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
            {data.operator && <div className="status-operator">
                <i className="fas fa-user-cog"></i> { data.operator.data.full_name}
            </div>}
        </div>
    )
}

export const BorrowingReferenceIcons = (props) => {
    const {data,reqPath,findAndUpdateOABorrowingReference,oaloading}=props;    

    const canEdit = (data) => {
        return data.borrowing_status=="newrequest";
    }   

    const findAndUpdateOA = (ev) => {       
        ev.preventDefault();

        if(findAndUpdateOABorrowingReference)
            findAndUpdateOABorrowingReference();
    }

    return (
        <div className="borrowing_reference_icons">
                {canEdit(data) && <Link className="btn btn-icon" to={requesturl(reqPath,data.id,'edit')}><i className="fas fa-edit"></i></Link>}
                {data.reference.data.oa_link && <a href={data.reference.data.oa_link} target="_blank" className='btn btn-icon'><i className="icon-oa"></i></a>} 
                {!oaloading && !data.reference.data.oa_link && <a target="_blank" className='btn btn-icon' onClick={(ev) => findAndUpdateOA(ev) }><i className="fas fa-search"></i>OA</a>}
                {oaloading && <i className="fas fa-spinner fa-spin"></i>}                
                <a className="btn btn-primary btn-sm" onClick={()=>alert('TODO !')}>C.H.</a>
                <a className="btn btn-icon"  onClick={()=>alert('TODO !')}><i className="fas fa-file-pdf"></i></a>
        </div>
    )
}

export const BorrowingRequestIcons = (props) => {
    const {data,reqPath}=props;    

    

    return (
        <div className="borrowing_request_icons">
                <Link to={requesturl(reqPath,data.id)} className="btn btn-icon"><i className="fas fa-eye"></i></Link>
                <a className="btn btn-icon"><i className="fas fa-info-circle"></i></a>
                <a className="btn btn-icon"><i className="fas fa-info-circle"></i></a>                
        </div>
    )
}


const BorrowingItem = (props) => {
    const {editPath,data,toggleSelection,checked,removeTag,deleteReference,findAndUpdateOABorrowingReference,oaloading} = props
  
    const intl = useIntl();  

    return (
        <Row className="list-row justify-content-between">
            <Col sm={2}>
                <CustomCheckBox 
                    handleChange={toggleSelection}
                    checked={checked}
                /> 
                <div className="request_id">ID: <span>{data.id}</span></div>
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
            <Col sm={4}>      
            <RequestTags data={data.tags.data} removeTag={removeTag}/>                 
            <ReferenceCitation data={data.reference.data}/>
            <BorrowingReferenceIcons data={data} reqPath={editPath} findAndUpdateOABorrowingReference={findAndUpdateOABorrowingReference} oaloading={oaloading}/>                
            </Col>
            <Col sm={2}>            
               {data.lendingLibrary && 
                <span>
                    <i className="fas fa-landmark"></i> {data.lendingLibrary.data.name}
                </span>
                }
                {data.borrowing_status=="requested" && !data.lendingLibrary &&
                <span>
                    <i className="fas fa-cloud"></i> 
                </span>
                }
            </Col>
            <Col sm={2} className="icons align-self-center">
            <BorrowingRequestIcons data={data} reqPath={editPath} />                                
            </Col> 
        </Row>
    )
}

export default BorrowingItem