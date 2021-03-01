import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {UncontrolledTooltip, Row, Col, Button} from 'reactstrap';
import { generatePath } from "react-router";

import './style.scss';

const MyLibraryItem = props => {
    console.log('MyLibraryItem', props);
    const {data, editPath, setPreferred, preferred,  deleteCallback} = props;
   // const [favoriteStar, setPreferredStar] = useState(data.preferred);
    // const [tooltipOpen, setTooltipOpen] = useState(false);
    // const toggle = () => setTooltipOpen(!tooltipOpen); 
    
    const editurl = (library_id, id) => {
        return generatePath(`${editPath}`, {
            library_id,
            id
        });
    }  

    const statusClass = (status) => {
        switch (status)
        {
            case 0: return 'disabled'; break;
            case 1: return 'success'; break;
            case 2: return 'pending'; break;
        }
        return status;
    }

    const preferredStarClass = (pref) => {
        switch (pref)
        {
          case false: return 'notpreferred'; break;
          case true: return 'preferred'; break;
          default: return 'notpreferred'; break;
        }
        return pref;
    }
  

    return (
        <Row className="list-row my-libraries-item justify-content-between">
            <Col sm={3} className="">
                <Button onClick={setPreferred} color="default" disabled={data.status === 1 ? false : true}>
                    <i className={`fas fa-star preferred-star ${preferredStarClass(data.id===preferred)}`}></i>
                </Button>
                <div className="status-block">
                    <div className={`status-point ${statusClass(data.status)}`}></div>
                    {data.created_at && <p>{data.created_at}</p>}
                    {!data.created_at && <p>26/6/2020</p>}
                </div>
            </Col>
            <Col sm={2} className="info">
                <p className="font-weight-bold">Etichetta </p>
                <a href="#" id={`tooltip-${data.id}`} className="active">{data.label}</a>
                <UncontrolledTooltip autohide={false} placement="right" target={`tooltip-${data.id}`}>
                    {data.name}
                </UncontrolledTooltip>
            </Col>
            <Col sm={5} className="info">
                {data.department_name && <div><span className="font-weight-bold">Dipartimento </span><span>{data.department_name}</span></div>}
                {data.title_name && <div><span className="font-weight-bold">Qualifica </span><span>{data.title_name}</span></div>}
                {data.user_referent && <div><span className="font-weight-bold">Referente </span><span>{data.user_referent}</span></div> }
                {data.user_service_phone && <div><span className="font-weight-bold">Telefono </span><span>{data.user_service_phone}</span></div> }
                {data.user_service_email && <div><span className="font-weight-bold">Email </span><span>{data.user_service_email}</span></div> }
            </Col>
            <Col sm={2} className="icons align-self-center">                
                <NavLink to={`${editurl(data.library_id, data.id)}`}  className="btn btn-icon">
                    <i className="fas fa-edit"></i>                    
                 </NavLink>
                <a href="#"  className="btn btn-icon" onClick={deleteCallback}>
                    <i className="fas fa-trash"></i>
                </a>
            </Col>  
        </Row>
    );
};

export default MyLibraryItem;