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
    const { editPath,loading, data,desksOptionList, pagination, searchOptions,setDeskReceivedRequest,deliverToUser,setDeskNotReceivedRequest,userNotTaken} = props
    const {total_pages, current_page,total,count,per_page} = pagination
    const intl = useIntl();
    const [mounted, setMounted] = useState(false)
    const [currentReq,setCurrentReq]=useState(null);
    const [disableCancelFilter,setDisableCancelFilter]=useState(true);

    const [multiFilter, setMultiFilter ] = useState(
        {
            query: '',   
            desksIds:[],                    
        }
    );



    const handleIds = (ids, id) => {
        if(ids.includes(id)){
            const index = ids.findIndex(el => el === id);
            ids.splice(index, 1)
            return ids
        }else {
            return [...ids, id]
        }
    }


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
            desksIds:[],                    
        })
    }


    const toggleDeskFilter = (deskId) => {
        setMultiFilter( state => ({
            query: state.query,
            desksIds: handleIds(state.desksIds, deskId),            
        }))
    };

    
    

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
                                        desksIds:state.desksIds,                                   
                                    }) )
                                } 
                                }
                                query={multiFilter.query}
                                searchOnChange={searchOptions.searchOnChange ? searchOptions.searchOnChange : false}
                            />
                        }
                    </Col>                    
                    <Col md={3} sm={5}>
                        {<FilterSelect 
                                type={"desks"} 
                                options={desksOptionList} 
                                selectedIds={multiFilter.desksIds}
                                submitCallBack={(deskId) => setMultiFilter( state => ({
                                    query: state.query,
                                    desksIds: handleIds(state.desksIds, deskId),                                    
                        }) ) } /> 
                    }
                    </Col>
                    <Col md={3} sm={5}>                    
                    </Col>
                    <Col sm={2}>{!disableCancelFilter && <a href="#" onClick={handleCancelFilter} className="btn btn-link active"><FormattedMessage {...messages.ResetAll} /></a> }</Col>
                </Row>
                <Row>
                    <Col md={12} className="activeFilters">                    
                    { desksOptionList && multiFilter.desksIds && multiFilter.desksIds.length>0 &&
                     <ul id="desksActiveFilter" className="filtersList">    
                      {multiFilter.desksIds.map( el => 
                         <li key={el} className="deskFilter">{desksOptionList.filter( (listItem) => (listItem.value===el))[0].label} <i className="fas fa-times"  onClick={() => toggleDeskFilter(el) }></i></li>
                        ) 
                      }
                      </ul>
                    }
                    </Col>
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
