import React from 'react';
import {Row, Col, Button} from 'reactstrap';
import {useIntl} from 'react-intl';
import { generatePath } from "react-router";
import './style.scss';
import { Link } from 'react-router-dom';
import {UncontrolledTooltip} from 'reactstrap';
 
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
    const {editPath,data,toggleSelection,checked,removeTag,deleteReference,findAndUpdateOABorrowingReference,oaloading,askCancelRequest,askArchiveRequest,forwardRequest,askTrashRequest,findISSNISBNtoggle,setReceivedRequest,setNotReceivedRequest,savedAsDownloaded,askArchiveRequestAsNotReceived,deleteRequest} = props      
    const intl = useIntl();  

    return (
        <Row className="list-row justify-content-between">
            <Col sm={3}>              
                <div className="pickupInfo">
                        <Link to={editUrl(editPath,data.id)} className="active"><i className="fas fa-info-circle"></i> <span className="name">{data.name}</span></Link>
                        <span className="description">{data.description}</span>                    
                </div>                
            </Col>
            <Col sm={7}>
            <div className="pickypData">                
                {data.address && <><span><i className="fas fa-map-marker"></i> {data.address} {data.postcode} {data.town} {data.district} {data.state} {data.country?data.country.data.name:''}</span><br/></>}                                    
                {data.email && <><span><i className="fas fa-envelope"></i> {data.email}</span><br/></>}
                {data.phone && <><span><i className="fas fa-phone"></i> {data.phone}</span><br/></>}
                {data.openinghours && <><span><i className="fas fa-clock"></i> {data.openinghours}</span></>}
            </div>
            </Col>
            <Col sm={2}>      
                <button>op1</button><button>op2</button>
            </Col> 
        </Row>
    )
}

export default PickupItem