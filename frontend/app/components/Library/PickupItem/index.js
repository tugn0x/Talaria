import React from 'react';
import {Row, Col} from 'reactstrap';
import {useIntl} from 'react-intl';
import { generatePath } from "react-router";
import './style.scss';
import { Link } from 'react-router-dom';
 
const editUrl=(reqPath,id,op) => {
    return generatePath(reqPath, {
        id,
        op
    });
}

export const statusIcon = (status) => {
    return "status-icon " + status
}


const PickupItem = (props) => {
    const {editPath,data, changePickupStatus,deletePickup} = props      
    const intl = useIntl();  

    return (
        <Row className="list-row justify-content-between">
            <Col sm={3}>              
                <div className="pickupInfo">
                        <span className="name">{data.name}</span>
                        <span className="description">{data.description}</span>                    
                </div>                
            </Col>
            <Col sm={7}>
            <div className="pickupData">                
                {data.address && <><span><i className="fas fa-map-marker"></i> {data.address} {data.postcode} {data.town} {data.district} {data.state} {data.country?data.country.data.name:''}</span><br/></>}                                    
                {data.email && <><span><i className="fas fa-envelope"></i> {data.email}</span><br/></>}
                {data.phone && <><span><i className="fas fa-phone"></i> {data.phone}</span><br/></>}
                {data.openinghours && <><span><i className="fas fa-clock"></i> {data.openinghours}</span></>}
            </div>
            </Col>
            <Col sm={2}>      
                <Link className="btn btn-icon" to={editUrl(editPath,data.id,"edit")}><i className="fas fa-edit"></i></Link>
                {deletePickup && <a className="btn btn-icon" onClick={()=>deletePickup()}><i className="fas fa-trash"></i></a>} 
            </Col> 
        </Row>
    )
}

export default PickupItem