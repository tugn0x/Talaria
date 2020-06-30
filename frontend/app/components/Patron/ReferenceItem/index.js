import React, {useState, useEffect} from 'react';
import {Row, Col} from 'reactstrap';
import { generatePath } from "react-router";
import './style.scss';

const ReferenceItem = (props) => {
    const {data, editPath} = props
    
    const editurl = (id) => {
        return generatePath(`${editPath}`, {
            id: id,
        });
    }
    
    return ( 
        <Row className="reference-row justify-content-between">
            <Col sm={2} className="select-checkbox">
                <input type="checkbox" />
                <i className="fa fa-2x fa-file-text-o"></i>
            </Col> 
            <Col sm={8} className="info">
                <p>{data.pub_title}</p>
                <p className="authors">
                   <span>Autore</span> {data.first_author} <span>Anno</span> {data.pubyear}
                </p>
            </Col>
            <Col sm={2} className="icons align-self-center">
                Icons
            {/*     <NavLink to={`${editurl(data.id)}`}  className="btn btn-link">
                    <i className="fa fa-edit"></i>
                </NavLink>
                <a href="#" onClick={() => console.log('delete reference')} className="btn btn-link">
                    <i className="fa fa-trash"></i>
                </a> */}
            </Col> 
        </Row>
    )
}

export default ReferenceItem