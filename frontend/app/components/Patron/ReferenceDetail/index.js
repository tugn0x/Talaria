import React from 'react';
import {Card, CardBody, Row, Col} from 'reactstrap';
import {useIntl} from 'react-intl';
import {NavLink} from 'react-router-dom'
import ButtonBack from 'components/Button/ButtonBack';
import './style.scss';

const ReferenceDetail = props => {
    console.log('ReferenceDetail', props)
    const {reference, messages} = props
    const intl = useIntl()
    return (
        <div className="detail reference">
            <div className="header">
                <ButtonBack className="detail-back" />
                <h3 className="title-section">{intl.formatMessage(messages.headerDetail)}</h3>
            </div>
            <div className="features-icons">
                <NavLink to='#' className="btn btn-link">
                    <i className="fa fa-print"></i>
                </NavLink>
                <NavLink to='#' className="btn btn-link">
                    <i className="fa fa-download"></i>
                </NavLink>
                <NavLink to='#' className="btn btn-link">
                    <i className="fa fa-tag"></i>
                </NavLink>
                <NavLink to='#' className="btn btn-link">
                    <i className="fa fa-folder"></i>
                </NavLink>
            </div>
            <Card className="detail-body">
                <CardBody>
                    <Row>
                        <Col sm={12}>
                            <p className="text-brown">{intl.formatMessage(messages.pub_title)}</p>
                            <p>{reference.pub_title}</p>
                        </Col>
                    </Row>
                    
                    <Row className="my-5">
                        <Col sm={3}>
                            <p className="text-brown">{intl.formatMessage(messages.material_type)}</p>
                            <p>{reference.material_type}</p>
                        </Col>
                    
                        <Col sm={3}>
                            <p className="text-brown">{intl.formatMessage(messages.pubyear)}</p>
                            <p>{reference.pubyear}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={2}>
                            <p className="text-brown">{intl.formatMessage(messages.volume)}</p>
                            <p>{reference.volume}</p>
                        </Col>
                    
                        <Col sm={2}>
                            <p className="text-brown">{intl.formatMessage(messages.page_start)}</p>
                            <p>{reference.page_start}</p>
                        </Col>
                    
                        <Col sm={2}>
                            <p className="text-brown">{intl.formatMessage(messages.first_author)}</p>
                            <p>{reference.first_author}</p>
                        </Col>
                    
                        <Col sm={2}>
                            <p className="text-brown">{intl.formatMessage(messages.part_title)}</p>
                            <p>{reference.part_title}</p>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default ReferenceDetail;