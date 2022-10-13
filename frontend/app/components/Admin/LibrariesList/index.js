import React, {useEffect, useState} from 'react'
import {Row, Col, Button} from 'reactstrap'
import messages from './messages'
import { FormattedMessage } from 'react-intl';
import {Pagination, InputSearch} from 'components';
import Loader from 'components/Form/Loader';
import CustomModal from 'components/Modal/Loadable'
import {useIntl} from 'react-intl';
import LibraryItem from '../LibraryItem';
import FilterSelect from '../../FilterSelect';
import ApplyTag from '../../ApplyTag';
import CustomCheckBox from 'components/Form/CustomCheckBox';
import SectionTitle from 'components/SectionTitle';
import './style.scss';

const LibrariesList = (props) => {
    console.log('LibrariesList', props)
    const { editPath,loading, data, pagination, searchOptions, tagsOptionList, removeTagFromRequest,deleteLibrary, changeStatusLibrary} = props
    const {total_pages, current_page,total,count,per_page} = pagination
    const intl = useIntl();
    const [mounted, setMounted] = useState(false)    
    const [selectedLibraries, setSelectedLibraries] = useState([]);
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
       setDisableToolbar(selectedLibraries.length == 0)
    }, [selectedLibraries])

    useEffect( ()=> {
        mounted ? searchOptions.getSearchList(current_page, per_page, multiFilter ) : null
        if(multiFilter.query != "" || (multiFilter.labelIds && multiFilter.labelIds.length>0) )
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
        setSelectedLibraries( chk ? [...data.map(lib => lib.id )] : [])
    }

    const toggleLibrary = (id) => {
        setSelectedLibraries(state => ( handleIds([...state], id)))
    }



    
    

    // var disableToolbarClass = disableToolbar? 'disabled':'';

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
                         <li key={el} className="tagFilter">{tagsOptionList.filter( (listItem) => (listItem.value===el))[0].label} <i className="fas fa-times"  onClick={() => toggleTagFilter(el) }></i></li>
                        ) 
                      }
                      </ul>
                    }
                    </Col>
                </Row>
                </div>*/}
            
            <div className="librariesList list-wrapper">
                {<Row className="list-head">
                    <div className="select-checkbox">
                        <div className="features-icons" >
                            <CustomCheckBox handleChange={(e)=>toggleAllCheckbox(e)} />
                            {<Button disabled={disableToolbar} color="icon" className="ml-2">
                                <i className="fas fa-print"></i>
                            </Button>}
                            {<Button disabled={disableToolbar} color="icon">
                                <i className="fas fa-file-export"></i>
                            </Button>}
                        </div>
                    </div>
                    <div className="select-counter">
                        <FormattedMessage {...messages.LibrarySelected} /> {selectedLibraries.length} di {data.length} 
                    </div>
                </Row>}
                <Loader show={loading}>
                    <div className="list-header">
                        {/*<Row className="list-row">
                            <Col xs={5}>
                                <span>Library</span>
                                <i className="fas fa-sort"  onClick={() => console.log('sort') }></i>
                            </Col>
                            <Col xs={3}>
                                <span>Registration/Subscription</span>
                                <i className="fas fa-sort"  onClick={() => console.log('sort') }></i>
                            </Col>
                            <Col xs={1}>
                                <span>Status</span>
                                <i className="fas fa-sort"  onClick={() => console.log('sort') }></i>
                            </Col>
                            <Col xs={3}>
                                <span>Operations</span>
                                <i className="fas fa-sort"  onClick={() => console.log('sort') }></i>
                            </Col>                        
                        </Row>*/}
                    </div>
                    <div className="list-body">
                        {data.length > 0 &&
                            data.map(lib => (
                                <LibraryItem 
                                    key={`lib-${lib.id}`}
                                    data={lib}                                    
                                    editPath={editPath}
                                    toggleSelection={() => toggleLibrary(lib.id)}
                                    //removeTag={removeTagFromRequest? (tagId) => {
                                    //    removeTagFromRequest(req.id,tagId, multiFilter) 
                                    //}:undefined}                                    
                                    //deleteLibrary={() => deleteLibrary(lib.id,multiFilter)}
                                    checked={selectedLibraries.includes(lib.id)}
                                    deleteLibrary={()=>deleteLibrary(lib.id,multiFilter)}
                                    changeStatusLibrary={(status)=>changeStatusLibrary(lib.id,status,multiFilter)}
                                    
                                />                                                                           
                            ))
                        ||                            
                            <h5 className="text-center">
                                {intl.formatMessage(messages.LibrariesNotFound)}
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

export default LibrariesList
