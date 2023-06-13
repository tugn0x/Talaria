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

    let intl=useIntl();

    switch (lib.status) {
        case -1: ret=<i className='fa-solid fa-circle-plus' title={intl.formatMessage({id: "app.manager.libraries.icon.new"})}></i>
                 break;
        case 0: ret=<i className='fa-solid fa-ban' title={intl.formatMessage({id: "app.manager.libraries.icon.disabled"})}></i>
                break;         
        case 1: ret=<i className='fa-solid fa-circle-check' title={intl.formatMessage({id: "app.manager.libraries.icon.enabled"})}></i>
                break;                 
        case 2: ret=<i className='fa-solid fa-rotate-right' title={intl.formatMessage({id: "app.manager.libraries.icon.renewing"})}></i>
        break;                 

        case 3: ret=<i className='fa-solid fa-poo' title={intl.formatMessage({id: "app.manager.libraries.icon.disabledBad"})}></i>
        break;                  

        case 4: ret=<i className='fa-solid fa-stopwatch' title={intl.formatMessage({id: "app.manager.libraries.icon.disabledExpired"})}></i>
        break;                 

        case 5: ret=<i className='fa-solid fa-coins' title={intl.formatMessage({id: "app.manager.libraries.icon.disabledNotPay"})}></i>
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

    let intl=useIntl();
      
    return (        
        <div className={"library_operations"}>                                                                            
                {canDelete(data) && deleteLibrary && <a className="btn btn-icon btn-sm" onClick={()=>deleteLibrary()}  title={intl.formatMessage({id: "app.manager.libraries.icon.delete"})}><i className="fa-solid fa-trash"></i></a>}                                                
                {canEnable(data) && changeStatusLibrary && <a className="btn btn-icon btn-sm" onClick={()=>changeStatusLibrary(1)}  title={intl.formatMessage({id: "app.manager.libraries.icon.enable"})}><i className="fa-solid fa-circle-check"></i></a>}                                                
            
                {canDisable(data) && changeStatusLibrary && <a className="btn btn-icon btn-sm" onClick={()=>changeStatusLibrary(0)}  title={intl.formatMessage({id: "app.manager.libraries.icon.disable"})}><i className="fa-solid fa-ban"></i></a>}
                {canDisableBad(data) && changeStatusLibrary && <a className="btn btn-icon btn-sm" onClick={()=>changeStatusLibrary(3)}  title={intl.formatMessage({id: "app.manager.libraries.icon.disableBad"})}><i className="fa-solid fa-poo"></i></a>}
                {canDisableDidntPaid(data) && changeStatusLibrary && <a className="btn btn-icon btn-sm" onClick={()=>changeStatusLibrary(5)}  title={intl.formatMessage({id: "app.manager.libraries.icon.disableNotPay"})}><i className="fa-solid fa-coins"></i></a>}
                {canDisableSubscriptionExpired(data) && changeStatusLibrary && <a className="btn btn-icon btn-sm" onClick={()=>changeStatusLibrary(4)}  title={intl.formatMessage({id: "app.manager.libraries.icon.disableExpired"})}><i className="fa-solid fa-stopwatch"></i></a>}                        
                
                {canRenew(data) && changeStatusLibrary && <a className="btn btn-icon btn-sm" onClick={()=>changeStatusLibrary(2)}  title={intl.formatMessage({id: "app.manager.libraries.icon.renew"})}><i className="fa-solid fa-rotate-right"></i></a>}                                                                                                
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
                {/*<Link className="btn btn-icon btn-sm" to={subscriptionurl(editPath,data.id)}><i className="fa-solid fa-file-contract"></i></Link>*/} 
                {formatDateTime(data.created_at)}                                
            </Col>
            <Col sm={1}>
                {statusInfo(data)}
                {data.institution && data.institution.data.status!=1 && <>&nbsp;<i className='fa-solid fa-triangle-exclamation text-danger'  title={intl.formatMessage({id: "app.manager.libraries.icon.institution_warning"})}></i></>}
            </Col>
            <Col sm={3}>      
            <LibraryOperations data={data} changeStatusLibrary={changeStatusLibrary} deleteLibrary={deleteLibrary}/>                
            </Col>            
        </Row>
    )
}

export default LibraryItem