import {Button, CardFooter, Col, Row} from "reactstrap";
import GarrImg from "../../../images/idem.svg";
import React from 'react';
import './style.scss'
import messages from './messages';
import { FormattedMessage } from 'react-intl';

export default function Index(props) {
  return (
    <CardFooter className="p-4">
      <Row>
        <Col xs="12">
          <Button className="btn-facebook mb-1" block onClick={props.loginFacebook}><span>Facebook</span></Button>
        </Col>
        <Col xs="12">
          <Button className="btn-google-plus mb-1" block onClick={props.loginGoogle}><span>Google</span></Button>
        </Col>
        <Col xs="12">
          <a className="btn-garr-container" href="https://devnilde.bo.cnr.it/Shibboleth.sso/Login?target=https://devnilde.bo.cnr.it/shibb/shiblogin.php">
            <div className="btn-garr">
              <img src={GarrImg}/>
            </div>
            <div className="btn-garr-text">
            <FormattedMessage {...messages.garrButton} />
            </div>
          </a>
        </Col>
        <Col xs="12">
            <div id="my-spid-button"> 
            {/* <div className="btn-garr-container">
              <div className="float-left btn-garr">
                <div id="my-spid-button">  
              </div>
            </div>
            <div className="btn-garr-text">
              Accedi con Spid
            </div> */}
            <noscript>
              Il login tramite SPID richiede che JavaScript sia abilitato nel browser
            </noscript>
          </div>
        </Col>
      </Row>
    </CardFooter>
  )
}
