import React from 'react';
import {useIntl} from 'react-intl';
import ReferenceDetailContent from '../../../components/ReferenceDetailContent';
import BorrowingRequestOperations from '../BorrowingRequestOperations';
import RequestTags from '../RequestTags'
import BorrowingRequestTracking from '../BorrowingRequestTracking';
import {canPatronReqDirectManaged, canRequest} from '../BorrowingItem';
import BorrowingChooseLender from '../BorrowingChooseLender';

const BorrowingDetail = (props) => {
    console.log('BorrowingDetail', props)
    const {data,sendRequestToLender,findLender,lendersList,requestDetailPath,isRequesting,isDelivering,directUnfillCallback, unfillCallback,directFulfillCallback, fulfillCallback,deliverCallback} = props
    const intl = useIntl()

    return (<div className="borrowingDetail">               
                <BorrowingRequestTracking requestDetailPath={requestDetailPath} reqdata={data} customClass="detail-body"/>                
                <RequestTags data={data.tags.data} /> 
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