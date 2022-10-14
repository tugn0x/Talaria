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


const statusInfo = (inst) => {  

    let ret="";

    switch (inst.status) {
        case 0: ret=<i className='fas fa-ban' title={inst.status_key}></i>
                break;         
        case 1: ret=<i className='fas fa-check-circle' title={inst.status_key}></i>
                break;                 
        case 2: ret=<i className='fas fa-exclamation-triangle' title={inst.status_key}></i>
        break;                         

        default: ret=inst.status_key
    }

    return <span className='institution_status'>{ret}</span>
}

/* inst status
'disabled'=> 0, 
'enabled'=> 1,                        
'pending'=> 2, 
*/
export const canEnable = (inst) => {    
    return (  
        inst.status==2 || 
        inst.status==0
    )     
}

export const canDelete = (inst) => {
    return inst.status==0||inst.status==2
}

export const canDisable = (inst) => {
    return inst.status==1 
     
}


export const InstitutionInfo = (props) => {

    const intl = useIntl();

    const {data,customClass}=props;

    return (
        <div className={"institution_info"}>            
            {/*<span className="status-text">{data.borrowing_status ? intl.formatMessage({id: "app.requests."+data.borrowing_status}):'xxx'}</span>*/}                    
            <div>referent ...</div>
            {/*data.operator && <div className="status-operator">
                <i className="simple_icon fas fa-user-cog"></i> { data.operator.data.full_name}
                {data.borrowing_notes && <span className="borrowing_notes">
                <span id={`tooltip-${data.id}`} className="active"><i className="fas fa-sticky-note"></i></span> 
                <UncontrolledTooltip autohide={false} placement="right" target={`tooltip-${data.id}`}>
                    {data.borrowing_notes}
                </UncontrolledTooltip>                                
                </span>}
            </div>*/}            
                          
        </div>
    )
}



export const InstitutionOperations = (props) => {
    const {data,changeStatusInstitution,deleteInstitution}=props;    
  
    return (        
        <div className={"institution_operations"}>                                                                            
                {canDelete(data) && deleteInstitution && <a className="btn btn-icon btn-sm" onClick={()=>deleteInstitution()}><i className="fas fa-trash"></i></a>}                                                
                {canEnable(data) && changeStatusInstitution && <a className="btn btn-icon btn-sm" onClick={()=>changeStatusInstitution(1)}><i className="fas fa-check-circle"></i></a>}                                                            
                {canDisable(data) && changeStatusInstitution && <a className="btn btn-icon btn-sm" onClick={()=>changeStatusInstitution(0)}><i className="fas fa-ban"></i></a>}                                
        </div>
    )
}


const InstitutionItem = (props) => {
    const {editPath,data,toggleSelection,checked,removeTag,deleteInstitution,changeStatusInstitution} = props      
    const intl = useIntl();  

    return (
        <Row className="institution_item list-row">
            <Col sm={5}>
                <CustomCheckBox 
                    handleChange={toggleSelection}
                    checked={checked}
                /> 
                <div className="request_id"><Link to={editurl(editPath,data.id)} className="active"><span>{data.name}</span></Link></div>
                <InstitutionInfo data={data} customClass="institution_info"/>                                 
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
            <InstitutionOperations data={data} changeStatusInstitution={changeStatusInstitution} deleteInstitution={deleteInstitution}/>                
            </Col>            
        </Row>
    )
}

export default InstitutionItem