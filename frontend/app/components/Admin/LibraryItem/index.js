import React,{useState} from 'react';
import {Row, Col, Button} from 'reactstrap';
import {useIntl} from 'react-intl';
import { generatePath } from "react-router";
import { formatDateTime } from '../../../utils/dates';
import CustomCheckBox from 'components/Form/CustomCheckBox';
//import RequestTags from '../RequestTags';
import './style.scss';
import { Link } from 'react-router-dom';
import LibraryInformations from '../../Library/LibraryInformations';


export const editurl=(reqPath,id,op) => {
    return generatePath(reqPath, {
        id,
        op
    });
}


const statusInfo = (lib) => {  

    let ret="";

    switch (lib.status) {
        case -1: ret=<i className='fas fa-plus' title={lib.status_key}></i>
                 break;
        case 0: ret=<i className='fas fa-ban' title={lib.status_key}></i>
                break;         
        case 1: ret=<i className='fas fa-check-circle' title={lib.status_key}></i>
                break;                 
        case 2: ret=<i className='fas fa-redo' title={lib.status_key}></i>
        break;                 

        case 3: ret=<i className='fas fa-poo' title={lib.status_key}></i>
        break;                  

        case 4: ret=<i className='fas fa-stopwatch' title={lib.status_key}></i>
        break;                 

        case 5: ret=<i className='fas fa-coins' title={lib.status_key}></i>
        break;                 

        default: ret=lib.status_key
    }

    return <span className='library_status'>{ret}</span>
}

export const canEnable = (lib) => {    
    if( 
        (lib.status==-1 || 
        lib.status==2 || 
        lib.status==0 || 
        lib.status==3 ||
        lib.status==5 ) && (lib.institution && lib.institution.data.status==1) 
    ) return true;

    return false;
}

export const canDelete = (lib) => {
    return lib.status==-1
}

export const canDisable = (lib) => {
    if( lib.status==1 || lib.status==2|| lib.status==4)        
     return true;

    return false;
}

export const canDisableBad = (lib) => {
    if( lib.status==1)        
     return true;

    return false;
}

export const canDisableDidntPaid = (lib) => {
    if( lib.status==1)        
     return true;

    return false;
}

export const canDisableSubscriptionExpired = (lib) => {
    if(lib.status==2)        
     return true;

    return false;
}
export const canRenew = (lib) => {
    if( lib.status==1||
        lib.status==0||
        lib.status==4
        
    )        
     return true;

    return false;
}





export const LibraryOperations = (props) => {
    const {data,changeStatusLibrary,deleteLibrary}=props;    
      
    return (        
        <div className={"library_operations"}>                                                                            
                {canDelete(data) && deleteLibrary && <a className="btn btn-icon btn-sm" onClick={()=>deleteLibrary()}><i className="fas fa-trash"></i></a>}                                                
                {canEnable(data) && changeStatusLibrary && <a className="btn btn-icon btn-sm" onClick={()=>changeStatusLibrary(1)}><i className="fas fa-check-circle"></i></a>}                                                
            
                {canDisable(data) && changeStatusLibrary && <a className="btn btn-icon btn-sm" onClick={()=>changeStatusLibrary(0)}><i className="fas fa-ban"></i></a>}
                {canDisableBad(data) && changeStatusLibrary && <a className="btn btn-icon btn-sm" onClick={()=>changeStatusLibrary(3)}><i className="fas fa-poo"></i></a>}
                {canDisableDidntPaid(data) && changeStatusLibrary && <a className="btn btn-icon btn-sm" onClick={()=>changeStatusLibrary(5)}><i className="fas fa-coins"></i></a>}
                {canDisableSubscriptionExpired(data) && changeStatusLibrary && <a className="btn btn-icon btn-sm" onClick={()=>changeStatusLibrary(4)}><i className="fas fa-stopwatch"></i></a>}                        
                
                {canRenew(data) && changeStatusLibrary && <a className="btn btn-icon btn-sm" onClick={()=>changeStatusLibrary(2)}><i className="fas fa-redo"></i></a>}                                                                                                
        </div>
    )
}


const LibraryItem = (props) => {
    const {editPath,data,toggleSelection,checked,removeTag,deleteLibrary,changeStatusLibrary} = props      
    const intl = useIntl();  

    const subscriptionurl=(reqPath,id) => {
        return generatePath(reqPath, {
            id,
            op: 'subscriptions'
        });        
    }

    return (
        <Row className="library_item list-row">
            <Col sm={5}>
                <CustomCheckBox 
                    handleChange={toggleSelection}
                    checked={checked}
                /> 
               <LibraryInformations data={data} detailUrl={editurl(editPath,data.id)}  showILLInfo={false} showPaymentInfo={true}/>
            </Col>
            <Col sm={3}>                                                      
                <Link className="btn btn-icon btn-sm" to={subscriptionurl(editPath,data.id)}><i className="fas fa-file-contract"></i></Link> 
                {formatDateTime(data.created_at)}                                
            </Col>
            <Col sm={1}>
                {statusInfo(data)}
                {data.institution && data.institution.data.status!=1 && <>&nbsp;<i className='fas fa-exclamation-triangle text-danger'></i></>}
            </Col>
            <Col sm={3}>      
            <LibraryOperations data={data} changeStatusLibrary={changeStatusLibrary} deleteLibrary={deleteLibrary}/>                
            </Col>            
        </Row>
    )
}

export default LibraryItem