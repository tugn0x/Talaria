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

    const matTypeIcon = (mat) => {
        switch (mat)
        {
          case 1: return 'fa-2x fa-file-text-o'; break;
          case 2: return 'fa-book'; break;
          case 3: return 'fa-graduation-cap'; break;
        }
        return mat;
      }

    
    return ( 
        <Row className="reference-row justify-content-between">
            <Col sm={2} className="select-checkbox">
                <input type="checkbox" />
                <i className={`fa ${matTypeIcon(data.material_type)}`}></i>
            </Col> 
            <Col sm={8} className="info">
                <p><span className="pub_title">{data.pub_title}</span> <span className="part_title">{data.part_title}</span></p>
                <p className="authors">
                   {data.first_author && <><span class="first_author">Autore</span> {data.first_author}</>} 
                   <span className="pubyear">Anno</span> {data.pubyear}
                </p>
                {data.labels.data && <span className="labels">
                    {data.labels.data.map(label => <span>{label.name}</span>)}
                </span>}
                
                {data.groups.data && <span className="groups">
                    {data.groups.data.map(grp => <span>{grp.name}</span>)}
                </span>}
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