import React, {useState, useEffect} from 'react';
import {Row, Col} from 'reactstrap';
import {NavLink } from 'react-router-dom';
import { generatePath } from "react-router";
import './style.scss';

const ReferenceItem = (props) => {
    const {data, editPath,toggleSelection,checked,removeLabel,removeGroup} = props
    
    const editurl = (id) => {
        return generatePath(`${editPath}`, {
            id,
            edit: "edit"
        });
    }

    const matTypeIcon = (mat) => {
        switch (mat)
        {
          case 1: return 'simple_icon fas fa-newspaper'; break;
          case 2: return 'simple_icon fas fa-book'; break;
          case 3: return 'simple_icon icon-diploma'; break;
        }
        return mat;
      }
    
    //TODO
    const oaurl=(id) => {
        return generatePath(`${editPath}`, {
            id,
        });
    }
    const requesturl=(id) => {
        return generatePath(`${editPath}`, {
            id
        });
    }

    return ( 
        <Row className="reference-row justify-content-between">
            <Col sm={2} className="select-checkbox">
                <input type="checkbox" onChange={toggleSelection} value={data.id} checked={checked}/>
                <i className={`${matTypeIcon(data.material_type)}`}></i>
            </Col> 
            <Col sm={7} className="info">
                <NavLink to={`${requesturl(data.id)}`}>
                    <p><span className="pub_title">{data.pub_title}</span> <span className="part_title">{data.part_title}</span></p>
                </NavLink>
                <div className="authors">
                   {data.first_author && <span className="first_author">Autore <span>{data.first_author}</span></span>} 
                   <span className="pubyear">Anno <span>{data.pubyear}</span></span>
                </div>
                {data.labels.data && <span className="labels">
                    {data.labels.data.map(label => <span key={label.id}>{label.name} <i className="fas fa-times"  onClick={() => removeLabel(label.id)}></i></span>)}
                </span>}
                
                {data.groups.data && <span className="groups">
                    {data.groups.data.map(grp => <span key={grp.id}>{grp.name} <i className="fas fa-times"  onClick={() => removeGroup(grp.id) }></i></span>)}
                </span>}
            </Col>
            <Col sm={3} className="icons align-self-center">
                {<NavLink to={`${requesturl(data.id)}`}  className="btn btn-link">
                    <i className="fas fa-share"></i>
                </NavLink>}
                {data.oa==1 && <NavLink to={`${oaurl(data.id)}`} className="btn btn-link">
                    <i className="icon-oa"></i>
                </NavLink>}
                {<NavLink to={`${editurl(data.id)}`}  className="btn btn-link">
                    <i className="fas fa-edit"></i>
                </NavLink>}
                {<a href="#" onClick={() => console.log('delete reference')} className="btn btn-link">
                    <i className="fas fa-trash"></i>
                </a> }
            </Col> 
        </Row>
    )
}

export default ReferenceItem