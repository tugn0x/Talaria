import React from 'react';
import {Row, Col, Button} from 'reactstrap';
import {NavLink } from 'react-router-dom';
import { generatePath } from "react-router";
import ReferenceIcons from '../ReferenceIcons';
import CustomCheckBox from 'components/Form/CustomCheckBox';
import './style.scss';

const ReferenceItem = (props) => {
    const {data,toggleSelection,checked,removeLabel,removeGroup,deleteReference} = props
    
  
    const matTypeIcon = (mat) => {
        switch (mat)
        {
          case 1: return 'simple_icon fas fa-file'; break;
          case 2: return 'simple_icon fas fa-book'; break;
          /*case 3: return 'simple_icon icon-diploma'; break;*/
          case 3: return 'simple_icon fas fa-scroll'; break;
        }
        return mat;
      }
    
    const referenceurl=(id) => {
        return generatePath('/patron/references/:id?/:op?', {
            id
        });
    }
    
    return ( 
        <Row className="list-row justify-content-between">
            <Col sm={2} className="select-checkbox">
                <CustomCheckBox 
                    handleChange={toggleSelection}
                    checked={checked}
                />
                <i className={`${matTypeIcon(data.material_type)}`}></i>
            </Col> 
            <Col sm={7} className="info">
                <NavLink to={`${referenceurl(data.id)}`}>
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
                <ReferenceIcons 
                    data={data}
                    icons={['request','oa','edit','delete']}
                    deleteReference={deleteReference}
                />
            </Col> 
        </Row>
    )
}

export default ReferenceItem