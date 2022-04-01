import React,{useEffect} from 'react';
import {Card, Form as FormContainer, FormGroup, Button} from 'reactstrap';
import Input from '../../Form/Input';
import {useIntl} from 'react-intl';
import './style.scss';
import { useState } from "react";
import {canPatronReqDirectManaged,hasBeenDownloaded,isFile,isMail,isURL,isFAX,isArticleExchange,isOther} from '../BorrowingItem'

const BorrowingRequestDeliverToDesk = props => {
    console.log('BorrowingRequestDeliverToDesk', props)
    const {data,deliverCallback}=props

    const intl = useIntl()

    const [submitEnable, setSubmitEnable]=useState(false);

    const [formData,setFormData]=useState({        
        desk_delivery_format:null
    });
       
    const handleChange = (value, field_name) =>{
        setFormData({ ...formData, [field_name]: value});                     
    }    

    const setDeskDeliveryType=(ty) => {                 
        handleChange(ty,'desk_delivery_format');  //1=file, 2=paper         
        setSubmitEnable(true) 
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
                                            <div>Choose: <input type="file"/></div>
                                            <div className="d-flex justify-content-between">  
                                                <Button type="button" disabled={submitEnable} onClick={(e)=>setDeskDeliveryType(1)} className="mt-0" color="info">
                                                file upload and send to desk 
                                                </Button> 
                                            </div>

                                        </FormGroup>                                                                                                            
                                        <FormGroup >
                                            <div className="d-flex justify-content-between">                                        
                                                <Button type="button" disabled={submitEnable} onClick={(e)=>setDeskDeliveryType(2)} className="mt-0" color="info">
                                                send paper to desk
                                                </Button> 
                                            </div>
                                            
                                        </FormGroup>
                                    </>
                                    }
                                    {isFile(data) && hasBeenDownloaded(data) && <FormGroup>                                        
                                        <div className="d-flex justify-content-between">                                        
                                            <Button type="button" disabled={submitEnable} onClick={(e)=>setDeskDeliveryType(1)} className="mt-0" color="info">
                                            forward file to desk to print!
                                            </Button> 
                                        </div>
                                    </FormGroup>}     
                                    <div className="d-flex justify-content-between">                                        
                                            <Button type="submit" className="mt-0" color="info" disabled={!submitEnable}>
                                                {intl.formatMessage({id:"app.requests.sendToDesk"})}
                                            </Button> 
                                        </div>                               
                            </Card>
                            </FormContainer>
    
    </div>);

}

export default BorrowingRequestDeliverToDesk;