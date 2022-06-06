import React,{useEffect} from 'react';
import {Card, Form as FormContainer, FormGroup, Button} from 'reactstrap';
import Input from '../../Form/Input';
import {useIntl} from 'react-intl';
import './style.scss';
import { useState } from "react";
import {canPatronReqDirectManaged,hasBeenDownloaded,isFile,isMail,isURL,isFAX,isArticleExchange,isOther} from '../BorrowingItem'
import FileUpload from '../../../containers/FileUpload';

const BorrowingRequestDeliverToDesk = props => {
    console.log('BorrowingRequestDeliverToDesk', props)
    const {data,deliverCallback}=props

    const intl = useIntl()

    const [submitEnable, setSubmitEnable]=useState(false);
    const [fileUploadStatus,setFileUploadStatus]=useState(null)
    

    const [formData,setFormData]=useState({        
        desk_delivery_format:null,           
    });

    useEffect(() => {        
        if(fileUploadStatus && fileUploadStatus.status=="uploaded")
        {
            setFormData({
                ...formData,
                'filehash':fileUploadStatus.data,
                'filename':fileUploadStatus.originalfilename,
                'desk_delivery_format':1
            })                        
            setSubmitEnable(true) 
        }
    }, [fileUploadStatus])

       
    const handleChange = (value, field_name) =>{
        setFormData({ ...formData, [field_name]: value});                     
    }    

    const setDeskDeliveryType=(ty) => {                 
        handleChange(ty,'desk_delivery_format');  //1=file, 2=paper         
        setSubmitEnable(true) 
    }

    const addFileToRequest = (uploadstatus) => {                
        //console.log("addFileToRequest",uploadstatus)  
        setFileUploadStatus(uploadstatus)        
    }

    //nothing to do cause file was already uploaded by lender
    const forwardFileToDesk= () => {
        setDeskDeliveryType(1);
    }

    const onSubmit=(e)=>{                         
        e.preventDefault();   
        //console.log("SUBMIT",formData)
        deliverCallback(formData)
    }
    
return (<div>
    <FormContainer onSubmit={onSubmit} className="was-validated" noValidate>                
                            <Card>
                                    {(canPatronReqDirectManaged(data) || ( isMail(data)||(isURL(data) && hasBeenDownloaded(data))||isFAX(data)||isArticleExchange(data)||isOther(data)) )&&
                                    <>
                                        <FormGroup >
                                            Method 1: Upload and send a file to desk
                                            <FileUpload parentCallback={addFileToRequest} data={data} customClass="detail-body"/>                                            
                                        </FormGroup>
                                                                                                                                                                                  
                                        <FormGroup >                                            
                                                Method 2:     
                                                <Button type="button" onClick={(e)=>setDeskDeliveryType(2)} className="mt-0" color="info">                                                
                                                Send paper to desk
                                                </Button>                                             
                                        </FormGroup>
                                    </>
                                    }
                                    {isFile(data) && hasBeenDownloaded(data) && <FormGroup>                                        
                                        <div className="d-flex justify-content-between">                                        
                                            <Button type="button" disabled={submitEnable} onClick={(e)=>forwardFileToDesk()} className="mt-0" color="info">
                                            forward file to desk to print!
                                            </Button> 
                                        </div>
                                    </FormGroup>}                                                                  
                            </Card>
                            <div className="d-flex justify-content-between">                                        
                                            <Button type="submit" className="mt-0" color="info" disabled={!submitEnable}>
                                                {intl.formatMessage({id:"app.requests.sendToDesk"})}
                                            </Button> 
                                        </div>   
                            </FormContainer>
    
    </div>);

}

export default BorrowingRequestDeliverToDesk;