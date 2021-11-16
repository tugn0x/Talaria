import React from 'react';
import {useIntl} from 'react-intl';
import ReferenceDetailContent from '../../ReferenceDetailContent';
import FulfillLendingRequest from  '../FulfillLendingRequest';

import RequestTags from '../RequestTags'
import { useState } from 'react'

const LendingDetail = (props) => {
    console.log('LendingDetail', props)
    const {data, FulfillLendingRequestStatus, unFulfillLendingRequestStatus} = props
    const intl = useIntl()
    
    

    return (<div className="borrowingDetail">
                <RequestTags data={data.tags.data} /> 
                <ReferenceDetailContent reference={data.reference.data} customClass="detail-body"/>                                
                <FulfillLendingRequest FulfillLendingRequestStatus={FulfillLendingRequestStatus} unFulfillLendingRequestStatus={unFulfillLendingRequestStatus} data={data} customClass="detail-body"/>
                

              

    </div>
    );
};

export default LendingDetail;