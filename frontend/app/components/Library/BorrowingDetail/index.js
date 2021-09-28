import React from 'react';
import {useIntl} from 'react-intl';
import ReferenceDetailContent from '../../../components/ReferenceDetailContent';
import RequestTags from '../RequestTags'

const BorrowingDetail = (props) => {
    console.log('BorrowingDetail', props)
    const {data} = props
    const intl = useIntl()

    return (<div className="borrowingDetail">
                <RequestTags data={data.tags.data} /> 
                <ReferenceDetailContent reference={data.reference.data} customClass="detail-body"/>
                <div>
                    These buttons will depends on REQUEST'S status                    
                    <br/><br/>
                    <button className="btn btn-primary" onClick={()=>props.history.goBack()}>Close</button>
                    &nbsp;&nbsp;
                    <button className="btn btn-secondary">Find lender</button>
                </div>                  
            </div>
    );
};

export default BorrowingDetail;