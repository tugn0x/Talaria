import React from 'react';
import {Card, Row, Col} from 'reactstrap';
import {useIntl} from 'react-intl';
import './style.scss';
import { useState } from "react";

const FulfillLendingPanel = props => {
    console.log('FulfillLendingRequest', props)
    const {data,customClass} = props
    const intl = useIntl()
    
    const [showPanelActions, setshowPanelActions] = useState(false)

    
    
return (
    <><div className={customClass}>
        { <h3>{intl.formatMessage({id: "app.global.FulfillHeaderMessage"})}</h3> }
        <h3>Fulfill</h3>
        {<Card>
            <Row>
                <Col sm={3}>
                    {(data.all_lender == null || data.all_lender == 0) && data.lending_archived == 0 &&
                        <button type="button" className="btn btn-primary btn-lg" onClick={() => setshowPanelActions(true)}>Fulfill</button>
                        }
                </Col>
                <Col sm={3}>
                    {(data.all_lender == null || data.all_lender == 0) && data.lending_archived == 0 &&
                             <button type="button" className="btn btn-danger btn-lg"  onClick={() => setshowPanelActions(false)}>Unfulfill</button>
                        }
                </Col>
            </Row>
        </Card>}

    </div>
    
    {
    (showPanelActions)&&<div className={customClass}>
            <h3>Fulfill panels</h3>
            {<Card>
                <Row>
                    <Col sm={12}>
                   
            <div>
                <input type="file"  />
                <button type="button" onClick={() => alert('Upload succefuly Done!')}  className="btn btn-info">Upload file</button>
            </div>
                    </Col>
                   
                </Row>

                <Row>
                    <Col sm={6}>
                   
            <div>
            <div className="form-group">
    <label for="exampleInputEmail1">Notes</label>
    <input type="email" className="form-control" id="txtnote" aria-describedby="" placeholder="Enter note here"></input>
    <small id="emailHelp" className="form-text text-muted">This message will send to the borrowing library.</small>
  </div>    
            </div>
                    </Col>
                   
               
                   
                </Row>

                <Row>
                <Col sm={6}>
                   
                   <div>
       
                       
                   
                   <button type="button" onClick={() => alert('Fulfill Done!')} className="btn btn-success">Submit</button>        
                   </div>
                           </Col>
                           
                </Row>

            </Card>}
        </div>}</>
    
)}

export default FulfillLendingPanel;