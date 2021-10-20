import React from 'react';
import {useIntl} from 'react-intl';
import ReferenceDetailContent from '../../../components/ReferenceDetailContent';
import BorrowingRequestOperations from '../BorrowingRequestOperations';
import RequestTags from '../RequestTags'

const BorrowingDetail = (props) => {
    console.log('BorrowingDetail', props)
    const {data,sendRequestToLender} = props
    const intl = useIntl()

    return (<div className="borrowingDetail">
                <RequestTags data={data.tags.data} /> 
                <ReferenceDetailContent reference={data.reference.data} customClass="detail-body"/>                                
                <BorrowingRequestOperations data={data} sendRequestToLender={sendRequestToLender}/>
            </div>
    );
};

export default BorrowingDetail;