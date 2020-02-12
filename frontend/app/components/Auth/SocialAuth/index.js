import {Button, CardFooter, Col, Row} from "reactstrap";
import GarrImg from "../../../images/idem.svg";
import React from 'react';

export default function Index(props) {
  return (
    <CardFooter className="p-4">
      <Row>
        <Col xs="12" sm="6">
          <Button className="btn-facebook mb-1" block onClick={props.loginFacebook}><span>Facebook</span></Button>
        </Col>
        <Col xs="12" sm="6">
          <Button className="btn-google-plus mb-1" block onClick={props.loginGoogle}><span>Google</span></Button>
        </Col>
        <Col xs="6" sm="6">
          <a href="https://devnilde.bo.cnr.it/Shibboleth.sso/Login?target=https://devnilde.bo.cnr.it/shibb/shiblogin.php">
            <img src={GarrImg}/>
          </a>
        </Col>
        <Col xs="12" sm="12">
          <div id="my-spid-button">
            <noscript>
              Il login tramite SPID richiede che JavaScript sia abilitato nel browser
            </noscript>
          </div>
        </Col>
      </Row>
    </CardFooter>
  )
}
