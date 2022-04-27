import React, {useEffect, useState} from 'react'
import {Row, Col, Button} from 'reactstrap'
import messages from './messages'
import { FormattedMessage } from 'react-intl';
import {Pagination, InputSearch} from 'components';
import Loader from 'components/Form/Loader';
/*import CustomModal from 'components/Modal/Loadable'*/
import {useIntl} from 'react-intl';
import DeliveryItem from '../DeliveryItem';
import FilterSelect from '../../FilterSelect';
import SectionTitle from 'components/SectionTitle';
import {canPatronReqDirectManaged} from '../BorrowingItem'
import './style.scss';

const DeliveryList = (props) => {
    console.log('DeliveryList', props)
    const { editPath,loading, data, pagination, searchOptions,setDeskReceivedRequest,deliverToUser,setDeskNotReceivedRequest,userNotTaken} = props
    const {total_pages, current_page,total,count,per_page} = pagination
    const intl = useIntl();
    const [mounted, setMounted] = useState(false)
    const [currentReq,setCurrentReq]=useState(null);
    const [disableCancelFilter,setDisableCancelFilter]=useState(true);

    const [multiFilter, setMultiFilter ] = useState(
        {
            query: '',                      
        }
    );


    useEffect(() => {
        setMounted(true)
     }, [])
 
    useEffect( ()=> {
        mounted ? searchOptions.getSearchList(current_page, per_page, multiFilter ) : null
        if(multiFilter.query != "")
            setDisableCancelFilter(false);
        else setDisableCancelFilter(true);            
    }, [multiFilter])

    
    const handleCancelFilter = () => {
        setMultiFilter({
            query: '',                       
        })
    }


    
    

    // var disableToolbarClass = disableToolbar? 'disabled':'';

    return (
        mounted &&
        <>
            <SectionTitle 
                title={props.sectionTitle}
            />
            <div className="search-filter-bar">
                <Row>
                    <Col md={4} sm={12}>
                        {searchOptions &&
                            <InputSearch
                                submitCallBack={(query) => { 
                                    setMultiFilter( state => ({
                                        query:query,                                        
                                    }) )
                                } 
                                }
                                query={multiFilter.query}
                                searchOnChange={searchOptions.searchOnChange ? searchOptions.searchOnChange : false}
                            />
                        }
                    </Col>                    
                    <Col md={3} sm={5}>
                        {<span>TODO: desk dropdown</span> }
                    </Col>
                    <Col md={3} sm={5}>                    
                    </Col>
                    <Col sm={2}>{!disableCancelFilter && <a href="#" onClick={handleCancelFilter} className="btn btn-link active"><FormattedMessage {...messages.ResetAll} /></a> }</Col>
                </Row>
            </div>
            
            <div className="deliveryList list-wrapper">               
                <Loader show={loading}>
                    <div className="list-body">
                        {data.length > 0 &&
                            data.map(req => (                                
                                <DeliveryItem 
                                    key={`delivery-${req.id}`}
                                    editPath={editPath}
                                    data={req}                                                                                                           
                                    setDeskReceivedRequest={()=>setDeskReceivedRequest(req.id,multiFilter)}
                                    setDeskNotReceivedRequest={()=>setDeskNotReceivedRequest(req.id,multiFilter)}                                    
                                    userNotTaken={()=>userNotTaken(req.id,canPatronReqDirectManaged(req),multiFilter)} 
                                    deliverToUser={()=>deliverToUser(req.id,canPatronReqDirectManaged(req),multiFilter)}
                                /> 
                                
                                
                            ))
                        ||
                            <h5 className="text-center">
                                {intl.formatMessage(messages.DeliveryNotFound)}
                            </h5>
                        }
                    </div>
                </Loader>
            </div>
            
            {Object.keys(pagination).length>0 &&
                <Pagination
                    total={total}
                    count={count}
                    per_page={per_page}
                    current_page={current_page}
                    total_pages={total_pages}
                    linkToPage={(page, pagesize) => searchOptions.getSearchList(page,pagesize, multiFilter )}
                />    
            }
            </>
        
       
    )
}

export default DeliveryList;
