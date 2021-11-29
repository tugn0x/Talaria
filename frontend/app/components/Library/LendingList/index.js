import React, {useEffect, useState} from 'react'
import {Row, Col, Button} from 'reactstrap'
import messages from './messages'
import { FormattedMessage } from 'react-intl';
import {Pagination, InputSearch} from 'components';
import Loader from 'components/Form/Loader';
import {useIntl} from 'react-intl';
import LendingItem from '../LendingItem';
import FilterSelect from '../../FilterSelect';
import ApplyTag from '../../ApplyTag';
import CustomCheckBox from 'components/Form/CustomCheckBox';
import SectionTitle from 'components/SectionTitle';
import './style.scss';

const LendingsList = (props) => {
   
    console.log('LendingsList', props)
    const { match, editPath,loading, data, pagination, searchOptions, tagsOptionList, removeTagFromRequest,applyTags,UpdateLendingRequestStatus, UpdateLendingArchivedStatus,UpdateLendingAcceptRequest, deleteReference,findAndUpdateOABorrowingReference,oaloading, FulfillLendingRequestStatus} = props
    const {total_pages, current_page,total,count,per_page} = pagination
    const intl = useIntl();
    const [mounted, setMounted] = useState(false)
    const [selectedRequests, setSelectedRequests] = useState([]);
    const [disableToolbar,setDisableToolbar]=useState(false);
    const [disableCancelFilter,setDisableCancelFilter]=useState(true);
    const [multiFilter, setMultiFilter ] = useState(
        {
            query: '',
            labelIds:[],            
        }
    );
    const [hidetagsAllLender, setHidetagsAllLender] = useState(false)
    const [hideapplytagarchive, setHideapplytagarchive] = useState(false)

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
        if(props.match.path.includes("allrequests")) 
            setHidetagsAllLender(true)

        if(props.match.path.includes("archive")) 
            setHideapplytagarchive(true)    

        setMounted(true)
     }, [])
    
    useEffect(() => {
       setDisableToolbar(selectedRequests.length == 0)
    }, [selectedRequests])

    useEffect( ()=> {
        mounted ? searchOptions.getSearchList(current_page, per_page, multiFilter ) : null
        if(multiFilter.query != "" || (multiFilter.labelIds && multiFilter.labelIds.length>0) )
            setDisableCancelFilter(false);
        else setDisableCancelFilter(true);            
    }, [multiFilter])

 
    const handleCancelFilter = () => {
        setMultiFilter({
            query: '',
            labelIds:[],            
        })
    }

    const toggleTagFilter = (labelId) => {
        setMultiFilter( state => ({
            query: state.query,
            labelIds: handleIds(state.labelIds, labelId),            
        }))
    };

    
    const toggleAllCheckbox = (e) => {
        const chk=e.target.checked
        setSelectedRequests( chk ? [...data.map(req => req.id )] : [])
    }

    const toggleRequest = (id) => {
        setSelectedRequests(state => ( handleIds([...state], id)))
    }

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
                                        labelIds:state.labelIds,                                        
                                    }) )
                                } 
                                }
                                query={multiFilter.query}
                                searchOnChange={searchOptions.searchOnChange ? searchOptions.searchOnChange : false}
                            />
                        }
                    </Col>                    
                    <Col md={3} sm={5}>
                        {!hidetagsAllLender && <FilterSelect 
                                type={"tags"} 
                                options={tagsOptionList} 
                                selectedIds={multiFilter.labelIds}
                                submitCallBack={(labelId) => setMultiFilter( state => ({
                                    query: state.query,
                                    labelIds: handleIds(state.labelIds, labelId),                                    
                        }) ) } /> 
                    }
                    </Col>
                    <Col md={3} sm={5}>                    
                    </Col>
                    <Col sm={2}>{!disableCancelFilter && <a href="#" onClick={handleCancelFilter} className="btn btn-link active"><FormattedMessage {...messages.ResetAll} /></a> }</Col>
                </Row>
                <Row>
                    <Col md={12} className="activeFilters">                    
                    { tagsOptionList && multiFilter.labelIds && multiFilter.labelIds.length>0 &&
                     <ul id="labelsActiveFilter" className="filtersList">    
                      {multiFilter.labelIds.map( el => 
                         <li key={el} className="labelFilter">{tagsOptionList.filter( (listItem) => (listItem.value===el))[0].label} <i className="fas fa-times"  onClick={() => toggleTagFilter(el) }></i></li>
                        ) 
                      }
                      </ul>
                    }
                    </Col>
                </Row>
            </div>
            
            <div className="borrowingList list-wrapper">
                <Row className="list-head">
                    <div className="select-checkbox">
                        <div className="features-icons" >
                            <CustomCheckBox handleChange={(e)=>toggleAllCheckbox(e)} />
                            {<Button disabled={disableToolbar} color="icon" className="ml-2">
                                <i className="fas fa-print"></i>
                            </Button>}
                            {<Button disabled={disableToolbar} color="icon">
                                <i className="fas fa-file-export"></i>
                            </Button>}
                            {applyTags && <ApplyTag
                                type="label"
                                disabled={disableToolbar|| hidetagsAllLender || hideapplytagarchive}
                                submitCallBack={(ids) => applyTags(ids, selectedRequests)}
                                options={tagsOptionList} 
                            />
                            }
                        </div>
                    </div>
                    <div className="select-counter">
                    <FormattedMessage {...messages.LendingSelected} /> {selectedRequests.length} di {data.length} 
                    </div>
                </Row>
                { <Loader show={loading}>
                    <div className="list-body">
                        {data.length > 0 &&
                            data.map(req => (
                                
                                <LendingItem 
                                    match={match}
                                    key={`lending-${req.id}`}
                                    data={req}                                    
                                    editPath={editPath}
                                    toggleSelection={() => toggleRequest(req.id)}
                                    removeTag={removeTagFromRequest? (tagId) => {
                                        removeTagFromRequest(req.id,tagId, multiFilter) 
                                    }:undefined}
                                    checked={selectedRequests.includes(req.id)}
                                    UpdateLendingRequestStatus={(data)=>UpdateLendingRequestStatus(data)}
                                    UpdateLendingArchivedStatus={(data)=>UpdateLendingArchivedStatus(data)}
                                    UpdateLendingAcceptRequest={(data)=>UpdateLendingAcceptRequest(data)}
                                    // oaloading={oaloading.includes(req.id)}
                                />                                
                                
                                
                            ))
                        ||
                            <h5 className="text-center">
                                {intl.formatMessage(messages.LendingsNotFound)}
                            </h5>
                        }
                    </div>
                </Loader> }
            </div>
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

export default LendingsList
