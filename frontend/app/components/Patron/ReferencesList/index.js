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

import './style.scss';

const ReferencesList = (props) => {
    console.log('ReferencesList', props)
    const {match, data, pagination, history, searchOptions, labelsOptionList, groupsOptionList} = props
    const {total_pages, current_page} = pagination
    const intl = useIntl();
    /*  const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal); */

    const [selectedReferences, setSelectedReferences] = useState([]);
    const [disableToolbar,setDisableToolbar]=useState(false);

    const [multiFilter, setMultiFilter] = useState(
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
       setDisableToolbar(selectedReferences.length == 0)
    }, [selectedReferences])

    useEffect( ()=> {
        searchOptions.getSearchList(multiFilter)
    }, [multiFilter])

    const linkTo = (path) => {
        history.push(path)
     };

    
    const toggleAllCheckbox = (e) => {
        const chk=e.target.checked
        setSelectedReferences( chk ? [...data.map(rif => rif.id )] : [])
    }

    const toggleReference = (id) => {
        setSelectedReferences(state => {
            console.log(handleIds([...state], id))
            return handleIds([...state], id)
        })
    }

    return (
        <>
            <h3 className="table-title text-center"><FormattedMessage {...messages.header} /></h3>
           {/*  <ButtonPlus
                onClickHandle={toggle}
                text={intl.formatMessage(messages.createNewReference)}
            /> */}
            <div className="search-filter-bar">
                <Row>
                    <Col md="4">
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
                                searchOnChange={searchOptions.searchOnChange ? searchOptions.searchOnChange : false}
                            />
                        }
                    </Col>
                    <Col md="3">
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
                    <Col md="3">
                        
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
                    <Col md="2">Cancella tutto</Col>
                </Row>
                <Row>
                    <Col md={12}>Filtri attivi</Col>
                </Row>
            </div>
            
            <div className="referenceList list-wrapper">
                <Row className="list-head">
                    <Col sm={10} className="select-checkbox">
                        <div className="features-icons" >
                            <input type="checkbox" onChange={(e)=>toggleAllCheckbox(e)}/>
                            {!disableToolbar && <>
                            {<NavLink to='#'  className="btn btn-link" >
                                <i className="fa fa-2x fa-print"></i>
                            </NavLink>}
                            {<NavLink to='#'  className="btn btn-link">
                                <i className="fa fa-2x fa-download"></i>
                            </NavLink>}
                            {<NavLink to='#'  className="btn btn-link">
                                <i className="fa fa-2x fa-tag"></i>
                            </NavLink>}
                            {<NavLink to='#'  className="btn btn-link">
                                <i className="fa fa-2x fa-folder"></i>
                            </NavLink>}
                            </>}
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
                                // checked={selectedReferences.length>0 && selectedReferences.includes(ref.id) ? true : false}
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
                    current_page={current_page}
                    total_pages={total_pages}
                    setPage={(page) => linkTo(generatePath(`${match.path}`, {
                        page: page
                    }))}
                />
            }
        </>
    )
}

export default ReferencesList
