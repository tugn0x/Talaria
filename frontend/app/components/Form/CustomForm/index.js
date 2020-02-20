import React, {useState} from 'react'
import { Col, Card, CardBody, InputGroup, InputGroupAddon, InputGroupText, CustomInput, Form, Button, Row } from 'reactstrap'
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl'
import Select from 'react-select'; 
import AsyncSelect from 'react-select/async';
// PROPS
// fields
// callback action
// classes

const CustomForm = (props) => {

    const intl = useIntl();
    const {
        submitCallBack = () => null,
        title = 'Titolo del form',
        className = '',
        submitText = "Submit",
        submitColor = "brown",
        fields = {},
        requestData = {},
        searchCustomSelect = () => null
    } = props


    const [selectedOption, setSelectedOption] = useState(null)
    const [selectInputValue, setSelectInputValue] = useState("")

    const [formData, setFormData] = useState(() => {
        let data = {}
        Object.keys(fields).map(key => {
            if(fields[key].type === 'checkbox') {
                data = {...data, [key]: requestData[key] ? requestData[key] : false }
            }else {
                data = {...data, [key]: requestData[key] ? requestData[key] : "" }
            }
        })
        return data
    })
    
    const handleSearchCustomSelect = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        searchCustomSelect(inputValue)
        // return inputValue;
    };

    const handleSelectedOption = (selectedOption) =>{
        setSelectedOption(selectedOption)
        console.log("handleCustomSelectChange", selectedOption)
    }

    const handleChange = (e) =>{
        const targetType = e.target.type
        switch(targetType) {
            case "checkbox":
                setFormData({ ...formData, [e.target.name]:  e.target.checked })
                break;
            default:
                setFormData({ ...formData, [e.target.name]:  e.target.value   })
                break;
        }

        // console.log("new formData", formData)
    }


    const onSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        form.classList.add('was-validated');
        if (form.checkValidity() === false) {
            console.log("Dont Send Form")
            return
        } else {
            submitCallBack(formData)
            // console.log("Send Form", formData)
        }
        return
    }

    return (
        Object.keys(fields).length &&
        (
            <Card className="mx-4">
                <CardBody className="p-4">
                    { title !== "" ? <h1>{title}</h1> : '' }
                    <Form onSubmit={onSubmit} noValidate>
                        <Row>
                            {Object.keys(fields).map(key => {
                                const field = fields[key];
                                console.log(props[field.options])
                                return (<InputGroup key={field.name} className="mb-3">
                                        {field.label && field.label !== "" &&
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                {intl.formatMessage({ id: field.label })}
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        }
                                            {field.type === 'checkbox' &&
                                                (<CustomInput
                                                    className="form-control"
                                                    id={field.name}
                                                    type={field.type}
                                                    placeholder={field.placeholder ?  intl.formatMessage({ id: field.placeholder }) : 'default placeholder' }
                                                    name={key}
                                                    value={formData[key] ? formData[key] : ""}
                                                    onChange={(e) => handleChange(e)}
                                                    required={field.required ? field.required : false}
                                                    checked={formData[key]}
                                                />)
                                            ||
                                            field.type === 'select' &&
                                                ( <CustomInput
                                                    className="form-control"
                                                    id={field.name}
                                                    type={field.type}
                                                    placeholder={field.placeholder  ? intl.formatMessage({ id: field.placeholder }) : 'default placeholder' }
                                                    name={key}
                                                    value={formData[key] ? formData[key] : ""}
                                                    onChange={(e) => handleChange(e)}
                                                    required={field.required ? field.required : false}
                                                >
                                                { (typeof field.options === 'string') ?
                                                  props[field.options] && props[field.options].map((opt, i) => (<option key={`${field.name}-${i}`} value={opt.id}>{opt.name}</option>)) :
                                                    field.options.map((opt, i) => (<option key={`${field.name}-${i}`} value={opt.id}>{opt.name}</option>))
                                                }

                                                </CustomInput>)
                                            ||
                                            field.type === 'custom-select' &&
                                                ( <Select
                                                    className="form-control"
                                                    value={selectedOption}
                                                    onChange={(selectedOption) =>  handleSelectedOption(selectedOption) }
                                                   // inputValue={}
                                                    onInputChange={(input) => handleSearchCustomSelect(input) }
                                                    options={props[field.options]}
                                                />)
                                            ||
                                                (<CustomInput
                                                    className="form-control"
                                                    id={field.name}
                                                    type={field.type}
                                                    placeholder={field.placeholder ?  intl.formatMessage({ id: field.placeholder }) : 'default placeholder' }
                                                    name={key}
                                                    isSearchable={true}
                                                    value={formData[key] ? formData[key] : ""}
                                                    onChange={(e) => handleChange(e)}
                                                    required={field.required ? field.required : false}
                                                />)
                                            }
                                        </InputGroup>
                                    )
                            })}
                        </Row>
                        <Button color={submitColor} type="submit" block>
                            {submitText}
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        )
    )
}

CustomForm.propTypes = {
    submitCallBack: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired
};

export default CustomForm
