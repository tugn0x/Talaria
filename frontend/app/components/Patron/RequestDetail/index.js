import React from 'react';
import {Card, CardBody, Row, Col} from 'reactstrap';
import {useIntl} from 'react-intl';
import {NavLink} from 'react-router-dom'
import ButtonBack from 'components/Button/ButtonBack';
import './style.scss';

const RequestDetail = props => {
    console.log('RequestDetail', props)
    const {patronrequest, messages,referenceMessages} = props
    
    const intl = useIntl()
    return (
        <div className="detail request">
            <div className="header">
                <ButtonBack className="detail-back" />
                <h3 className="title-section">{intl.formatMessage(messages.headerDetail)}</h3>
            </div>
            <div className="features-icons">
                <NavLink to='#' className="btn btn-link">
                    <i className="fas fa-print"></i>
                </NavLink>
                <NavLink to='#' className="btn btn-link">
                    <i className="fas fa-file-export"></i>
                </NavLink>
                <NavLink to='#' className="btn btn-link">
                    <span className="icon-tag-plus"></span>
                </NavLink>
                <NavLink to='#' className="btn btn-link">
                    <i className="fas fa-folder-plus"></i>
                </NavLink>
            </div>
            <Card className="detail-body">
                <CardBody>
                    <Row>
                        <Col sm={12}>
                            <p className="text-brown">{intl.formatMessage(referenceMessages.pub_title)}</p>
                            <p>{patronrequest.reference.data.pub_title}</p>
                        </Col>
                    </Row>
                    
                    <Row className="my-5">
                        <Col sm={3}>
                            <p className="text-brown">{intl.formatMessage(referenceMessages.material_type)}</p>
                            <p>{patronrequest.reference.data.material_type}</p>
                        </Col>
                    
                        <Col sm={3}>
                            <p className="text-brown">{intl.formatMessage(referenceMessages.pubyear)}</p>
                            <p>{patronrequest.reference.data.pubyear}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={2}>
                            <p className="text-brown">{intl.formatMessage(referenceMessages.volume)}</p>
                            <p>{patronrequest.reference.data.volume}</p>
                        </Col>
                    
                        <Col sm={2}>
                            <p className="text-brown">{intl.formatMessage(referenceMessages.page_start)}</p>
                            <p>{patronrequest.reference.data.page_start}</p>
                        </Col>
                    
                        <Col sm={2}>
                            <p className="text-brown">{intl.formatMessage(referenceMessages.first_author)}</p>
                            <p>{patronrequest.reference.data.first_author}</p>
                        </Col>
                    
                        <Col sm={2}>
                            <p className="text-brown">{intl.formatMessage(referenceMessages.part_title)}</p>
                            <p>{patronrequest.reference.data.part_title}</p>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default RequestDetail;