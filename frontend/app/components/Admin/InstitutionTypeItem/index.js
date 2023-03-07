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

export const InstitutionTypeOperations = (props) => {
    const {data,deleteInstitutionType}=props;    
  
    return (        
        <div className={"institutiontype_operations"}>                                                                            
                {deleteInstitutionType && <a className="btn btn-icon btn-sm" onClick={()=>deleteInstitutionType()}><i className="fa-solid fa-trash"></i></a>}                                                
        </div>
    )
}


const InstitutionTypeItem = (props) => {
    const {editPath,data,toggleSelection,checked,deleteInstitutionType} = props      
    const intl = useIntl();  
    

    return (
        <Row className="institutiontype_item list-row">
            <Col sm={7}>
                <CustomCheckBox 
                    handleChange={toggleSelection}
                    checked={checked}
                /> 
                <div className="institutiontype_id"><Link to={editurl(editPath,data.id)} className="active"><span>{data.name}</span></Link></div>                
            </Col>
            <Col sm={3}>
                {formatDateTime(data.created_at)}                                
            </Col>            
            <Col sm={2}>      
            <InstitutionTypeOperations data={data} deleteInstitutionType={deleteInstitutionType}/>                
            </Col>            
        </Row>
    )
}

export default InstitutionTypeItem