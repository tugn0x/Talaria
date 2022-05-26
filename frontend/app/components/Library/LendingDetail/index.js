import React from 'react';
import {useIntl} from 'react-intl';
import ReferenceDetailContent from '../../ReferenceDetailContent';
import FulfillLendingRequest from  '../FulfillLendingRequest';
import {LendingStatus} from '../LendingItem'
import RequestTags from '../RequestTags'

const LendingDetail = (props) => {
    console.log('LendingDetail', props)
    const {data, FulfillLendingRequestStatus, unFulfillLendingRequestStatus} = props
    const intl = useIntl()

return (<div className="lendingDetail">
                <RequestTags data={data.tags.data} /> 
                <div className="lendingTracking detail-body">
                <h3>{intl.formatMessage({id: "app.requests.status"})}</h3>
                    <div className="card">                                    
                        <LendingStatus data={data}/>
                    </div>  
                </div>  
                <ReferenceDetailContent reference={data.reference.data} customClass="detail-body" canCollapse={true} collapsed={true}/>                                
                {(data.lending_status==='willSupply'||data.lending_status==='requestReceived') 
                  && <FulfillLendingRequest FulfillLendingRequestStatus={FulfillLendingRequestStatus} unFulfillLendingRequestStatus={unFulfillLendingRequestStatus} data={data} customClass="detail-body"/>
                }

              

    </div>
    );
};

export default LendingDetail;