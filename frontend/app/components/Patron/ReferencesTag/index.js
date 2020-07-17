import React, {useEffect, useState} from 'react';
import {Row, Col, Button} from 'reactstrap';

const ReferencesTag = props => {
    const {data, updateItem, removeItem} = props
    const [tag, setTag] = useState({})

    useEffect(() => {
        if(data){
            setTag({id: data.value, name: data.label, isEdit: false})
        }
    }, [data])

    const handleChangeText = (e) => {
        const targetval = e.target.value;  
        setTag(state => ({...state, name: targetval}))
      
    }

    const handleKeyPress = (e) => {
        if(e.key === "Enter"){
            updateItem(tag.id, tag.name) 
        }
    }

    return (
        <Row className="list-row py-2  justify-content-between">
            <Col xs={10} className="info align-self-center m-0">

                {tag.isEdit && 
                    <>
                        <input type="text" 
                            onChange={(e) => handleChangeText(e)} value={tag.name} 
                            onKeyDown={(e) => handleKeyPress(e)}
                        />
                        <Button onClick={() => updateItem(tag.id, tag.name)} color="default">
                            <i className="fas fa-save"></i>
                        </Button>
                    </>
                ||
                    <h4 className="m-0">{tag.name}</h4>
                }
            </Col>
            <Col xs={2} className="icons align-self-center">
                <Button className={`${tag.isEdit ? 'active' : null}`} onClick={() => setTag(state => ({...state, isEdit: !state.isEdit}))} color="default">
                    <i className="fas fa-edit"></i>
                </Button>
                <Button onClick={() => removeItem(tag.id)} color="default">
                    <i className="fas fa-trash"></i>
                </Button>
                
            </Col> 
        </Row>
    );
};

export default ReferencesTag;