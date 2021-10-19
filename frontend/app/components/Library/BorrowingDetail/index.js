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
                    {( (data.reference.data.material_type==1 && !data.reference.data.issn)||
                     (data.reference.data.material_type==2 && !!data.reference.data.isbn) ) &&                    
                    <div class="alert alert-warning" role="alert">
                        <i className="fas fa-tasks"></i> ISSN/ISBN not filled! Please check/edit reference before continue !
                    </div>
                    }
                    <button className="btn btn-primary" onClick={()=>props.history.goBack()}>Close</button>
                    &nbsp;&nbsp;
                    <button className="btn btn-secondary">Find lender</button>
                </div>                  
            </div>
    );
};

export default BorrowingDetail;