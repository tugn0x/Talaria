import React from 'react';
import {Card, Row, Col} from 'reactstrap';
import {useIntl} from 'react-intl';
import './style.scss';
import { useState } from "react";


const FulfillLendingRequest = props => {
    console.log('FulfillLendingRequest', props)
    const {data,customClass,FulfillLendingRequestStatus, unFulfillLendingRequestStatus} = props
    const intl = useIntl()
    
    const [showPanelActions, setshowPanelActions] = useState(false)

    const [showunfilPanelActions, setunfilPanelActions] = useState(false)
    
    
return (
    <><div className={customClass}>
        
        <h3>{intl.formatMessage({id: "app.requests.FulfillHeaderMessage"})}</h3>
        {<Card>
            <Row>
                <Col sm={3}>
                    {(data.all_lender == null || data.all_lender == 0) && data.lending_archived == null &&
                        <button type="button" class="btn btn-primary btn-lg" 
                        
                        onClick={function() { setunfilPanelActions(false); setshowPanelActions(true); }}
                        
                        >Fulfill</button>
                        }
                </Col>
                <Col sm={3}>
                    {(data.all_lender == null || data.all_lender == 0) && data.lending_archived == null &&
                      <button type="button" class="btn btn-danger btn-lg" onClick={function() { setunfilPanelActions(true); setshowPanelActions(false); }}>Unfulfill</button>
                    }
                </Col>
            </Row>
        </Card>}

    </div>
    
    {(showPanelActions) && (!showunfilPanelActions) && <div className={customClass}>
            <h3>Fulfill panels</h3>
            {<Card>
                <Row>
                    <Col sm={12}>
                   
            <div>
                <input type="file"  />
                <button type="button" onClick={() => alert('Upload succefuly Done!')}  class="btn btn-info">Upload file</button>
            </div>
                    </Col>
                   
                </Row>

                <Row>
                    <Col sm={6}>
                   
            <div>
            <div class="form-group">
            <label for="exampleInputEmail1">Notes</label>
            <input type="email" class="form-control" id="txtnote" aria-describedby="" placeholder="Enter note here"></input>
            <small id="emailHelp" class="form-text text-muted">This message will send to the borrowing library.</small>
            </div>    
            </div>
                    </Col>
                   
               
                   
                </Row>

                <Row>
                <Col sm={6}>
                   
                   <div>
       
                       
                   
                   <button type="button" onClick={() => FulfillLendingRequestStatus(data)} class="btn btn-success">Submit</button>        
                   </div>
                           </Col>
                           
                </Row>

            </Card>}
        </div>}
        
        {(showunfilPanelActions) && <div className={customClass}>
            <h3>Unfill panels</h3>
            {<Card>
                

                <Row>
                    <Col sm={6}>
                   
            <div>
            <div class="form-group">
            <label for="exampleInputEmail1">Unfill Notes</label>
            <input type="email" class="form-control" id="txtnote" aria-describedby="" placeholder="Enter note here"></input>
            <small id="emailHelp" class="form-text text-muted">This message will send to the borrowing library.</small>
            </div>    
            </div>
                    </Col>
                   
               
                   
                </Row>

                <Row>
                <Col sm={6}>
                   
                   <div>
       
                       
                   
                   <button type="button" onClick={() => unFulfillLendingRequestStatus(data)} class="btn btn-success">Submit</button>        
                   </div>
                           </Col>
                           
                </Row>

            </Card>}
        </div>}
        
        </>
    
)}

export default FulfillLendingRequest;