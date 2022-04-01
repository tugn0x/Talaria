import React from 'react';
import {Card, Form as FormContainer, FormGroup, Button} from 'reactstrap';
import Input from '../../Form/Input';
import { Link } from 'react-router-dom';
import {useIntl} from 'react-intl';
import './style.scss';
import { useState } from "react";
import {canPatronReqDirectManaged, hasBeenDownloaded,isFile,isURL} from '../BorrowingItem'

const BorrowingRequestFulfillToPatron = props => {
    console.log('BorrowingRequestFulfillToPatron', props)
        
    const {fulfillCallback,data}=props

    const intl = useIntl()
    const [formData,setFormData]=useState({        
        fromlibrary_note:'',          
    });
    
    const handleChange = (value, field_name) =>{
        setFormData({ ...formData, [field_name]: value});        
    }    
    
    const onSubmit=(e)=>{     
    
        const form = e.target;            
        
        e.preventDefault();   
        
        if (form.checkValidity() ) 
            fulfillCallback(formData)        
    }
        
    
return (<div>
    <FormContainer onSubmit={onSubmit} className="was-validated" noValidate>                
                            <Card>
                                <span className="alert alert-warning">
                                    <i class="fas fa-exclamation-triangle"></i> Please check if your license permit you to send URL/file to your patron before doing it!
                                </span>
                                {canPatronReqDirectManaged(data) &&
                                    <FormGroup >                                       
                                        <span>- file/URL send to patron</span>
                                    </FormGroup>
                                }
                                {!canPatronReqDirectManaged(data) && (isFile(data)||isURL(data)) && hasBeenDownloaded(data) &&
                                    <FormGroup >  
                                        {isURL(data) && 
                                        <div>
                                            The following URL will be sent to patron
                                            <div class="alert alert-success" role="alert">
                                                <a target="_blank" href={data.url}><i title="URL" class="fas fa-external-link-alt"></i> {data.url}</a>
                                            </div>
                                        </div>}          
                                        {isFile(data) &&                             
                                            <span>- forward file (received from lender) to patron</span>
                                        }
                                    </FormGroup>
                                }  
                                <FormGroup >                                
                                    <Input                                         
                                        type="textarea"                                         
                                        label={intl.formatMessage({id: "app.patronrequest.fromlibrary_note"})}
                                        handleChange={(value) => handleChange(value, 'fromlibrary_note')}                                        
                                        input={formData.fromlibrary_note ? formData.fromlibrary_note : ""}
                                    />
                                </FormGroup>                                                                                                         
                                   

                                <div className="d-flex justify-content-between">                                        
                                    <Button type="submit" className="mt-0" color="success">
                                        {intl.formatMessage({id:"app.requests.fulfill"})}
                                    </Button>                         
                                </div>
                            </Card>
                            </FormContainer>
    
    </div>);

}

export default BorrowingRequestFulfillToPatron;