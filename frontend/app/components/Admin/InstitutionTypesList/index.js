import React, {useEffect, useState} from 'react'
import {Row, Col, Button} from 'reactstrap'
import messages from './messages'
import { FormattedMessage } from 'react-intl';
import {Pagination, InputSearch} from 'components';
import Loader from 'components/Form/Loader';
import CustomModal from 'components/Modal/Loadable'
import {useIntl} from 'react-intl';
import InstitutionTypeItem from '../InstitutionTypeItem';
import FilterSelect from '../../FilterSelect';
import ApplyTag from '../../ApplyTag';
import CustomCheckBox from 'components/Form/CustomCheckBox';
import SectionTitle from 'components/SectionTitle';
import './style.scss';

const InstitutionTypesList = (props) => {
    console.log('InstitutionTypesList', props)
    const { editPath,loading, data, pagination, searchOptions,deleteInstitutionType} = props
    const {total_pages, current_page,total,count,per_page} = pagination
    const intl = useIntl();
    const [mounted, setMounted] = useState(false)
    const [selectedInstitutionTypes, setSelectedInstitutionTypes] = useState([]);
    const [disableToolbar,setDisableToolbar]=useState(false);
    const [disableCancelFilter,setDisableCancelFilter]=useState(true);

    const [multiFilter, setMultiFilter ] = useState(
        {
            query: '',
            labelIds:[],            
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
       setDisableToolbar(selectedInstitutionTypes.length == 0)
    }, [selectedInstitutionTypes])

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
    
    const toggleAllCheckbox = (e) => {
        const chk=e.target.checked
        setSelectedInstitutionTypes( chk ? [...data.map(inst => inst.id )] : [])
    }

    const toggleInstitutionType = (id) => {
        setSelectedInstitutionTypes(state => ( handleIds([...state], id)))
    }    

    return (
        mounted &&
        <>
            <SectionTitle 
                title={props.sectionTitle}
            />
            {/*<div className="search-filter-bar">
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
                        {applyTags && <FilterSelect 
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
                         <li key={el} className="tagFilter">{tagsOptionList.filter( (listItem) => (listItem.value===el))[0].label} <i className="fa-solid fa-xmark"  onClick={() => toggleTagFilter(el) }></i></li>
                        ) 
                      }
                      </ul>
                    }
                    </Col>
                </Row>
                </div>*/}
            
            <div className="institutionTypesList list-wrapper">
                {<Row className="list-head">
                    <div className="select-checkbox">
                        <div className="features-icons" >
                            <CustomCheckBox handleChange={(e)=>toggleAllCheckbox(e)} />
                            {<Button disabled={disableToolbar} color="icon" className="ml-2">
                                <i className="fa-solid fa-print"></i>
                            </Button>}
                            {<Button disabled={disableToolbar} color="icon">
                                <i className="fa-solid fa-file-export"></i>
                            </Button>}
                        </div>
                    </div>
                    <div className="select-counter">
                        <FormattedMessage {...messages.InstitutionTypeSelected} /> {selectedInstitutionTypes.length} di {data.length} 
                    </div>
                </Row>}
                <Loader show={loading}>
                    <div className="list-header">
                        {/*<Row className="list-row">
                            <Col xs={5}>
                                <span>Library</span>
                                <i className="fa-solid fa-sort"  onClick={() => console.log('sort') }></i>
                            </Col>
                            <Col xs={3}>
                                <span>Registration/Subscription</span>
                                <i className="fa-solid fa-sort"  onClick={() => console.log('sort') }></i>
                            </Col>
                            <Col xs={1}>
                                <span>Status</span>
                                <i className="fa-solid fa-sort"  onClick={() => console.log('sort') }></i>
                            </Col>
                            <Col xs={3}>
                                <span>Operations</span>
                                <i className="fa-solid fa-sort"  onClick={() => console.log('sort') }></i>
                            </Col>                        
                        </Row>*/}
                    </div>
                    <div className="list-body">
                        {data.length > 0 &&
                            data.map(inst => (
                                <InstitutionTypeItem 
                                    key={`insttype-${inst.id}`}
                                    data={inst}                                    
                                    editPath={editPath}
                                    toggleSelection={() => toggleInstitutionType(inst.id)}                                                                        
                                    checked={selectedInstitutionTypes.includes(inst.id)}
                                    deleteInstitutionType={()=>deleteInstitutionType(inst.id,multiFilter)}                                    
                                    
                                />                                                                           
                            ))
                        ||                            
                            <h5 className="text-center">
                                {intl.formatMessage(messages.InstitutionTypesNotFound)}
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

export default InstitutionTypesList
