import React, {useState} from 'react'
import messages from './messages'
import {useIntl} from 'react-intl'
import {Form, InputGroup, InputGroupAddon, Button, Input, Row, Col} from 'reactstrap';
import './style.scss'

const InputSearch = (props) => {
    
    const {submitCallback} = props 

    const intl = useIntl()
    const [query, setQuery] = useState('')
    const handleChange = (e) =>  {
        const q = e.target.value
        setQuery(q)
        
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        submitCallback(query)
    }
    
    return (
        <Form className="form-search" noValidate onSubmit={handleSubmit}>
            <Row>
                <Col md={6} sm={12}>
                    <InputGroup>
                        <InputGroupAddon addonType="append">
                            <Button type="submit" color="brown" className="searchBtn">
                                {intl.formatMessage(messages.Button)}
                            </Button>
                        </InputGroupAddon>
                        <Input required onChange={handleChange} type="text" name="inputQuery" id="inputQuery" />
                    </InputGroup>
                </Col>
            </Row>
        </Form>
    )
}


export default InputSearch