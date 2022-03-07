import React from 'react';
import {useIntl} from 'react-intl';
import ReferenceDetailContent from '../../../components/ReferenceDetailContent';
import BorrowingRequestOperations from '../BorrowingRequestOperations';
import RequestTags from '../RequestTags'
import BorrowingRequestTracking from '../BorrowingRequestTracking';

const BorrowingDetail = (props) => {
    console.log('BorrowingDetail', props)
    const {data,sendRequestToLender,findLender,lendersList,requestDetailPath} = props
    const intl = useIntl()

    return (<div className="borrowingDetail">
                <RequestTags data={data.tags.data} /> 
                <BorrowingRequestTracking requestDetailPath={requestDetailPath} reqdata={data} customClass="detail-body"/>                
                <ReferenceDetailContent reference={data.reference.data} customClass="detail-body" canCollapse={true} collapsed={true}/>                                
                <BorrowingRequestOperations data={data} sendRequestToLender={sendRequestToLender} findLender={findLender} lendersList={lendersList}/>
            </div>
    );
};

export default BorrowingDetail;