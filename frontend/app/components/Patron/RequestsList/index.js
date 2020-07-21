import React, {useEffect, useState} from 'react'
import {Row, Col, Button} from 'reactstrap'
import messages from './messages'
import { FormattedMessage } from 'react-intl';
import {Pagination, InputSearch} from 'components';
import Loader from 'components/Form/Loader';
import {useIntl} from 'react-intl';
import RequestItem from '../RequestItem';
import FilterSelect from '../FilterSelect';

import './style.scss';

const RequestsList = (props) => {
    console.log('RequestsList', props)
    const { loading, data, pagination, searchOptions, labelsOptionList, groupsOptionList,removeLabelFromReference,removeGroupFromReference,applyLabels,applyGroups} = props
    const {total_pages, current_page,total,count,per_page} = pagination
    const intl = useIntl();
    const [mounted, setMounted] = useState(false)
    /*  const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal); */

    const [selectedRequests, setSelectedRequests] = useState([]);
    const [disableToolbar,setDisableToolbar]=useState(false);
    const [disableCancelFilter,setDisableCancelFilter]=useState(true);

    const [multiFilter, setMultiFilter ] = useState(
        {
            query: '',
            labelIds:[],
            groupIds:[]
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
    
    useEffect(() => {
       setDisableToolbar(selectedRequests.length == 0)
    }, [selectedRequests])

    useEffect( ()=> {
        mounted ? searchOptions.getSearchList(current_page, per_page, multiFilter ) : null
        if(multiFilter.query != "" || (multiFilter.labelIds && multiFilter.labelIds.length>0) || (multiFilter.groupIds && multiFilter.groupIds.length>0) )
            setDisableCancelFilter(false);
        else setDisableCancelFilter(true);            
    }, [multiFilter])
    
    const handleCancelFilter = () => {
        setMultiFilter({
            query: '',
            labelIds:[],
            groupIds:[]
        })
    }

    const toggleGroupFilter = (groupId) => {
        setMultiFilter( state => ({
            query: state.query,
            labelIds: state.labelIds,
            groupIds:handleIds(state.groupIds, groupId)
        }))
    }

    const toggleLabelFilter = (labelId) => {
        setMultiFilter( state => ({
            query: state.query,
            labelIds: handleIds(state.labelIds, labelId),
            groupIds: state.groupIds 
        }))
    };

    
    const toggleAllCheckbox = (e) => {
        const chk=e.target.checked
        setSelectedRequests( chk ? [...data.map(rif => rif.id )] : [])
    }

    const toggleRequests = (id) => {
        setSelectedRequests(state => ( handleIds([...state], id)))
    }

    return (
        mounted &&
        <>
            <h1 className="section-title large"><FormattedMessage {...messages.header} /></h1>
            <div className="search-filter-bar">
                <Row>
                    <Col sm={4}>
                        {searchOptions &&
                            <InputSearch
                                submitCallBack={(query) => { 
                                    setMultiFilter( state => ({
                                        query:query,
                                        labelIds:state.labelIds,
                                        groupIds:state.groupIds,
                                    }) )
                                } 
                                }
                                query={multiFilter.query}
                                searchOnChange={searchOptions.searchOnChange ? searchOptions.searchOnChange : false}
                            />
                        }
                    </Col>
                    <Col sm={3}>
                        <FilterSelect 
                            type={"groups"} 
                            options={groupsOptionList} 
                            selectedIds={multiFilter.groupIds}
                            submitCallBack={(groupId) => setMultiFilter( state => ({
                                query: state.query,
                                labelIds: state.labelIds,
                                groupIds:handleIds(state.groupIds, groupId)
                            }) ) } /> 
                    </Col>
                    <Col sm={3}>
                        <FilterSelect 
                                type={"labels"} 
                                options={labelsOptionList} 
                                selectedIds={multiFilter.labelIds}
                                submitCallBack={(labelId) => setMultiFilter( state => ({
                                    query: state.query,
                                    labelIds: handleIds(state.labelIds, labelId),
                                    groupIds: state.groupIds
                        }) ) } /> 
                    </Col>
                    <Col sm={2}>{!disableCancelFilter && <a href="#" onClick={handleCancelFilter} className="btn btn-link active"><FormattedMessage {...messages.ResetAll} /></a> }</Col>
                </Row>
                <Row>
                    <Col md={12} className="activeFilters">
                    { groupsOptionList && multiFilter.groupIds && multiFilter.groupIds.length>0 &&
                     <ul id="groupsActiveFilter" className="filtersList">    
                      {multiFilter.groupIds.map( el => 
                        <li key={el} className="groupFilter">{groupsOptionList.filter( (listItem) => (listItem.value===el))[0].label} <i className="fas fa-times"  onClick={() => toggleGroupFilter(el) }></i></li>
                        ) 
                      }
                      </ul>
                    }
                    { labelsOptionList && multiFilter.labelIds && multiFilter.labelIds.length>0 &&
                     <ul id="labelsActiveFilter" className="filtersList">    
                      {multiFilter.labelIds.map( el => 
                         <li key={el} className="labelFilter">{labelsOptionList.filter( (listItem) => (listItem.value===el))[0].label} <i className="fas fa-times"  onClick={() => toggleLabelFilter(el) }></i></li>
                        ) 
                      }
                      </ul>
                    }
                    </Col>
                </Row>
            </div>
            
            <div className="requestList list-wrapper">
                <Row className="list-head">
                    <div className="select-checkbox">
                        <div className="features-icons" >
                            <input type="checkbox" onChange={(e)=>toggleAllCheckbox(e)}/>
                            {<Button disabled={disableToolbar} color="icon">
                                <i className="fas fa-print"></i>
                            </Button>}
                            {<Button disabled={disableToolbar} color="icon">
                                <i className="fas fa-file-export"></i>
                            </Button>}
                        </div>
                    </div>
                    <div className="select-counter">
                        <FormattedMessage {...messages.RequestSelected} /> {selectedRequests.length} di {data.length} 
                    </div>
                </Row>
                <Loader show={loading}>
                    <div className="list-body">
                        {data.length > 0 &&
                            data.map(req => (
                                <RequestItem 
                                    key={`request-${req.id}`}
                                    data={req}
                                    editPath={props.editPath}
                                    toggleSelection={() => toggleRequests(req.id)}
                                    checked={selectedRequests.includes(req.id)}
                                />
                                
                                
                            ))
                        ||
                            <h5 className="text-center">
                                {intl.formatMessage(messages.RequestsNotFound)}
                            </h5>
                        }
                    </div>
                </Loader>
            </div>
           {/*  <CustomModal
                modal={modal}
                toggle={toggle}>
                <ReferencesPage
                    match={match} />
            </CustomModal> */}
            {Object.keys(pagination).length &&
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

export default RequestsList
