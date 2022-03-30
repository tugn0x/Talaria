import React from 'react';
import {useIntl} from 'react-intl';
import './style.scss';
import { Link } from 'react-router-dom';
import {UncontrolledTooltip} from 'reactstrap';
import {PatronRequestStatus} from '../../Patron/PatronRequest'
import {formatDate,formatDateTime,daysFromToday} from '../../../utils/dates';

export const BorrowingPatronRequestIcons = (props) => {
    const {data,reqPath}=props;    

    return (
        <div className="borrowing_patronrequest_icons">                
                {/*<a className="btn btn-icon" onClick={()=>alert('TODO !')}><i className="fas fa-info-circle"></i></a>*/}               
        </div>
    )
}

export const BorrowingPatronRequestStatus = (props) => {
    const {data}=props;           
    const intl = useIntl();


    return (
        <PatronRequestStatus data={data}/>
    )
}



export const BorrowingPatronRequest = (props) => {
    const {data}=props

    const pdr=data.patrondocdelrequest.data

    const intl = useIntl();

    return (
        <div className={"patronrequest"}>
            {pdr.user &&
            <span className="patron">
                <i className="fas fa-user-circle"></i> 
                <span className="active" id={`tooltip-user-${pdr.user.data.id}`}>{pdr.user.data.full_name}</span>                
                <UncontrolledTooltip autohide={false} placement="right" target={`tooltip-user-${pdr.user.data.id}`}>
                    <div className="patron_data">
                        <span><b>{pdr.user.data.full_name}</b></span>
                        {pdr.user.data.email && <span><i className="fas fa-envelope"></i> {pdr.user.data.email}</span>}
                        {pdr.user.data.phone && <span><i className="fas fa-phone"></i> {pdr.user.data.phone}</span>}
                        {pdr.user.data.mobile && <span><i className="fas fa-mobile"></i> {pdr.user.data.mobile}</span>}
                    </div>
                </UncontrolledTooltip>                                
            </span>}                                  
            <BorrowingPatronRequestStatus data={pdr}/>
            <BorrowingPatronRequestIcons data={data}/>                                
        </div>  
    )
}