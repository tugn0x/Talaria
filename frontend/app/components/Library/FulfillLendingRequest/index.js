import React from 'react'
import {Card, Row, Col, Form as FormContainer} from 'reactstrap';
import {useIntl} from 'react-intl';
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
    const [fileuploadstatus, SetfileuploadStatus] = useState(null)
    const callbackuploadFunction = (fileupload) => {
        SetfileuploadStatus(fileupload.status)
    }

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

    const setDeliveryType=(event) => {                 
        const value = event.target.value
        setDeliveryMethod(value) // 1 File - 2 Mail - 3 hardcopy - 4 URL
        handleChange(value,'fulfill_type');
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
        fulfill_inventorynr :null
    });

       
return (
    <>
    <div>
    <FormContainer  className="was-validated" noValidate>         
    <div className={customClass}>
        <h3>{intl.formatMessage({id: "app.requests.FulfillHeaderMessage"})}</h3>
        {<Card>
            <Row>
            {(data.all_lender == null || data.all_lender == 0) && data.lending_archived== null && data.lending_status=="willSupply" &&
                <Col sm={3}>                    
                        <button type="button" className="btn btn-primary btn-lg" onClick={function() { setunfilPanelActions(false); setshowPanelActions(true); }}
                        >Fulfill</button>
                      
                </Col>}
                <Col sm={3}> 
                    {(data.all_lender == null || data.all_lender == 0) && data.lending_archived == null &&
                      <button type="button" className="btn btn-danger btn-lg" onClick={function() { setunfilPanelActions(true); setshowPanelActions(false); }}>Unfulfill</button>
                    }
                </Col>
            </Row>
        </Card>}
    </div>
    
    {(showPanelActions) && (!showunfilPanelActions) && <div className={customClass}>
            <h3>Fulfill panels</h3>
            {
                <Card>
                    <Row>
                        <Col sm={6}>   
                            <label for="delivery">Choose a delivery method: </label>
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
                </Card>
            }
            {
            (deliverymethod==1) && 
                <FileUpload  parentCallback={callbackuploadFunction}  deliverymethod={deliverymethod} data={data} customClass="detail-body"/>
            }
                
            {
            (deliverymethod > 0) &&
            <div>
            <Card>
                <Row>
                    <Col sm={12}>
                    <div className="form-group">
                    { (deliverymethod == 4) &&
                        <div>
                            <label for="exampleInputURL">URL</label>
                            <input type="text" className="form-control" id="url" onChange={handlerURL} aria-describedby="" placeholder="Enter URL here"></input>                    
                        </div>
                    }   
                    </div>
                    <div className="form-group">
                        <label for="exampleInputinventory">{intl.formatMessage({id: "app.requests.inventoryNumber"})}</label>
                        <input type="text" className="form-control" id="fulfill_inventorynr"  onChange={handlerinventorynr} aria-describedby="" placeholder="Enter inventory number here"></input>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Notes</label>
                        <textarea id="fulfill_note" className="form-control" onChange={handlernote} aria-describedby="" placeholder="Enter note here" rows="5" cols="50"></textarea>
                        <small id="emailHelp" className="form-text text-muted">This message will send to the borrowing library.</small>
                    </div>
                      
                    </Col>
                </Row>
             </Card>  
             <Card>
                  <Row>
                    <Col sm={12}>
                        <div className="form-group">
                        
                        <label for="examplecopyright">Copyright Statement </label>

                        <span class="span">
                        {intl.formatMessage({id: "app.requests.lendingCopyrightStatement"})}
                        </span>
                        </div>
                    </Col>
                </Row>
             </Card>

             {( (fileuploadstatus) ||  (deliverymethod > 1) ) && 
            <Card>
                <Row>
                    <Col sm={6}>
                   
                        <div>
                            <button type="button" onClick={() => FulfillLendingRequestStatus(data,formData)} className="btn btn-success">Submit</button>        
                        </div>
                    </Col>
                </Row>
            </Card>}
             </div>
            }
        </div>}
        
        {(showunfilPanelActions) && <div className={customClass}>
            <h3>Unfill panels</h3>
            {<Card>
                <Row>
                    <Col sm={6}>
                        <div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Unfill Notes</label>
                                <input type="email" className="form-control" id="txtnote" onChange={handlernote} aria-describedby="" placeholder="Enter note here"
                               ></input>
                                <small id="emailHelp" className="form-text text-muted">This message will send to the borrowing library.</small>
                            </div>    
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                    <div>
                        <button type="button" onClick={() => unFulfillLendingRequestStatus(data)} className="btn btn-success">{intl.formatMessage({id: "app.requests.submitButton"})}</button>        
                    </div>
                    </Col>
                </Row>
            </Card>}
        </div>}
        </FormContainer>
        </div>
        </>
)}

export default FulfillLendingRequest;