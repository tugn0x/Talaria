import React from 'react';
import {Button, Card, CardBody, Row, Col} from 'reactstrap';
import {useIntl} from 'react-intl';
import ReferenceIcons from '../ReferenceIcons';
import ButtonBack from 'components/Button/ButtonBack';
import './style.scss';

const ReferenceRequest = props => {
    console.log('ReferenceRequest', props)
    const {reference, messages} = props
    const intl = useIntl()
    return (
        <div className="detail">
            <div className="section-title">
                <ButtonBack className="detail-back" />
                <h1 className="large">{intl.formatMessage(messages.headerRequest)}</h1>
            </div>
            <div>
                * check richieste già effettuate o in corso
            </div>
            <div className="reference">
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
            <div className="library">
                <Card className="detail-body">
                <Row>
                        <Col sm={6}>Library</Col>
                        <Col sm={6}>Pickup</Col>
                </Row>
                <p>Service note and cost</p>
                <p>Cost Policy ...</p>
                </Card>
            </div>
            <Button type="submit" className="btn-cta">
                    {intl.formatMessage({id: 'app.global.submit'})}
            </Button>
        </div>
    );
};

export default ReferenceRequest;