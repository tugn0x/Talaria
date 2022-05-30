import React, {useEffect, useState} from 'react'
import {Row, Col, Button} from 'reactstrap'
import messages from './messages'
// import globalMessages from 'utils/globalMessages'
import { FormattedMessage } from 'react-intl';
import {Pagination} from 'components';
import Loader from 'components/Form/Loader';
import CustomModal from 'components/Modal/Loadable'
import {useIntl} from 'react-intl';
import PickupItem from '../PickupItem';
import SectionTitle from 'components/SectionTitle';
import './style.scss';

const PickupsList = (props) => {
    console.log('PickupsList', props)
    const { editPath,loading, data,pagination,searchOptions,changePickupStatus,deletePickup} = props
    const {total_pages, current_page,total,count,per_page} = pagination
    const intl = useIntl();
    const [mounted, setMounted] = useState(false)
    const [currentReq,setCurrentReq]=useState(null);
    const [selectedRequests, setSelectedRequests] = useState([]);
    

    useEffect(() => {
        setMounted(true)
     }, [])
     
    
    return (
        mounted &&
        <>
            <SectionTitle 
                title={props.sectionTitle}
            />                
            <div className="borrowingList list-wrapper">                
                <Loader show={loading}>
                    <div className="list-body">
                        {data.length > 0 &&
                            data.map(pick => (
                                <PickupItem 
                                    key={`pickup-${pick.id}`}
                                    data={pick}                                    
                                    editPath={editPath}   
                                    changePickupStatus={changePickupStatus}
                                    deletePickup={deletePickup}                                    
                                />                                                                                                
                            ))
                        ||
                            <h5 className="text-center">
                                {intl.formatMessage(messages.PickupsNotFound)}
                            </h5>
                        }
                    </div>
                </Loader>
            </div>
            {/*<CustomModal
                modal={findISSNISBNmodal}
                toggle={()=>setfindISSNISBNmodal(!findISSNISBNmodal)}>
                <FindISSNISBN 
                reqdata={currentReq}
                results={findISSNISBNresults}
                findCB={()=>findISSNISBNcallback(currentReq)}
                updateISSNISBNcallback={(data)=>updateISSNISBNcallback(data,currentReq,multiFilter)}
                />                    
            </CustomModal>*/}
            {Object.keys(pagination).length>0 &&
                <Pagination
                    total={total}
                    count={count}
                    per_page={per_page}
                    current_page={current_page}
                    total_pages={total_pages}
                    linkToPage={(page, pagesize) => searchOptions.getSearchList(page,pagesize, {} )}
                />    
            }
            </>
        
       
    )
}

export default PickupsList
