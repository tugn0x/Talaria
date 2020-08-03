import React from 'react';
import {Card, CardBody, CardTitle, Row, Col} from 'reactstrap';
import {useIntl} from 'react-intl';
import {NavLink} from 'react-router-dom'
import ButtonBack from 'components/Button/ButtonBack';
import './style.scss';
import '../RequestItem/style.scss';

const RequestDetail = props => {
    console.log('RequestDetail', props)
    const {patronrequest, messages,referenceMessages} = props
    
    const statusIcon = (status_key) => {
        return "statusIcon " + status_key
    }

    const intl = useIntl()
    return (
        <div className="detail request">
            {
                Object.keys(patronrequest).length>0 && 
            <>
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
            </div>
            <Card className="detail-body">      
                <CardBody>
                    <CardTitle>Dati Richiesta</CardTitle>
                    <Row><Col sm={12}>
                        <span className={statusIcon(patronrequest.status_key)}></span> {intl.formatMessage(messages[patronrequest.status_key])}  
                        Archiviata: {patronrequest.archived}
                    </Col>                        
                    </Row>
                    <Row><Col sm={12}>
                        Richiesto il {patronrequest.request_date}
                        Politica costi: {patronrequest.cost_policy} 
                    </Col>
                    </Row>
                    <Row><Col sm={12}>
                        Richiesta cancellazione: {patronrequest.cancel_request_date}
                        Annullato il {patronrequest.cancel_date}
                        Evasa/Inevasa il  {patronrequest.fullfill_date}
                    </Col>
                    </Row>
                    <Row><Col sm={12}>
                    Note per la biblioteca: {patronrequest.forlibrary_note}
                    Note dalla biblioteca: {patronrequest.fromlibrary_note}
                    </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                        {patronrequest.reference.data.groups && 
                        <ul id="referenceGroups" className="referenceGroups">    
                            {patronrequest.reference.data.groups.data.map( el => 
                                <li key={el.id} className="referenceGroup">{el.name}</li>
                                ) 
                            }
                        </ul>
                        }
                        {patronrequest.reference.data.labels && 
                        <ul id="referenceLabels" className="referenceLabels">    
                            {patronrequest.reference.data.labels.data.map( el => 
                                <li key={el.id} className="referenceLabel">{el.name}</li>
                                ) 
                            }
                        </ul>}
                       </Col>
                    </Row>
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
            <Card className="detail-library">
                <CardBody>
                    <CardTitle>Biblioteca</CardTitle>
                    <Row>
                        <Col sm={12}>
                            Name: {patronrequest.library.data.name} - ({patronrequest.library_label.data.label})
                            Phone: {patronrequest.library.data.phone} | Fax: {patronrequest.library.data.fax}                            
                            DD Service Phone: {patronrequest.library.data.dd_phone} | ILL Service Phone: {patronrequest.library.data.ill_phone}                       
                            DD Service Mail: {patronrequest.library.data.dd_mail} | ILL Mail: {patronrequest.library.data.ill_mail}                            
                            Site <a target="_new" href={patronrequest.library.data.url}>{patronrequest.library.data.url}</a>
                            Opac URL: <a target="_new" href={patronrequest.library.data.opac}>{patronrequest.library.data.opac}</a>
                        </Col>
                    </Row>

                </CardBody>
            </Card>
            {patronrequest.delivery && <Card className="detail-delivery">
                <CardBody>
                    <CardTitle>Delivery Service</CardTitle>
                    <Row>
                        <Col sm={12}>
                            <div>
                            {patronrequest.delivery.data.name && <span>Punto di ritiro: {patronrequest.delivery.data.name}</span>}
                            {patronrequest.delivery.data.email &&<span>Email: {patronrequest.delivery.data.email}</span>}
                            {patronrequest.delivery.data.phone && <span>Phone: {patronrequest.delivery.data.phone}</span>}
                            {patronrequest.delivery.data.openinghours && <span>Opening hours: {patronrequest.delivery.data.openinghours}</span>}
                            </div>
                            {patronrequest.delivery.data.deliveryable && 
                            <div>
                                {patronrequest.delivery.data.deliveryable.data.address && <span>Indirizzo: {patronrequest.delivery.data.deliveryable.data.address}</span>}
                                {patronrequest.delivery.data.deliveryable.data.town && <span>Città: {patronrequest.delivery.data.deliveryable.data.town}</span>}
                                {patronrequest.delivery.data.deliveryable.data.district && <span>Regione: {patronrequest.delivery.data.deliveryable.data.district}</span>}
                                {patronrequest.delivery.data.deliveryable.data.postcode && <span>PostCode: {patronrequest.delivery.data.deliveryable.data.postcode}</span>}
                                {patronrequest.delivery.data.deliveryable.data.state && <span>PostCode: {patronrequest.delivery.data.deliveryable.data.state}</span>}
                            </div>
                            } 
                            
                        </Col>
                    </Row>
                </CardBody>
            </Card>}
            </>}
        </div>
    );
};

export default RequestDetail;