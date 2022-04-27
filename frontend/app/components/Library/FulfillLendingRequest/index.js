import React, {useEffect} from 'react'
import {Card, Row, Col, Form as FormContainer, FormGroup, Button} from 'reactstrap';
import {useIntl} from 'react-intl';
import './style.scss';
import { useState } from "react";
import FileUpload from  '../FileUpload';
import ReactDOM, { render } from 'react-dom';

const FulfillLendingRequest = props => {

    console.log('FulfillLendingRequest', props)
    const {data,customClass,FulfillLendingRequestStatus, unFulfillLendingRequestStatus, uploadFile, uploadSuccessCallback, fileUploadStatus} = props
    const intl = useIntl()
    const [showPanelActions, setshowPanelActions] = useState(false)
    const [showunfilPanelActions, setunfilPanelActions] = useState(false)
    const [deliverymethod, setDeliveryMethod] = useState(0);
    const hStylesucess = { color: 'green' };
    const hStylefail = { color: 'red' };
    const displaymsg = <h4 style={ hStylesucess }>File uploaded successfully</h4>
    const displaymsgerror = <h4 style={ hStylefail }>file upload failed</h4>
        



    const handlernote = (event) => {
        const value = event.target.value
        handleChange(value,'fulfill_note');  
    }
    const handlerURL = (event) => {
        const value = event.target.value
        handleChange(value,'url');  
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
        filename:null
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
            <label for="delivery">Choose a delivery method: </label>
            <select id="delivery" name="delivery" onChange={setDeliveryType}>
                <option value="0">---</option>
                <option value="1">File</option>
                <option value="2">Mail</option>
                <option value="3">HardCopy</option>
                <option value="4">URL</option>
            </select>             

            {(deliverymethod==1) && 
            <Card>
                <FileUpload uploadFile={uploadFile} uploadSuccessCallback={uploadSuccessCallback} fileUploadStatus={fileUploadStatus} data={data} customClass="detail-body"/>
                <Row>
                    <Col sm={6}>                       
                    { 
                        (uploadSuccessCallback) && (fileUploadStatus=='uploaded') &&   
                            <div>
                                 <div className="form-group">
                                    {displaymsg}
                                 </div>
                            </div> 
                    }
                    {
                        (fileUploadStatus=='failed') &&
                            <div className="form-group">
                                {displaymsgerror}
                            </div>
                    }
                    </Col>
                </Row>
            </Card>
            }
                
            {
            (deliverymethod > 0) &&
            <Card>
                <Row>
                    <Col sm={6}>
                    <div className="form-group">
                    { (deliverymethod == 4) &&
                        <div>
                            <label for="exampleInputURL">URL</label>
                            <input type="text" className="form-control" id="url" onChange={handlerURL} aria-describedby="" placeholder="Enter URL here"></input>                    
                        </div>
                    }                        
                        <label for="exampleInputEmail1">Notes</label>
                        <input type="text" className="form-control" id="fulfill_note"  onChange={handlernote} aria-describedby="" placeholder="Enter note here"></input>
                        <small id="emailHelp" className="form-text text-muted">This message will send to the borrowing library.</small>
                    </div>
                        {( (uploadSuccessCallback) ||  (deliverymethod > 1) ) && 
                        <div>
                            <button type="button" onClick={() => FulfillLendingRequestStatus(data,formData)} className="btn btn-success">Submit</button>        
                        </div>}
                    </Col>
                </Row>
             </Card>  
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
                        <button type="button" onClick={() => unFulfillLendingRequestStatus(data)} className="btn btn-success">Submit</button>        
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