import React from 'react';
import {Card, Row, Col} from 'reactstrap';
import {useIntl} from 'react-intl';
import ReferenceIcons from '../ReferenceIcons';
import './style.scss';

const ReferenceDetail = props => {
    console.log('ReferenceDetail', props)
    const {reference, messages, icons,deleteReference} = props
    const intl = useIntl()

    return (
        <>  {!(icons && icons.length==0) && 
                <div className="list-head features-icons">
                <ReferenceIcons 
                        data={reference}
                        icons={icons ? icons : ['request','oa','edit','print','export','delete']}
                        deleteReference={deleteReference}
                />
                </div>}
                {reference.labels && Object.keys(reference.labels.data).length > 0 &&
                            <div className="labels-row">
                                {reference.labels.data.map(label => <span key={label.id}>{label.name}</span>)}
                            </div>
                        }
                        {reference.groups && Object.keys(reference.groups.data).length > 0 &&
                            <div className="groups-row">
                                {reference.groups.data.map(group => <span key={group.id}>{group.name}</span>)}
                            </div>
                }
                <div className="detail-body">                
                    <h3>{intl.formatMessage(messages.titleAuthorsHead)}</h3>
                    <Card>
                        <Row>
                            <Col sm={3}>
                                <p className="text-brown">{intl.formatMessage(messages.material_type)}</p>
                                <p>{reference.material_type_key && intl.formatMessage(messages[reference.material_type_key])}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <p className="text-brown">{reference.material_type === 1 ? intl.formatMessage(messages.pub_title) : intl.formatMessage(messages.title)}</p>
                                <p>{reference.pub_title}</p>
                            </Col>
                        </Row>
                        {(reference.material_type === 1 || reference.material_type === 2 || reference.material_type === 3 || reference.material_type === 5) && 
                        <Row>
                        <Col sm={12}>
                                <p className="text-brown">{reference.material_type === 1 ? intl.formatMessage(messages.part_title) : reference.material_type === 2 ? intl.formatMessage(messages.section): intl.formatMessage(messages.chapter)}</p>
                                <p>{reference.part_title}</p>
                        </Col>
                        </Row>}
                        <Row>
                        {(reference.material_type !== 1 ) && 
                        <Col sm={3}>
                                <p className="text-brown">{intl.formatMessage(messages.authors)}</p>
                                <p>{reference.authors}</p>
                        </Col>
                        }
                        {(reference.material_type === 1 || reference.material_type === 2) && 
                        <Col sm={4}>
                            <p className="text-brown">{reference.material_type === 1? intl.formatMessage(messages.authors):intl.formatMessage(messages.part_authors)}</p>
                            <p>{reference.part_authors}</p>
                        </Col>}
                        </Row>
                        <Row>
                        {(reference.material_type === 3) && 
                        <Col sm={4}>
                            <p className="text-brown">{intl.formatMessage(messages.relator)}</p>
                            <p>{reference.relator}</p>
                        </Col> &&
                        <Col sm={4}>
                            <p className="text-brown">{intl.formatMessage(messages.thesis_type)}</p>
                            <p>{reference.thesis_type}</p>
                        </Col>&&
                        <Col sm={4}>
                        <p className="text-brown">{intl.formatMessage(messages.degree_course)}</p>
                        <p>{reference.degree_course}</p>
                        </Col>                        
                        }    
                        </Row>
                        {(reference.material_type === 1 || reference.material_type === 2 || reference.material_type === 4) && 
                        <Row>
                        <Col sm={12}>
                                <p className="text-brown">{reference.material_type === 4? intl.formatMessage(messages.collection):intl.formatMessage(messages.series_title)}</p>
                                <p>{reference.series_title}</p>
                        </Col>
                        </Row>
                        }
                        {(reference.material_type === 4) && 
                        <Row>
                        <Col sm={12}>
                                <p className="text-brown">{intl.formatMessage(messages.geographic_area)}</p>
                                <p>{reference.geographic_area}</p>
                        </Col>
                        </Row>
                        }
                    </Card>
                    <h3>{intl.formatMessage(messages.dateInstitutionPlaceHead)}</h3>
                    <Card>
                        <Row>
                        <Col sm={2}>
                                <p className="text-brown">{intl.formatMessage(messages.pubyear)}</p>
                                <p>{reference.pubyear}</p>
                        </Col>                    
                        {(reference.material_type === 1 || reference.material_type === 2) && 
                            <Col sm={2}>
                                <p className="text-brown">{intl.formatMessage(messages.volume)}</p>
                                <p>{reference.volume}</p>
                            </Col>
                        }
                        {(reference.material_type === 1) && 
                            <Col sm={2}>
                                <p className="text-brown">{intl.formatMessage(messages.issue)}</p>
                                <p>{reference.issue}</p>
                            </Col>
                        }
                        {(reference.material_type !== 4 ) && 
                            <Col sm={2}>
                                <p className="text-brown">{intl.formatMessage(messages.pages)}</p>
                                <p>{reference.pages}</p>
                            </Col>
                        }
                        </Row>
                        <Row>
                            {reference.material_type != 5 && 
                            <Col sm={4}>
                                <p className="text-brown">{reference.material_type === 3?intl.formatMessage(messages.university):intl.formatMessage(messages.publisher)}</p>
                                <p>{reference.publisher}</p>
                            </Col>
                            }
                            {reference.material_type != 1 &&
                            <Col sm={4}>
                                <p className="text-brown">{intl.formatMessage(messages.publishing_place)}</p>
                                <p>{reference.publishing_place}</p>
                            </Col>
                            }
                        </Row>                    
                    </Card>
                    <h3>{intl.formatMessage(messages.identificationHead)}</h3>
                    <Card>                
                    <Row>
                    {(reference.material_type === 2 || reference.material_type === 4 )&& 
                        <Col sm={2}>
                            <p className="text-brown">{intl.formatMessage(messages.isbn)}</p>
                            <p>{reference.isbn}</p>
                        </Col>
                    }
                    {(reference.material_type === 1 || reference.material_type === 2 || reference.material_type === 4 )&& 
                        <Col sm={2}>
                            <p className="text-brown">{intl.formatMessage(messages.issn)}</p>
                            <p>{reference.issn}</p>
                        </Col>
                    }
                        <Col sm={2}>
                            <p className="text-brown">{intl.formatMessage(messages.doi)}</p>
                            <p>{reference.doi}</p>
                        </Col>
                        <Col sm={2}>
                            <p className="text-brown">{intl.formatMessage(messages.sid)}</p>
                            <p>{reference.sid}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={2}>
                            <p className="text-brown">{intl.formatMessage(messages.pmid)}</p>
                            <p>{reference.pmid}</p>
                        </Col>
                        {reference.material_type === 1 &&
                        <Col sm={2}>
                        <p className="text-brown">{intl.formatMessage(messages.acnp_cod)}</p>
                        <p>{reference.acnp_cod}</p>
                        </Col>
                        }
                                                <Col sm={2}>
                        <p className="text-brown">{intl.formatMessage(messages.sbn_docid)}</p>
                        <p>{reference.sbn_docid}</p>
                        </Col>
                    </Row>
                </Card>
                <h3>{intl.formatMessage(messages.abstract)}</h3>
                <Card>                  
                    <Row>
                    <Col sm={12}>
                        <p className="text-brown">{intl.formatMessage(messages.abstract)}</p>
                        <p>{reference.abstract}</p>
                    </Col>
                    </Row>
                </Card>
                <h3>{reference.material_type === 3?intl.formatMessage(messages.indications):reference.material_type === 4?intl.formatMessage(messages.mathnote):intl.formatMessage(messages.note)}</h3>
                <Card>                   
                    <Row>                    
                    <Col sm={12}>
                        <p className="text-brown">{intl.formatMessage(messages.note)}</p>
                        <p>{reference.note}</p>
                    </Col>                    
                    </Row>
                </Card>
                {/*    <Row>
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
                        </Row>*/}                    
                </div>
            
        </>
    );
};

export default ReferenceDetail;