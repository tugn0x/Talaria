import React, {useState, useEffect} from 'react';
import {Row, Col} from 'reactstrap';
import {NavLink } from 'react-router-dom';
import { generatePath } from "react-router";
import {useIntl} from 'react-intl';
import messages from './messages'
import './style.scss';

const RequestItem = (props) => {
    const {data, editPath,toggleSelection,checked} = props
    const intl = useIntl();
        
    
    const matTypeIcon = (mat) => {
        switch (mat)
        {
          case 1: return 'simple_icon fas fa-newspaper'; break;
          case 2: return 'simple_icon fas fa-book'; break;
          case 3: return 'simple_icon icon-diploma'; break;
        }
        return mat;
      }
    
      const statusIcon = (status_key) => {
          return "statusIcon " + status_key
      }
    
    const requesturl=(id) => {
        return generatePath(`${editPath}`, {
            id
        });
    }

    const canArchive = (data) => {
        if(data.status_key=="canceled" || data.status_key=="received"|| data.status_key=="fileReceived" || data.status_key=="notReceived") return true;
        return false;
    }

    const canDelete = (data) => {
        if(data.status_key!="canceled") return true;
        return false;
    }

    return ( 
        <Row className="list-row justify-content-between">
            <Col sm={3} className="select-checkbox">
                <input type="checkbox" onChange={toggleSelection} value={data.id} checked={checked}/>
                <span className={statusIcon(data.status_key)}></span> {data.status_key} <i className={matTypeIcon(data.reference.data.material_type)}></i>
            </Col>
            <Col sm={7} className="info">
                <NavLink to={`${requesturl(data.id)}`}>
                    <p><span className="pub_title">{data.reference.data.pub_title}</span> <span className="part_title">{data.reference.data.part_title}</span></p>
                </NavLink>
                <div className="authors">
                   {data.reference.data.first_author && <span className="first_author">Autore <span>{data.reference.data.first_author}</span></span>} 
                   <span className="pubyear">Anno <span>{data.reference.data.pubyear}</span></span>
                </div>
                LIBRARY, DELIVERY, DATA REQ, DATA EVA
                {data.reference.data.labels.data && <span className="labels">
                    {data.reference.data.labels.data.map(label => <span key={label.id}>{label.name}</span>)}
                </span>}
                
                {data.reference.data.groups.data && <span className="groups">
                    {data.reference.data.groups.data.map(grp => <span key={grp.id}>{grp.name}</span>)}
                </span>}
            </Col>
            
            <Col sm={2} className="icons align-self-center">
                {canArchive(data) && <NavLink to="#" className="btn btn-link">
                    <i className="fas fa-hdd"></i>
                </NavLink>}
                {canDelete(data) && <a href="#" onClick={() => console.log('delete request')} className="btn btn-link">
                    <i className="fas fa-trash"></i>
                </a> }
            </Col> 
        </Row>
        
    )
}

export default RequestItem