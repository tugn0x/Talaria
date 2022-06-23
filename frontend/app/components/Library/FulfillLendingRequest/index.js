import React,{useEffect} from 'react';
import {Card, Row, Col,formData, Form as FormContainer} from 'reactstrap';
import {FormattedHTMLMessage,useIntl} from 'react-intl';
import './style.scss';
import { useState } from "react";
import FileUpload from '../../../containers/FileUpload';

const FulfillLendingRequest = props => {
    console.log('FulfillLendingRequest', props)
    const {data,customClass,FulfillLendingRequestStatus, unFulfillLendingRequestStatus} = props
    const intl = useIntl()
    const [showPanelActions, setshowPanelActions] = useState(false)
    const [showunfilPanelActions, setunfilPanelActions] = useState(false)
    const [deliverymethod, setDeliveryMethod] = useState(0);
    const [notdeliverymethod, setNotDeliveryMethod] = useState(0);
    const [fileuploadstatus, SetfileuploadStatus] = useState(null)
    const callbackuploadFunction = (fileupload) => {
        SetfileuploadStatus(fileupload)
    }

    useEffect(() => {      
      
        if(fileuploadstatus && fileuploadstatus.status=="uploaded")
        {
            setFormData({
                ...formData,
                'filehash':fileuploadstatus.data,
                'filename':fileuploadstatus.originalfilename,
            })                        
        }
        else
        {
            setFormData({
                ...formData,
                'filehash':null,
                'filename':null,
            })  
        }
    }, [fileuploadstatus])


    const handlernote = (event) => {
        const value = event.target.value
        handleChange(value,'fulfill_note');  
    }
    const handlerURL = (event) => {
        const value = event.target.value
        handleChange(value,'url');  
    }

    const handlerinventorynr = (event) => {
        const value = event.target.value
        handleChange(value,'fulfill_inventorynr');  
    }

    const handlerlendingprotnr = (event) => {
        const value = event.target.value
        handleChange(value,'lending_protnr');  
    }
    

    const setDeliveryType=(event) => {                 
        const value = event.target.value
        setDeliveryMethod(value) // 1 File - 2 Mail - 3 hardcopy - 4 URL
        handleChange(value,'fulfill_type');
    }
    const setNotDeliveryType=(event) => {                 
        const value = event.target.value  
        setNotDeliveryMethod(value);      
        handleChange(value,'notfulfill_type');
    }
    
    const handleChange = (value, field_name) =>{
        setFormData({ ...formData, [field_name]: value});                     
    }  
    const [formData,setFormData]=useState({        
        fulfill_type:null,
        url:null,
        fulfill_note: null,
        filehash: null,
        filename:null,
        fulfill_inventorynr :null,
        notfulfill_type:null,
        lending_protnr:null,

    });

    function isEmpty(object) {
        for (const property in object) {
          return false;
        }
        return true;
      }

return (
    <>
    <div>
    <FormContainer  className="was-validated" noValidate>         
    <div className={customClass}>        
        {<Card>
            <Row>
            {(data.all_lender == null || data.all_lender == 0) && data.lending_archived== null && data.lending_status=="willSupply" &&
                <Col sm={3}>                    
                        <button type="button" className="btn btn-primary btn-lg" onClick={function() { setunfilPanelActions(false); setshowPanelActions(true); }}
                        >{intl.formatMessage({id: "app.requests.fulfill"})}</button>
                      
                </Col>}
                <Col sm={3}> 
                    {(data.all_lender == null || data.all_lender == 0) && data.lending_archived == null &&
                      <button type="button" className="btn btn-danger btn-lg" onClick={function() { setunfilPanelActions(true); setshowPanelActions(false); }}>{intl.formatMessage({id: "app.requests.unfill"})}</button>
                    }
                </Col>
            </Row>
        </Card>}
    
    
        {(showPanelActions) && (!showunfilPanelActions) && 
         <div className={customClass}>
            <h3>{intl.formatMessage({id: "app.requests.fulfill"})}</h3>
            <Card>
                <Row>
                    <Col sm={6}>   
                        <label htmlFor="delivery">{intl.formatMessage({id: "app.components.FulfillLendingRequest.chooseDeliveryMethod"})}</label>
                        <select id="delivery" name="delivery" onChange={setDeliveryType}>
                            <option value="0">---</option>
                            <option value="1">{intl.formatMessage({id: "app.requests.deliveryMethod.file"})}</option>
                            <option value="2">{intl.formatMessage({id: "app.requests.deliveryMethod.mail"})}</option>
                            <option value="3">{intl.formatMessage({id: "app.requests.deliveryMethod.fax"})}</option>
                            <option value="4">{intl.formatMessage({id: "app.requests.deliveryMethod.url"})}</option>
                            <option value="5">{intl.formatMessage({id: "app.requests.deliveryMethod.articleexchange"})}</option>
                            <option value="6">{intl.formatMessage({id: "app.requests.deliveryMethod.other"})}</option>
                        </select>     
                    </Col>
                </Row>
                {(deliverymethod==1) && <FileUpload  parentCallback={callbackuploadFunction} cleanuploadprops={true} data={data} customClass="detail-body"/>}
            
                {
                (deliverymethod > 0) &&
                <>
                    <Row>
                        <Col sm={12}>
                        <div className="form-group">
                        { (deliverymethod == 4) &&
                            <div>
                                <label htmlFor="url">URL</label>
                                <input type="text" className="form-control" id="url" onChange={handlerURL} aria-describedby=""></input>                    
                            </div>
                        }   
                        </div>
                        <div className="form-group">                        
                            <label htmlFor="fulfill_inventorynr">{intl.formatMessage({id: "app.requests.lending_protnr"})}</label>
                            <input type="text" className="form-control" id="lending_protnr"  onChange={handlerlendingprotnr} aria-describedby=""></input>                                                                
                        </div>
                        <div className="form-group">
                            <label htmlFor="fulfill_inventorynr">{intl.formatMessage({id: "app.requests.inventoryNumber"})}</label>
                            <input type="text" className="form-control" id="fulfill_inventorynr"  onChange={handlerinventorynr} aria-describedby=""></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fulfill_note">{intl.formatMessage({id: "app.requests.fulfill_note"})}</label>
                            <textarea id="fulfill_note" className="form-control" onChange={handlernote} aria-describedby="" rows="5" cols="50"></textarea>                        
                        </div>
                        
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <div className="alert alert-primary copyrightstatement">                                                
                                <FormattedHTMLMessage id="app.requests.lendingCopyrightStatement" defaultMessage="borrowingCopyrightStatement" />
                            </div>                          
                        </Col>
                    </Row>
                
                {  ( !isEmpty(fileuploadstatus) || (deliverymethod >1) )  &&
                <Card>
                    <Row>
                        <Col sm={6}>
                    
                            <div>
                                <button type="button" onClick={() => FulfillLendingRequestStatus(data,formData)} className="btn btn-success">{intl.formatMessage({id: "app.requests.submitButton"})}</button>        
                            </div>
                        </Col>
                    </Row>
                </Card>}
                </>
                }
            </Card>
        </div>}

        {(showunfilPanelActions) && <div className={customClass}>
            <h3>{intl.formatMessage({id: "app.requests.unfill"})}</h3>
            {<Card>
                <Row>
                    <Col sm={6}>   
                        <label htmlFor="notfulfill_type">{intl.formatMessage({id: "app.requests.notfulfill_type"})}</label>
                        <select id="notfulfill_type" name="notfulfill_type" onChange={setNotDeliveryType}>
                            <option value="0">---</option>
                            <option value="1">{intl.formatMessage({id: "app.requests.notfulfill_type.NotAvailableForILL"})}</option>
                            <option value="2">{intl.formatMessage({id: "app.requests.notfulfill_type.NotHeld"})}</option>
                            <option value="3">{intl.formatMessage({id: "app.requests.notfulfill_type.NotOnShelf"})}</option>
                            <option value="4">{intl.formatMessage({id: "app.requests.notfulfill_type.ILLNotPermittedByLicense"})}</option>
                            <option value="5">{intl.formatMessage({id: "app.requests.notfulfill_type.WrongRef"})}</option>
                            <option value="6">{intl.formatMessage({id: "app.requests.notfulfill_type.MaxReqNumber"})}</option>
                            <option value="7">{intl.formatMessage({id: "app.requests.notfulfill_type.Other"})}</option>
                        </select>     
                    </Col>
                </Row>
                <Row> 
                    <Col sm={6}>
                        <div>
                            <div className="form-group">
                                <label htmlFor="fulfill_note">{intl.formatMessage({id: "app.requests.fulfill_note"})}</label>
                                <textarea className="form-control" id="fulfill_note" onChange={handlernote} aria-describedby="" rows="5" cols="50"></textarea>                                
                            </div>    
                        </div>
                    </Col>
                </Row>

                {notdeliverymethod >0 && <Row>
                    <Col sm={6}>
                    <div>
                        <button type="button" onClick={() => unFulfillLendingRequestStatus(data,formData)} className="btn btn-success">{intl.formatMessage({id: "app.requests.submitButton"})}</button>        
                    </div>
                    </Col>
                </Row>}
            </Card>
            }  
            </div>
        }
        </div>
        </FormContainer>
        </div>
        </>
)}

export default FulfillLendingRequest;