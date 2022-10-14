import React from 'react';
import {Row, Col, Button} from 'reactstrap';
import {useIntl} from 'react-intl';
import { generatePath } from "react-router";
import { formatDateTime } from '../../../utils/dates';
import CustomCheckBox from 'components/Form/CustomCheckBox';
//import RequestTags from '../RequestTags';
import './style.scss';
import { Link } from 'react-router-dom';


export const editurl=(reqPath,id,op) => {
    return generatePath(reqPath, {
        id,
        op
    });
}

export const subscriptionurl=(reqPath,id) => {
    return editurl(reqPath,id,'subscriptions');
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

/* lib status
'new' => -1,
'disabled'=> 0, 
'enabled'=> 1,                        
'renewing'=> 2, 
'disabled_bad'=>3,
'disabled_subscription_expired'=> 4, 
'disabled_didntpaid' =>5 
*/
export const canEnable = (lib) => {    
    if( 
        (lib.status==-1 || 
        lib.status==2 || 
        lib.status==0 || 
        lib.status==3) && (lib.institution && lib.institution.data.status==1) 
    ) return true;

    return false;
}

export const canDelete = (lib) => {
    return lib.status==-1
}

export const canDisable = (lib) => {
    if( lib.status==1 || lib.status==2)        
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
        lib.status==3||
        lib.status==4||
        lib.status==5
    )        
     return true;

    return false;
}

export const LibraryInfo = (props) => {

    const intl = useIntl();

    const {data,customClass}=props;

    return (
        <div className={"library_info"}>            
            {/*<span className="status-text">{data.borrowing_status ? intl.formatMessage({id: "app.requests."+data.borrowing_status}):'xxx'}</span>*/}                    
            <div className='address'>address</div>
            <div className='institution'>
                <span className='badge badge-secondary'>{data.institution.data.name} <span className='text-warning'>{data.institution.data.status==2?<i class="fas fa-exclamation-triangle"></i>:''}</span></span>                
            </div>

            {/*data.operator && <div className="status-operator">
                <i className="simple_icon fas fa-user-cog"></i> { data.operator.data.full_name}
                {data.borrowing_notes && <span className="borrowing_notes">
                <span id={`tooltip-${data.id}`} className="active"><i className="fas fa-sticky-note"></i></span> 
                <UncontrolledTooltip autohide={false} placement="right" target={`tooltip-${data.id}`}>
                    {data.borrowing_notes}
                </UncontrolledTooltip>                                
                </span>}
            </div>*/}            
            {data.projects && data.projects.data && data.projects.data.length>0 && 
                <div className='projects'>                    
                    {data.projects.data.map(prj => <span key={prj.id}>
                        <span class="project-item badge badge-secondary text-white">{prj.name}</span>                         
                    </span>)}
                </div>
            }
                          
        </div>
    )
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

    return (
        <Row className="library_item list-row">
            <Col sm={5}>
                <CustomCheckBox 
                    handleChange={toggleSelection}
                    checked={checked}
                /> 
                <div className="request_id"><Link to={editurl(editPath,data.id)} className="active"><span>{data.name}</span></Link></div>
                <LibraryInfo data={data} customClass="library_info"/>                                 
            </Col>
            <Col sm={3}>
                <>
                <Link to={subscriptionurl(editPath,data.id)} className="active subscriptionlink"><i className="fas fa-file-contract"></i></Link>                
                {formatDateTime(data.created_at)}                
                </>
            </Col>
            <Col sm={1}>
                {statusInfo(data)}
            </Col>
            <Col sm={3}>      
            <LibraryOperations data={data} changeStatusLibrary={changeStatusLibrary} deleteLibrary={deleteLibrary}/>                
            </Col>            
        </Row>
    )
}

export default LibraryItem