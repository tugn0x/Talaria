import React, { useState, useEffect } from 'react'
import {Button, Row, Col} from 'reactstrap'
import {useIntl} from 'react-intl'
import './style.scss';

const Navigation = (props) => {
    console.log("Header Wizard", props)
    const intl = useIntl()

    return (
        <div className="navigation-wizard">
            <Row>
                {Object.keys(props.steps).map((key) => 
                    <Col xs={3}>
                        <Button 
                            key={key}
                            color="transparent"
                            className={props.step === Number(key) ? 'active' : ''}
                            onClick={() => props.changeStep(key)}
                            disabled={key === 1 ? false : !props.steps[key].active}
                        >
                            <div className="circle"></div>
                            <p>
                                {intl.formatMessage(props.messages[`step_${key}`])}
                            </p>
                        </Button> 
                    </Col>
                )}
            </Row>
        </div>
    )
}

export default Navigation