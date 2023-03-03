import React,{useState} from 'react';
import {Row, Col, Button} from 'reactstrap';
import {useIntl} from 'react-intl';
import { generatePath } from "react-router";
import { formatDateTime } from '../../../utils/dates';
import CustomCheckBox from 'components/Form/CustomCheckBox';

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


const statusInfo = (inst) => {  

    let ret="";

    switch (inst.status) {
        case 0: ret=<i className='fa-solid fa-ban' title={inst.status_key}></i>
                break;         
        case 1: ret=<i className='fa-solid fa-circle-check' title={inst.status_key}></i>
                break;                 
        case 2: ret=<i className='fa-solid fa-triangle-exclamation' title={inst.status_key}></i>
        break;                         

        default: ret=inst.status_key
    }

    return <span className='institution_status'>{ret}</span>
}
export const canEnable = (inst) => {    
    return (  
        inst.status==2 || 
        inst.status==0
    )     
}

export const canDelete = (inst) => {
    return (inst.status==2|| inst.status==0 )
}

export const canDisable = (inst) => {
    return inst.status==1 
     
}


export const InstitutionInfo = (props) => {

    const intl = useIntl();

    const {data,customClass}=props;

    return (
        <div className={"institution_info"}>            
            {data.administrative && <div className='referent'>
            <i className="fa-solid fa-user"></i> {data.administrative}
            </div>}
            {(data.administrative_phone||data.administrative_email) && <div className='contact'>
                {data.administrative_phone && <span><i className="fa-solid fa-phone"></i> {data.administrative_phone} </span>}
                {data.administrative_email && <span><i className="fa-solid fa-envelope"></i> {data.administrative_email}</span>}                
            </div>}                    
            <div className='administrative_fields'>                                
                {data.email_pec && <span><i className="fa-solid fa-envelope"></i>PEC: {data.email_pec}</span>}
                
                {data.invoice_header && <span className='invoice_header'><span>Invoid Header:</span> {data.invoice_header}</span>}
                {data.vatnumber && <span className='vatnumber'><span>VAT:</span> {data.vatnumber} </span>}
                {data.fiscalcode && <span className='fiscalcode'><span>Fiscal Code:</span> {data.fiscalcode} </span>}

                {data.ccu && <span className='ccu'><span>CCU:</span> {data.vatnumber} </span>}
                {data.terzo_code && <span className='terzo_code'><span>Terzo Code:</span> {data.terzo_code} </span>}                
            </div>             
        </div>
    )
}



export const InstitutionOperations = (props) => {
    const {data,changeStatusInstitution,deleteInstitution}=props;    
  
    return (        
        <div className={"institution_operations"}>                                                          
                {canDelete(data) && deleteInstitution && <a className="btn btn-icon btn-sm" onClick={()=>deleteInstitution()}><i className="fa-solid fa-trash"></i></a>}                                                
                {canEnable(data) && changeStatusInstitution && <a className="btn btn-icon btn-sm" onClick={()=>changeStatusInstitution(1)}><i className="fa-solid fa-circle-check"></i></a>}                                                            
                {canDisable(data) && changeStatusInstitution && <a className="btn btn-icon btn-sm" onClick={()=>changeStatusInstitution(0)}><i className="fa-solid fa-ban"></i></a>}                                
        </div>
    )
}


const InstitutionItem = (props) => {
    const {editPath,data,toggleSelection,checked,removeTag,deleteInstitution,changeStatusInstitution} = props      
    const intl = useIntl();  

    const [showInstitutionInfo,setShowInstitutionInfo]=useState(false);

    return (
        <Row className="institution_item list-row">
            <Col sm={5}>
                <CustomCheckBox 
                    handleChange={toggleSelection}
                    checked={checked}
                /> 
                <a className="toggle-institution-info" onClick={()=>setShowInstitutionInfo(!showInstitutionInfo)} title="show extra info">      
                        <i className={`active fa-solid ${showInstitutionInfo?'fa-square-caret-up':'fa-square-caret-down'}`}></i> 
                </a> 
                <div className="institution_id">
                    <Link to={editurl(editPath,data.id)} className="active"><span>{data.id} - {data.name}</span></Link>
                    <div className='institution_type'>                
                        <span className='badge badge-secondary'>{data.institution_type.data.name}</span>
                    </div>                          
                    <div className='address'>
                        {data.country && <span className='country_id'>{data.country.data.name}</span>}                                
                    </div>
                </div>
                {showInstitutionInfo && <InstitutionInfo data={data} customClass="institution_info"/>}                                 
            </Col>
            <Col sm={3}>
                <>
                <Link to={subscriptionurl(editPath,data.id)} className="active subscriptionlink"><i className="fa-solid fa-file-contract"></i></Link>                
                {formatDateTime(data.created_at)}                
                </>
            </Col>
            <Col sm={1}>
                {statusInfo(data)}
            </Col>
            <Col sm={3}>      
            <InstitutionOperations data={data} changeStatusInstitution={changeStatusInstitution} deleteInstitution={deleteInstitution}/>                
            </Col>            
        </Row>
    )
}

export default InstitutionItem