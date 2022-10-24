import React,{useState} from 'react';
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

    const {data,editPath,customClass}=props;

    const openstreetmapURL='https://www.openstreetmap.org/?mlat=:lat&mlon=:lon';

    const mapLink = (lat,lon) => {
        return generatePath(openstreetmapURL, {
            lat,lon
        });        
    }
    const institutionchangesurl=(reqPath,id) => {
        return generatePath(reqPath, {
            id,
            op: 'institution'
        });        
    }

    const projectschangesurl=(reqPath,id) => {
        return generatePath(reqPath, {
            id,
            op: 'projects'
        });               
    }

    const identifiersurl=(reqPath,id) => {
        return generatePath(reqPath, {
            id,
            op: 'identifiers'
        });        
    }

    return (
        <div className={"library_info"}>            
            {/*<span className="status-text">{data.borrowing_status ? intl.formatMessage({id: "app.requests."+data.borrowing_status}):'xxx'}</span>*/}                    
            <div className='address'>
                <i className="fas fa-map-marker"></i> {data.address} {data.postcode} {data.town} {data.district} {data.state}
                <span className='country_id'>({data.country.data.name})</span>
                
                {data.lat && data.lon && <span className='coords'>
                    <i className="fas fa-map-marked"></i> <a className="active" href={mapLink(data.lat,data.lon)} target='_blank'>{data.lat},{data.lon}</a>
                </span>}
            </div>
            {(data.ill_phone||data.ill_email) && <div className='contact'>
                {data.ill_phone && <span><i className="fas fa-phone"></i> {data.ill_phone} </span>}
                {data.ill_email && <span><i className="fas fa-envelope"></i> {data.ill_email}</span>}
            </div>}
            {data.ill_referent_name && <div className='referent'>
                <i className="fas fa-user"></i> {data.ill_referent_name}
            </div>}
            <div className='institution'>
                <i className="fas fa-building"></i> 
                <span className='badge badge-secondary'>{data.institution.data.name} {data.institution.data.status==2? <span className='text-danger'><i className="fas fa-exclamation-triangle"></i></span>:''}</span>
                <Link className="active" to={institutionchangesurl(editPath,data.id)}><i className="fas fa-edit"></i></Link>               
            </div>
                           
            {data.projects && data.projects.data && data.projects.data.length>0 && 
                    <span className='projects'>
                        <i className="fas fa-project-diagram"></i>                                        
                        {data.projects.data.map(prj => 
                        <span key={prj.id} className="project-item badge badge-secondary text-white">
                            {prj.name}
                        </span>)}                    
                    <Link className="active" to={projectschangesurl(editPath,data.id)}><i className="fas fa-edit"></i></Link>
                    </span>                                    
            }
            {data.identifiers && data.identifiers.data && data.identifiers.data.length>0 && 
                <span className='identifiers'>                    
                    <i className="fas fa-key"></i>                     
                    {data.identifiers.data.map(ident => 
                    <span key={ident.id} className="identifier-item badge badge-info text-white">
                        {ident.name}: {ident.pivot.cod}
                    </span>)}                
                    <Link className="active" to={identifiersurl(editPath,data.id)}><i className="fas fa-edit"></i></Link>
                </span>
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

    const subscriptionurl=(reqPath,id) => {
        return generatePath(reqPath, {
            id,
            op: 'subscriptions'
        });        
    }

    const [showLibraryInfo,setShowLibraryInfo]=useState(false);

    return (
        <Row className="library_item list-row">
            <Col sm={5}>
                <CustomCheckBox 
                    handleChange={toggleSelection}
                    checked={checked}
                /> 
                <div className="library_id">
                    <a className="toggle-library-info" onClick={()=>setShowLibraryInfo(!showLibraryInfo)} title="show extra info">      
                        <i className={`active fas ${showLibraryInfo?'fa-caret-square-up':'fa-caret-square-down'}`}></i> 
                    </a> 
                    <Link to={editurl(editPath,data.id)} className="active"><span>{data.id} - {data.name}</span></Link>
                </div>
                {showLibraryInfo && <LibraryInfo data={data} editPath={editPath} customClass="library_info"/>}                                 
            </Col>
            <Col sm={3}>                                                      
                <Link className="btn btn-icon btn-sm" to={subscriptionurl(editPath,data.id)}><i className="fas fa-file-contract"></i></Link> 
                {formatDateTime(data.created_at)}                                
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