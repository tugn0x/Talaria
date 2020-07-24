import React, {useState, useEffect} from 'react';
import {Card, Form as FormContainer, FormGroup, Button, Row, Col} from 'reactstrap';
import {useIntl} from 'react-intl';
import RadioButton from 'components/Form/RadioButton';
import scrollTo from 'utils/scrollTo';
import Input from 'components/Form/Input';
import ErrorBox from 'components/Form/ErrorBox';
import './style.scss';

const Form = (props) => {
    const {reference, messages, submitCallBack} = props;
    const [formData, setFormData] = useState({})
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const intl = useIntl();

    const handleChange = (value, field_name) =>{
        
        setFormData({ ...formData, [field_name]: value   });
        setIsSubmitDisabled(false)
        // props per il wizard form registra biblioteca pubblica
        /* props.onChangeData && props.onChangeData(field_name, value) 
        props.getValidation &&  props.getValidation(document.querySelector('form').checkValidity())  */
    } 

    const onSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        form.classList.add('was-validated');
        if (form.checkValidity() === false) {
            console.log("Dont Send Form")
            // Ci sono ERRORI nella VALIDAZIONE!
            // Scroll sul campo che non e' stato fillato
            const errorTarget = document.querySelectorAll('.was-validated .form-control:invalid')[0]
            scrollTo(errorTarget.offsetParent, true)
            
            return
        } else {
            let dataToSend = {}
            // Nel caso ci siano option list, allora restituisci solo l id / value del risultato
             Object.keys(formData).map(key => {
                dataToSend[key] = typeof formData[key] === 'object' && formData[key].hasOwnProperty('value') ?  formData[key].value : formData[key]
                
            })
            // Tutto ok invia Form!
            submitCallBack(dataToSend)
            console.log("Send Form", dataToSend)
        }
    }
/* 
    useEffect(() => {
        Object.keys(formData).map(key => {
            if(formData[key] === ""){

            }
        })
    }, [formData]) */

    return (
        <>
            <div className="section-title">
                <h1 className="large">
                    {reference && 
                         intl.formatMessage(messages.headerDetail)
                    ||
                        intl.formatMessage(messages.header)
                    }
                </h1>
            </div>
            <FormContainer onSubmit={onSubmit}  className="reference-form" noValidate>
                <FormGroup className="radio-buttons">
                    <RadioButton 
                        label={intl.formatMessage(messages.article)} 
                        handleChange={(e) =>  e.target.checked ? handleChange(0, 'material_type') : null}
                    />
                    <RadioButton 
                        label={intl.formatMessage(messages.book)} 
                        handleChange={(e) =>  e.target.checked ? handleChange(1, 'material_type') : null}
                        
                    />
                    <RadioButton 
                        label={intl.formatMessage(messages.texts)} 
                        handleChange={(e) =>  e.target.checked ? handleChange(2, 'material_type') : null}
                        
                    />
                    <input className="form-control" type="radio" name="radio" hidden required />
                     <ErrorBox 
                        className="invalid-feedback" 
                        error={  intl.formatMessage({ id: 'app.global.invalid_field' })}
                    /> 
                </FormGroup>
                <h3>{intl.formatMessage(messages.titleAuthorsHead)}</h3>
                <Card>
                    <FormGroup >
                        <Input 
                            label={intl.formatMessage(messages.journalLabel)}
                            handleChange={(value) => handleChange(value, 'pub_title')}
                            required={true}
                        />
                    </FormGroup>
                    <FormGroup >
                        <Input 
                            label="Part Title"
                            handleChange={(value) => handleChange(value, 'part_title')}
                            required={true}
                        />
                    </FormGroup>
                    <FormGroup >
                        <Input 
                            label={intl.formatMessage(messages.authorsLabel)}
                            handleChange={(value) => handleChange(value, 'first_author')}
                            required={true}
                        />
                    </FormGroup>
                    <FormGroup >
                    </FormGroup>
                </Card>
                <h3>{intl.formatMessage(messages.dateInstitutionPlaceHead)}</h3>
                <Card>
                    <Row>
                        <Col md={2}>
                            <FormGroup >
                                <Input 
                                    label={intl.formatMessage(messages.pubyear)}
                                    type="number"
                                    handleChange={(value) => handleChange(value, 'pubyear')}
                                    required={true}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup >
                                <Input 
                                    label={intl.formatMessage(messages.volume)}
                                    type="number"
                                    handleChange={(value) => handleChange(value, 'volume')}
                                    required={true}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup >
                                <Input 
                                    label={intl.formatMessage(messages.page_start)}
                                    type="number"
                                    handleChange={(value) => handleChange(value, 'page_start')}
                                    required={true}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup >
                                <Input 
                                    label={intl.formatMessage(messages.page_end)}
                                    type="number"
                                    handleChange={(value) => handleChange(value, 'page_end')}
                                    required={true}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <FormGroup >
                                <Input 
                                    label={intl.formatMessage(messages.publisher)}
                                    handleChange={(value) => handleChange(value, 'publisher')}
                                    required={true}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup >
                                <Input 
                                    label={intl.formatMessage(messages.publishing_place)}
                                    handleChange={(value) => handleChange(value, 'publishing_place')}
                                    required={true}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </Card>
                <h3>{intl.formatMessage(messages.identificationHead)}</h3>
                <Card>
                    <Row>
                        <Col md={3}>
                            <FormGroup >
                                <Input 
                                    label={intl.formatMessage(messages.issn)}
                                    handleChange={(value) => handleChange(value, 'issn')}
                                    required={true}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup >
                                <Input 
                                     label={intl.formatMessage(messages.doi)}
                                    handleChange={(value) => handleChange(value, 'doi')}
                                    required={true}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup >
                                <Input 
                                    label={intl.formatMessage(messages.pmid)}
                                    handleChange={(value) => handleChange(value, 'pmid')}
                                    required={true}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <FormGroup >
                                <Input 
                                    label={intl.formatMessage(messages.sid)}
                                    handleChange={(value) => handleChange(value, 'sid')}
                                    required={true}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </Card>
                <h3>{intl.formatMessage(messages.abstract)}</h3>
                <Card>
                    <textarea onChange={(e) =>  handleChange(e.target.value, 'abstract')}></textarea>
                </Card>
                <h3>{intl.formatMessage(messages.note)}</h3>
                <Card>
                    <textarea onChange={(e) =>  handleChange(e.target.value, 'note')}></textarea>
                </Card>
                <Button type="submit" disabled={isSubmitDisabled} className="btn-cta">
                    {intl.formatMessage({id: 'app.global.submit'})}
                </Button>
            </FormContainer>
        </>
    );
};

export default Form;