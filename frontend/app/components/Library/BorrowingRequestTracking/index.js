import React from 'react';
import {useIntl} from 'react-intl';
import { generatePath } from "react-router";
import { Link } from 'react-router-dom';
import {BorrowingStatus, statusIcon} from '../BorrowingItem'

import './style.scss';

const PatronTrackingItem = (props) => {

    const {data} = props
    return (
        <div className="patronRequest">
            <div className="itemHeader">
                <i className="fas fa-user-circle"></i>
                <span className="id"><span className="label">USER REQ ID:</span> {data.id}</span>&nbsp;-&nbsp; 
                {data.user && <span className="user">{data.user.data.full_name}</span>}                
                <span className="status"><span className="label">STATUS:</span> {data.status}</span>
            </div>
            <div className="itemData">
                
            </div>                        
        </div>            
    )
}

const BorrowingTrackingItem = (props) => {
    const {data,requestDetailPath} = props

    const requestURL = (id) => {
        return generatePath(`${requestDetailPath}`, {
            id: id,
        });
    }
    

    const intl=useIntl();

    return (
        <div className="borrowingRequest">
            <div className="itemHeader">                
                {data.lendingLibrary && <i className="fas fa-share"></i>}                
                <span className="id"><span className="label"><i class="fas fa-info-circle"></i> </span> 
                    {requestDetailPath && <Link className="requestLink" to={`${requestURL(data.id)}`}>                                    
                        {data.id}
                    </Link>}
                    {!requestDetailPath && <>{data.id}</>}
                </span>

                {data.lendingLibrary && <span className="library">&nbsp;-&nbsp; {data.lendingLibrary.data.name}</span>}
                {data.all_lender==1 && <span className="library">&nbsp;-&nbsp; {intl.formatMessage({id:'app.global.alllibraries'})}</span>}                                
                <BorrowingStatus data={data} customClass="request_status"/>                                 
            </div>
            <div className="itemData">
                
            </div>    
        </div>            
    )
}

const BorrowingRequestTrackingItem = (props) => {
    const {data,key,current,requestDetailPath}=props;
    

    return (
        <li key={key} className={`trackingItem ${current?'currentReq':''}`}>
            {!data.docdel_request_parent_id && data.patrondocdelrequest &&
                <PatronTrackingItem data={data.patrondocdelrequest.data}/>        
            }    
            <BorrowingTrackingItem requestDetailPath={!current?requestDetailPath:null} data={data}/>                            
        </li>);
}

const BorrowingRequestTracking = (props) => {
    console.log('BorrowingRequestTracking', props)
    const {reqdata,customClass,requestDetailPath} = props
    const data=reqdata.tracking.data
    const intl = useIntl()

    return (data && <div className={"borrowingTracking "+ customClass}>
                <h3>{intl.formatMessage({id: "app.requests.status"})}</h3>
                <div className="card">
                    <ul className="trackList">                    
                    {data.length > 0 && data.map((ddr) => (
                        <BorrowingRequestTrackingItem requestDetailPath={requestDetailPath} current={reqdata.id==ddr.id} key={ddr.id} data={ddr}/>
                    ))}
                    </ul>
                </div>                
            </div>
    );
};

export default BorrowingRequestTracking;