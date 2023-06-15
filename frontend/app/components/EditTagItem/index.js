import React, {useEffect, useState} from 'react';
import {Row, Col, Button} from 'reactstrap';
import {useIntl} from 'react-intl';

const EditTagItem = props => {
    const {data, updateItem, removeItem} = props
    const [tag, setTag] = useState({})
    const intl = useIntl();

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
        <Row className="list-row py-2 tag justify-content-between">
            <Col xs={8} md={10} className="info align-self-center m-0">

                {tag.isEdit && 
                    <>
                        <input type="text" 
                            onChange={(e) => handleChangeText(e)} value={tag.name} 
                            onKeyDown={(e) => handleKeyPress(e)}
                        />
                        <Button onClick={() => updateItem(tag.id, tag.name)} color="icon" title={intl.formatMessage({id: "app.global.edit"})}>
                            <i className="fa-solid fa-floppy-disk"></i>
                        </Button>
                    </>
                ||
                    <h4 className="m-0">{tag.name}</h4>
                }
            </Col>
            <Col xs={4} md={2} className="icons align-self-center">
                <Button className={`${tag.isEdit ? 'active' : null}`} onClick={() => setTag(state => ({...state, isEdit: !state.isEdit}))} color="icon" title={intl.formatMessage({id: "app.global.edit"})}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </Button>
                <Button onClick={() => removeItem(tag.id)} color="icon" title={intl.formatMessage({id: "app.global.delete"})}>
                    <i className="fa-solid fa-trash"></i>
                </Button>
                
            </Col> 
        </Row>
    );
};

export default EditTagItem;