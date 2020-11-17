import React from 'react';
import {Row, Col, Button} from 'reactstrap';
import {NavLink } from 'react-router-dom';
import {useIntl} from 'react-intl';
import { generatePath } from "react-router";
import ReferenceIcons from '../ReferenceIcons';
import CustomCheckBox from 'components/Form/CustomCheckBox';

const ReferenceItem = (props) => {
    const {/*messages,*/data,toggleSelection,checked,removeLabel,removeGroup,deleteReference} = props
  
    const intl = useIntl();
  
    const matTypeIcon = (mat) => {
        switch (mat)
        {
          case 1: return 'simple_icon fas fa-file'; break;
          case 2: return 'simple_icon fas fa-book'; break;
          case 3: return 'simple_icon fas fa-scroll'; break;
          case 4: return 'simple_icon fas fa-map'; break;
          case 5: return 'simple_icon fas fa-bible'; break;          
        }
        return mat;
      }
    
    const referenceurl=(id) => {
        return generatePath('/patron/references/:id?/:op?', {
            id
        });
    }

    //*** TODO aggiungere traduzione etichette prendendole dal reference

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
                    <p><span className="pub_title">{data.pub_title}</span> &nbsp; 
                    {data.material_type === 1 && <span className="part_title">{data.part_title}</span>}
                    </p>
                </NavLink>
                <div className="authors">
                   {data.material_type != 1 && data.authors && <span className="authors">Autore/i<span> {data.authors}</span></span>} 
                   {data.material_type === 1 && data.part_authors && <span className="authors">Autore/i<span> {data.part_authors}</span></span>} 
                   {data.pubyear && <span className="pubyear">Anno <span>{data.pubyear}</span></span>}
                </div>
                {data.material_type === 3 &&
                <div className="university">
                    <span className="university">Ateneo<span> {data.publisher}</span></span>
                </div>}
                {data.material_type === 4 &&
                <div className="geographic_area">
                    <span className="geographic_area">Geographic Area<span> {data.geographic_area}</span></span>
                </div>}

                
                {data.labels.data && <span className="labels-row">
                    {data.labels.data.map(label => <span key={label.id}>{label.name} <i className="fas fa-times"  onClick={() => removeLabel(label.id)}></i></span>)}
                </span>}
                
                {data.groups.data && <span className="groups-row">
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