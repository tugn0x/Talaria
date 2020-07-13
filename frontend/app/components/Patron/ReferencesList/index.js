import React, {useEffect, useState} from 'react'
import {Row, Col} from 'reactstrap'
import messages from './messages'
// import globalMessages from 'utils/globalMessages'
import { FormattedMessage } from 'react-intl';
import {Pagination, InputSearch} from 'components';
// import CustomModal from 'components/Modal/Loadable'
import {useIntl} from 'react-intl';
// import ButtonPlus from 'components/Button/ButtonPlus'
import { generatePath } from "react-router";
// import ReferencesPage from 'containers/Patron/ReferencesPage'
import { NavLink } from 'react-router-dom';
import ReferenceItem from '../ReferenceItem';
import FilterSelect from '../FilterSelect';
import ApplyLabGroup from '../ApplyLabGroup';

import './style.scss';

const ReferencesList = (props) => {
    console.log('ReferencesList', props)
    const { data, pagination, searchOptions, labelsOptionList, groupsOptionList,removeLabelFromReference,removeGroupFromReference,applyLabels,applyGroups} = props
    const {total_pages, current_page,total,count,per_page} = pagination
    const intl = useIntl();
    const [mounted, setMounted] = useState(false)
    /*  const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal); */

    const [selectedReferences, setSelectedReferences] = useState([]);
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
       setDisableToolbar(selectedReferences.length == 0)
    }, [selectedReferences])

    useEffect( ()=> {
        mounted ? searchOptions.getSearchList(current_page, per_page, multiFilter ) : null
        if(multiFilter.query != "" || (multiFilter.labelIds && multiFilter.labelIds.length>0) || (multiFilter.groupIds && multiFilter.groupIds.length>0) )
            setDisableCancelFilter(false);
        else setDisableCancelFilter(true);            
    }, [multiFilter])

    /* const linkTo = (path) => {
        history.push(path)
     }; */

    
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
        setSelectedReferences( chk ? [...data.map(rif => rif.id )] : [])
    }

    const toggleReference = (id) => {
        setSelectedReferences(state => ( handleIds([...state], id)))
    }

    var disableToolbarClass = disableToolbar? 'disabled':'';

    return (
        <>
            <h1 className="section-title large"><FormattedMessage {...messages.header} /></h1>
            {/* <ButtonPlus
                onClickHandle={toggle}
                text={intl.formatMessage(messages.createNewReference)}
            /> */}
            <div className="search-filter-bar">
                <Row>
                    <Col md={4}>
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
                    <Col md={3}>
                        { groupsOptionList.length > 0 && 
                            <FilterSelect 
                                type={"groups"} 
                                options={groupsOptionList} 
                                selectedIds={multiFilter.groupIds}
                                submitCallBack={(groupId) => setMultiFilter( state => ({
                                    query: state.query,
                                    labelIds: state.labelIds,
                                    groupIds:handleIds(state.groupIds, groupId)
                                }) ) } /> } 
                    </Col>
                    <Col md={3}>
                        
                        { labelsOptionList.length > 0 && 
                            <FilterSelect 
                                type={"labels"} 
                                options={labelsOptionList} 
                                selectedIds={multiFilter.labelIds}
                                submitCallBack={(labelId) => setMultiFilter( state => ({
                                    query: state.query,
                                    labelIds: handleIds(state.labelIds, labelId),
                                    groupIds: state.groupIds
                        }) ) } /> }
                    </Col>
                    <Col md={2}>{!disableCancelFilter && <a href="#" onClick={handleCancelFilter} className="btn btn-link active"><FormattedMessage {...messages.ResetAll} /></a> }</Col>
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
            
            <div className="referenceList list-wrapper">
                <Row className="list-head">
                    <Col sm={10} className="select-checkbox">
                        <div className="features-icons" >
                            <input type="checkbox" onChange={(e)=>toggleAllCheckbox(e)}/>
                            
                            {<NavLink to='#'  className={`btn btn-link ${disableToolbarClass} `}>
                                <i className="fas fa-print"></i>
                            </NavLink>}
                            {<NavLink to='#'  className={`btn btn-link ${disableToolbarClass} `}>
                                <i className="fas fa-file-export"></i>
                            </NavLink>}
                            <ApplyLabGroup 
                                type="labels"
                                disabled={disableToolbar}
                                submitCallBack={(ids) => applyLabels(ids, selectedReferences)}
                                options={labelsOptionList} 
                            />
                            <ApplyLabGroup 
                                type="groups"
                                disabled={disableToolbar}
                                submitCallBack={(ids) => applyGroups(ids, selectedReferences)}
                                options={groupsOptionList} 
                            />
                            {/* <NavLink to="#" onClick={applyGroups} className="btn btn-link">
                                <i className="fas fa-folder-plus"></i>
                            </NavLink> */}
                            
                        </div>
                    </Col>
                    <Col sm={2} className="select-counter">
                     {selectedReferences.length} di {data.length} 
                    </Col>
                </Row>
                <div className="list-body">
                    {data.length > 0 &&
                        data.map(ref => (
                            <ReferenceItem 
                                key={`reference-${ref.id}`}
                                data={ref}
                                editPath={props.editPath}
                                toggleSelection={() => toggleReference(ref.id)}
                                removeLabel={(labelId) => removeLabelFromReference(ref.id,labelId, multiFilter)}
                                removeGroup={(groupId) => removeGroupFromReference(ref.id,groupId, multiFilter)}
                                checked={selectedReferences.includes(ref.id)}
                            />
                            
                            
                        ))
                    ||
                        <h5 className="text-center">
                            {intl.formatMessage(messages.ReferencesNotFound)}
                        </h5>
                    }
                </div>
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

export default ReferencesList
