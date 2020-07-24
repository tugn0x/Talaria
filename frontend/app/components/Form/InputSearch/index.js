import React, {useState} from 'react'
import {useIntl} from 'react-intl'
import PropTypes from 'prop-types'
import {Form, InputGroup, InputGroupAddon, Button, Input, Row, Col} from 'reactstrap';
import './style.scss'

const InputSearch = (props) => {
    
    const {submitCallBack, searchOnChange, className, placeholder} = props 
    const intl = useIntl()
    
    const [query, setQuery] = useState('')
    const handleChange = (e) =>  {
        const q = e.target.value
        setQuery(q)
        if(searchOnChange){
            submitCallBack(q)
        } 
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        submitCallBack(query)
    }
    
    return (
        <Form className={`${className ? className : null} form-search`} noValidate onSubmit={handleSubmit}>
            <InputGroup>
                <Input 
                    required 
                    placeholder={placeholder ? placeholder : intl.formatMessage({id: 'app.global.search'})}
                    value={props.query ? props.query : query}
                    onChange={handleChange} 
                    type="text" 
                    name="inputQuery" 
                    id="inputQuery" />
                <InputGroupAddon addonType="append">
                    <Button type="submit" color="orange" className="searchBtn">
                        <i className="fas fa-search"></i>
                    </Button>
                </InputGroupAddon>
            </InputGroup>
        </Form>
    )
}

InputSearch.propTypes = {
    submitCallBack: PropTypes.func.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string,
};

export default InputSearch