import React, {useEffect, useState} from 'react'
import {Row, Col, Button} from 'reactstrap'
import messages from './messages'
// import globalMessages from 'utils/globalMessages'
import { FormattedMessage } from 'react-intl';
import {Pagination, InputSearch} from 'components';
import Loader from 'components/Form/Loader';
import CustomModal from 'components/Modal/Loadable'
import {useIntl} from 'react-intl';
// import ButtonPlus from 'components/Button/ButtonPlus'
// import { generatePath } from "react-router";
// import ReferencesPage from 'containers/Patron/ReferencesPage'
// import { NavLink } from 'react-router-dom';
import BorrowingItem from '../BorrowingItem';
import FilterSelect from '../../FilterSelect';
import ApplyTag from '../../ApplyTag';
import CustomCheckBox from 'components/Form/CustomCheckBox';
import SectionTitle from 'components/SectionTitle';
import './style.scss';
import FindISSNISBN from '../../FindISSNISBN';

const BorrowingsList = (props) => {
    console.log('BorrowingsList', props)
    const { editPath,loading, data, pagination, searchOptions, tagsOptionList, removeTagFromRequest,applyTags,deleteReference,findAndUpdateOABorrowingReference,oaloading,forwardRequest,askTrashRequest,askCancelRequest,askArchiveRequest,askArchiveRequestAsNotReceived,findISSNISBNcb,findISSNISBNresults,updateISSNISBNReference,setReceivedRequest,setNotReceivedRequest,savedAsDownloaded,deleteRequest} = props
    const {total_pages, current_page,total,count,per_page} = pagination
    const intl = useIntl();
    const [mounted, setMounted] = useState(false)
    const [findISSNISBNmodal, setfindISSNISBNmodal] = useState(false);    
    const [currentReq,setCurrentReq]=useState(null);
    const [selectedRequests, setSelectedRequests] = useState([]);
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
       setDisableToolbar(selectedRequests.length == 0)
    }, [selectedRequests])

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
        setSelectedRequests( chk ? [...data.map(req => req.id )] : [])
    }

    const toggleRequest = (id) => {
        setSelectedRequests(state => ( handleIds([...state], id)))
    }



    const findAndUpdateOA=(req,filter)=>{
        let data={}
        
        if(req.reference.data.material_type && req.reference.data.material_type===1)
            data.title=req.reference.data.part_title
        else data.title=req.reference.data.title

        if(req.reference.data.doi)
            data.doi=req.reference.data.doi

        if(req.reference.data.pmid)
            data.pmid=req.reference.data.pmid

        findAndUpdateOABorrowingReference(req.id,req.reference.data.id,data,filter)
    }

    const findISSNISBNtoggle = (req) => {
        setCurrentReq(req);
        setfindISSNISBNmodal(!findISSNISBNmodal);
    }

    const findISSNISBNcallback=(req) => {
        let data={}

        console.log("findISSNISBNcallback",req)

        data.material_type=req.reference.data.material_type

        if(req.reference.data.material_type && req.reference.data.material_type===1)
        {
            data.title=req.reference.data.pub_title
            data.year=req.reference.data.pubyear
        }
        else data.title=req.reference.data.pub_title
        
        if(req.reference.data.issn)
            data.issn=req.reference.data.issn
        
        if(req.reference.data.isbn)
            data.isbn=req.reference.data.isbn

        console.log("findISSNISBNcallback DATA",data)
        findISSNISBNcb(req.id,data)
    }

    const updateISSNISBNcallback=(data,req,multiFilter)=>{        
        setfindISSNISBNmodal(false)
        updateISSNISBNReference(data,req,multiFilter)
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
            </div>
            
            <div className="borrowingList list-wrapper">
                <Row className="list-head">
                    <div className="select-checkbox">
                        <div className="features-icons" >
                            <CustomCheckBox handleChange={(e)=>toggleAllCheckbox(e)} />
                            {<Button disabled={disableToolbar} color="icon" className="ml-2">
                                <i className="fa-solid fa-print"></i>
                            </Button>}
                            {<Button disabled={disableToolbar} color="icon">
                                <i className="fa-solid fa-file-export"></i>
                            </Button>}
                            {applyTags && <ApplyTag
                                type="tag"
                                disabled={disableToolbar}
                                submitCallBack={(ids) => applyTags(ids, selectedRequests,multiFilter)}
                                options={tagsOptionList} 
                            />
                            }
                        </div>
                    </div>
                    <div className="select-counter">
                        <FormattedMessage {...messages.BorrowingSelected} /> {selectedRequests.length} di {data.length} 
                    </div>
                </Row>
                <Loader show={loading}>
                    <div className="list-body">
                        {data.length > 0 &&
                            data.map(req => (
                                <BorrowingItem 
                                    key={`borrowing-${req.id}`}
                                    data={req}                                    
                                    editPath={editPath}
                                    toggleSelection={() => toggleRequest(req.id)}
                                    removeTag={removeTagFromRequest? (tagId) => {
                                        removeTagFromRequest(req.id,tagId, multiFilter) 
                                    }:undefined}
                                    
                                    //deleteReference={() => deleteReference(ref.id,multiFilter)}
                                    checked={selectedRequests.includes(req.id)}
                                    //findAndUpdateOA={()=>findAndUpdateOA(ref.id,ref.material_type===1?ref.part_title:ref.title)}
                                    findAndUpdateOABorrowingReference={()=>findAndUpdateOA(req,multiFilter)}
                                    findISSNISBNtoggle={()=>findISSNISBNtoggle(req)}
                                    forwardRequest={()=>forwardRequest(req.id,multiFilter)}
                                    askTrashRequest={(typ)=>askTrashRequest(req.id,typ,multiFilter)}
                                    askCancelRequest={()=>askCancelRequest(req.id,multiFilter)}
                                    askArchiveRequest={()=>askArchiveRequest(req.id,multiFilter)}
                                    deleteRequest={()=>deleteRequest(req.id,multiFilter)}
                                    askArchiveRequestAsNotReceived={()=>askArchiveRequestAsNotReceived(req.id,multiFilter)}
                                    oaloading={oaloading.includes(req.id)}
                                    setReceivedRequest={()=>setReceivedRequest(req.id,multiFilter)}
                                    setNotReceivedRequest={()=>setNotReceivedRequest(req.id,multiFilter)}
                                    savedAsDownloaded={()=>savedAsDownloaded(req.id,multiFilter)}
                                />                                
                                
                                
                            ))
                        ||
                            <h5 className="text-center">
                                {intl.formatMessage(messages.BorrowingsNotFound)}
                            </h5>
                        }
                    </div>
                </Loader>
            </div>
            <CustomModal
                modal={findISSNISBNmodal}
                toggle={()=>setfindISSNISBNmodal(!findISSNISBNmodal)}>
                <FindISSNISBN 
                reqdata={currentReq}
                results={findISSNISBNresults}
                findCB={()=>findISSNISBNcallback(currentReq)}
                updateISSNISBNcallback={(data)=>updateISSNISBNcallback(data,currentReq,multiFilter)}
                />                    
            </CustomModal>
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

export default BorrowingsList
