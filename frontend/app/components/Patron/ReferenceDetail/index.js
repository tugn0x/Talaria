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
        <div className="detail">
            <div className="section-title">
                <ButtonBack className="detail-back" />
                <h1 className="large">{intl.formatMessage(messages.headerDetail)}</h1>
            </div>
            <div className="reference">
                <div className="list-head features-icons">
                    <NavLink to='#' className="btn btn-icon">
                        <i className="fas fa-print"></i>
                    </NavLink>
                    <NavLink to='#' className="btn btn-icon">
                        <i className="fas fa-file-export"></i>
                    </NavLink>
                    <NavLink to='#' className="btn btn-icon">
                        <span className="icon-tag-plus"></span>
                    </NavLink>
                    <NavLink to='#' className="btn btn-icon">
                        <i className="fas fa-folder-plus"></i>
                    </NavLink>
                </div>
                <Card className="detail-body">
                <Row>
                        <Col sm={12}>
                        {reference.groups && 
                        <ul id="referenceGroups" className="referenceGroups">    
                            {reference.groups.data.map( el => 
                                <li key={el.id} className="referenceGroup">{el.name}</li>
                                ) 
                            }
                        </ul>
                        }
                        {reference.labels && 
                        <ul id="referenceLabels" className="referenceLabels">    
                            {reference.labels.data.map( el => 
                                <li key={el.id} className="referenceLabel">{el.name}</li>
                                ) 
                            }
                        </ul>}
                       </Col>
                    </Row>
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
                </Card>
            </div>
        </div>
    );
};

export default ReferenceDetail;