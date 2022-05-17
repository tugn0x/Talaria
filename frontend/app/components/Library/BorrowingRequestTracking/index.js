import React from 'react';
import {useIntl} from 'react-intl';
import { generatePath } from "react-router";
import { Link } from 'react-router-dom';
import {BorrowingStatus,documentAccess} from '../BorrowingItem'
import {BorrowingPatronRequestStatus} from '../BorrowingPatronRequest'

import './style.scss';

const BorrowingPatronTrackingItem = (props) => {

    const {data} = props
    const pdr=data.patrondocdelrequest.data 

    return (
        <div className="patronRequest">
            <div className="itemHeader">                
                <span className="id">
                    <span className="label">
                        <i className="fas fa-info-circle"></i> 
                    </span> {pdr.id}                                        
                </span>
                <i className="fas fa-user-circle"></i> {pdr.user && <span className="user">{pdr.user.data.full_name}</span>}                                
                <BorrowingPatronRequestStatus data={pdr}/>
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
                        {/*data.lendingLibrary && <><i className="fas fa-share"></i> &nbsp;</>*/}                
                        <span className="id">
                            {requestDetailPath && <Link className="requestLink" replace to={`${requestURL(data.id)}`}>                                    
                                <span className="label"><i className="fas fa-info-circle"></i> </span> 
                                {data.id}
                            </Link>}
                            {!requestDetailPath && <><span className="label"><i className="fas fa-info-circle"></i> </span> 
                                {data.id}
                            </>}                    
                        </span>

                        {data.lendingLibrary && <span className="library">&nbsp;-&nbsp; {data.lendingLibrary.data.name}</span>}
                        {data.all_lender==1 && <span className="library">&nbsp;-&nbsp; {intl.formatMessage({id:'app.global.alllibraries'})}</span>}                                
                        <BorrowingStatus data={data} customClass="request_status"/>                                 
                        {documentAccess(data)}
                    </div>
                    <div className="itemData"></div>             
            </div>             
    )
}

const BorrowingRequestTrackingItem = (props) => {
    const {data,current,requestDetailPath}=props;
    

    return (
        <li className={`trackingItem ${current?'currentReq':''}`}>
            {!data.docdel_request_parent_id && data.patrondocdelrequest &&
                <BorrowingPatronTrackingItem data={data}/>        
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
                        <BorrowingRequestTrackingItem requestDetailPath={requestDetailPath} key={ddr.id} current={reqdata.id==ddr.id} data={ddr}/>
                    ))}
                    </ul>
                </div>                
            </div>
    );
};

export default BorrowingRequestTracking;