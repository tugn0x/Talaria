import React from 'react';
import {useIntl} from 'react-intl';
import ReferenceDetailContent from '../../../components/ReferenceDetailContent';
import BorrowingRequestOperations from '../BorrowingRequestOperations';
import RequestTags from '../RequestTags'
import BorrowingRequestTracking from '../BorrowingRequestTracking';
import {canPatronReqDirectManaged, canRequest} from '../BorrowingItem';
import BorrowingChooseLender from '../BorrowingChooseLender';
import './style.scss';

export const BorrowingRequestData = (props) => {
    const {data} = props
    const intl = useIntl()

    return (
    (data.borrowing_notes||data.request_protnr||data.request_note||
        data.request_special_delivery==1||data.request_pdf_editorial==1 ) && 
    <div className="borrowingRequestData card">   
        {data.borrowing_notes && <span className="alert alert-info requestData"><span className="label">{intl.formatMessage({id: "app.requests.borrowing_notes"})}: </span>{data.borrowing_notes} </span>}
        {data.request_protnr && <span className="requestData"><span className="label">{intl.formatMessage({id: "app.requests.request_protnr"})}: </span>{data.request_protnr} </span>}
        {data.request_note && <span className="requestData"><span className="label">{intl.formatMessage({id: "app.requests.request_note"})}: </span>{data.request_note} </span>}
        {data.request_special_delivery==1 && <span className="requestData"><i class="fas fa-check-square"></i> <span className="label">{intl.formatMessage({id: "app.requests.request_special_delivery"})} </span></span>}
        {data.request_pdf_editorial==1 &&  <span className="requestData"><i class="fas fa-check-square"></i> <span className="label">{intl.formatMessage({id: "app.requests.request_pdf_editorial"})}</span></span>}
    </div>

    )
} 

const BorrowingDetail = (props) => {
    console.log('BorrowingDetail', props)
    const {data,sendRequestToLender,findLender,lendersList,requestDetailPath,isRequesting,isDelivering,directUnfillCallback, unfillCallback,directFulfillCallback, fulfillCallback,deliverCallback} = props
    const intl = useIntl()

    return (<div className="borrowingDetail">               
                <RequestTags data={data.tags.data} /> 
                <BorrowingRequestTracking requestDetailPath={requestDetailPath} reqdata={data} customClass="detail-body"/>                              
                <BorrowingRequestData data={data}/>
                <ReferenceDetailContent reference={data.reference.data} customClass="detail-body" canCollapse={true} collapsed={true}/>                                
                {canRequest(data) && isRequesting &&
                <div>
                    {( (data.reference.data.material_type==1 && !data.reference.data.issn)||
                        (data.reference.data.material_type==2 && !!data.reference.data.isbn) ) &&                    
                    <div className="alert alert-warning" role="alert">
                        <i className="fas fa-tasks"></i> ISSN/ISBN not filled! Please check/edit reference before continue in order to 
                        check holdings on available catalogs !
                    </div>
                    }
                    <BorrowingChooseLender selectLenderCb={sendRequestToLender} findLender={findLender} lendersList={lendersList}/>                                                                
                </div>
                }                
                {isDelivering && <BorrowingRequestOperations data={data} sendRequestToLender={sendRequestToLender} findLender={findLender} lendersList={lendersList} unfillCallback={canPatronReqDirectManaged(data)?directUnfillCallback:unfillCallback} fulfillCallback={canPatronReqDirectManaged(data)?directFulfillCallback:fulfillCallback} deliverCallback={deliverCallback}/>}
            </div>
    );
};

export default BorrowingDetail;