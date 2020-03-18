import React from 'react'
import messages from './messages'
import {intl} from 'react-intl'
import {Form, InputGroup, InputGroupAddon, Button, Input} from 'reactstrap';


const InputSearch = () => {
    
    const intl = useIntl()
    const [query, setQuery] = ('')
    const handleChange = (e) =>  {
        const q = e.target.value
        setQuery(q)
    }
    
    const handleSubmit = () => {
        console.log(query)
    }
    
    return (
        <Form className="form-search" noValiadte onSubmit={handleSubmit}>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <Button type="submit">
                        {intl.formatMessage(messages.Button)}
                    </Button>
                </InputGroupAddon>
                <Input required onChange={handleChange} type="text" name="inputSearch" id="inputSearch" />
            </InputGroup>
        </Form>
    )
}


export default InputSearch