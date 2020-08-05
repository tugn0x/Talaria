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
                <ReferenceIcons 
                        data={reference}
                        icons={icons ? icons : ['request','oa','edit','print','export','delete']}
                        deleteReference={deleteReference}
                />
                <Card className="detail-body">
                    <Row>
                        <Col sm={3}>
                            <p className="text-brown">{intl.formatMessage(messages.material_type)}</p>
                            <p>{reference.material_type_key && intl.formatMessage(messages[reference.material_type_key])}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <p className="text-brown">{intl.formatMessage(messages.pub_title)}</p>
                            <p>{reference.pub_title}</p>
                        </Col>
                    </Row>
                    <Row>
                    <Col sm={12}>
                            <p className="text-brown">{intl.formatMessage(messages.part_title)}</p>
                            <p>{reference.part_title}</p>
                    </Col>
                    </Row>
                    <Row>
                    <Col sm={2}>
                            <p className="text-brown">{intl.formatMessage(messages.pubyear)}</p>
                            <p>{reference.pubyear}</p>
                        </Col>
                    <Col sm={3}>
                            <p className="text-brown">{intl.formatMessage(messages.first_author)}</p>
                            <p>{reference.first_author}</p>
                        </Col>
                    <Col sm={4}>
                        <p className="text-brown">{intl.formatMessage(messages.last_author)}</p>
                        <p>{reference.last_author}</p>
                    </Col>    
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <p className="text-brown">{intl.formatMessage(messages.publisher)}</p>
                            <p>{reference.publisher}</p>
                        </Col>
                        <Col sm={4}>
                            <p className="text-brown">{intl.formatMessage(messages.publishing_place)}</p>
                            <p>{reference.publishing_place}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={2}>
                            <p className="text-brown">{intl.formatMessage(messages.volume)}</p>
                            <p>{reference.volume}</p>
                        </Col>
                        <Col sm={2}>
                            <p className="text-brown">{intl.formatMessage(messages.issue)}</p>
                            <p>{reference.issue}</p>
                        </Col>
                        <Col sm={2}>
                            <p className="text-brown">{intl.formatMessage(messages.pages)}</p>
                            <p>{reference.page_start}-{reference.page_end}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={2}>
                            <p className="text-brown">{intl.formatMessage(messages.issn)}</p>
                            <p>{reference.issn}</p>
                        </Col>
                        <Col sm={2}>
                            <p className="text-brown">{intl.formatMessage(messages.isbn)}</p>
                            <p>{reference.isbn}</p>
                        </Col>
                        <Col sm={2}>
                            <p className="text-brown">{intl.formatMessage(messages.doi)}</p>
                            <p>{reference.doi}</p>
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