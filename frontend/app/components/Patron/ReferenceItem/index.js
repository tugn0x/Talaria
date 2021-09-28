import React from 'react';
import {Row, Col, Button} from 'reactstrap';
import {useIntl} from 'react-intl';
import { generatePath } from "react-router";
import ReferenceIcons from '../ReferenceIcons';
import CustomCheckBox from 'components/Form/CustomCheckBox';
import ReferenceCitation from '../../ReferenceCitation';
import ReferenceTags from '../ReferenceTags';

const ReferenceItem = (props) => {
    const {data,toggleSelection,checked,removeLabel,removeGroup,deleteReference,findAndUpdateOA,oaloading} = props
  
    const intl = useIntl();    
    
    const referenceurl=(id) => {
        return generatePath('/patron/references/:id?/:op?', {
            id
        });
    }
    

    return (
        <Row className="list-row justify-content-between">
            <Col sm={1} className="select-checkbox">
                <CustomCheckBox 
                    handleChange={toggleSelection}
                    checked={checked}
                />                
            </Col> 
            <Col sm={8}>
            <ReferenceTags data={data} removeLabel={(labelId)=>removeLabel(labelId )} removeGroup={(groupId)=>removeGroup(groupId)}/>              
            <ReferenceCitation data={data} referenceurl={referenceurl}/>
            </Col>
            <Col sm={3} className="icons align-self-center">
                <ReferenceIcons 
                    data={data}
                    icons={['request','oa','edit','delete']}
                    deleteReference={deleteReference}
                    findAndUpdateOA={findAndUpdateOA}                    
                />
                {oaloading && <i className="fas fa-spinner fa-spin"></i>}
                
            </Col> 
        </Row>
    )
}

export default ReferenceItem