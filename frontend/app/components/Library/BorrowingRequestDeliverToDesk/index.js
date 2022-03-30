import React from 'react';
import {Card, Form as FormContainer, FormGroup, Button} from 'reactstrap';
import Input from '../../Form/Input';
import {useIntl} from 'react-intl';
import './style.scss';
import { useState } from "react";
import {canPatronReqDirectManaged,hasBeenDownloaded,isFile,isMail,isURL,isFAX,isArticleExchange,isOther} from '../BorrowingItem'

const BorrowingRequestDeliverToDesk = props => {
    console.log('BorrowingRequestDeliverToDesk', props)
    const {deliverCallback,data}=props

    const intl = useIntl()
    const [formData,setFormData]=useState({
        fromlibrary_note:'',    
    });
    
    const handleChange = (value, field_name) =>{
        setFormData({ ...formData, [field_name]: value});        
    }    
    
    const onSubmit=(e)=>{     
                    
        e.preventDefault();    
        deliverCallback(formData)
    }
        
    
return (<div>
    <FormContainer onSubmit={onSubmit} className="was-validated" noValidate>                
                            <Card>
                                    {(canPatronReqDirectManaged(data) || ( isMail(data)||(isURL(data) && hasBeenDownloaded(data))||isFAX(data)||isArticleExchange(data)||isOther(data)) )&&
                                    <>
                                        <FormGroup >
                                            <span>- file upload and send to desk</span>
                                        </FormGroup>                                                                                                            
                                        <FormGroup >
                                            <span>- send paper to desk</span>
                                        </FormGroup>
                                    </>
                                    }
                                    {isFile(data) && hasBeenDownloaded(data) && <FormGroup>
                                        <span>- forward file to desk to print!</span>
                                    </FormGroup>}

                                    <div className="d-flex justify-content-between">                                        
                                        <Button type="submit" className="mt-0" color="info">
                                            {intl.formatMessage({id:"app.requests.sendToDesk"})}
                                        </Button>                         
                                    </div>
                            </Card>
                            </FormContainer>
    
    </div>);

}

export default BorrowingRequestDeliverToDesk;