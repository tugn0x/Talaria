import React from 'react';
import {Card, Row, Col} from 'reactstrap';
import {useIntl} from 'react-intl';
import ReferenceIcons from '../ReferenceIcons';

const ReferenceDetail = props => {
    console.log('ReferenceDetail', props)
    const {reference, messages, icons,deleteReference} = props
    const intl = useIntl()
    return (
        <>
                <div className="list-head features-icons">
                    <ReferenceIcons 
                        data={reference}
                        icons={icons ? icons : ['request','oa','edit','print','export','delete']}
                        deleteReference={deleteReference}
                    />
                </div>
                <Card className="detail-body">
                    <Row>
                        <Col sm={12}>
                            <p className="text-brown">{intl.formatMessage(messages.pub_title)}</p>
                            <p>{reference.pub_title}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={3}>
                            <p className="text-brown">{intl.formatMessage(messages.material_type)}</p>
                            <p>{reference.material_type_key}</p>
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
                    
                        <Col sm={6}>
                            <p className="text-brown">{intl.formatMessage(messages.part_title)}</p>
                            <p>{reference.part_title}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={5}>
                            {reference.labels && 
                                <>
                                    <p className="text-brown">{intl.formatMessage({id: "app.routes.Labels"})}</p>  
                                    <ul>    
                                        {reference.labels.data.map( el => 
                                            <li key={el.id}>{el.name}</li>
                                            ) 
                                        }
                                    </ul>
                                </>
                            }
                        </Col>
                        <Col sm={5}>
                            {reference.groups && 
                                <>
                                    <p className="text-brown">{intl.formatMessage({id: "app.routes.Categories"})}</p>  
                                    <ul>    
                                        {reference.groups.data.map( el => 
                                            <li key={el.id}>{el.name}</li>
                                            ) 
                                        }
                                    </ul>
                                </>
                            }
                        </Col>
                    </Row>
                </Card>
            
        </>
    );
};

export default ReferenceDetail;