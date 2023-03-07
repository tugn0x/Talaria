import React from 'react';
import {Card, CardBody, CardTitle, Row, Col} from 'reactstrap';
import {useIntl} from 'react-intl';
import {NavLink} from 'react-router-dom'
import ReferenceDetail from '../ReferenceDetail';
import ButtonBack from 'components/Button/ButtonBack';
import './style.scss';
import '../RequestItem/style.scss';
import RequestStatus from '../RequestStatus';
import SectionTitle from 'components/SectionTitle';

/* NOTE: actually not used anymore */

const RequestDetail = props => {
    console.log('RequestDetail', props)
    const {patronrequest,acceptCost,denyCost} = props

    const intl = useIntl()
    return (
            Object.keys(patronrequest).length>0 && 
            <>
            <div className="features-icons">
                <NavLink to='#' className="btn btn-link">
                    <i className="fa-solid fa-print"></i>
                </NavLink>
                <NavLink to='#' className="btn btn-link">
                    <i className="fa-solid fa-file-export"></i>
                </NavLink>
            </div>
            <Card className="detail-body">      
                <CardBody>
                    <CardTitle>Dati Richiesta</CardTitle>
                    <Row>
                        <Col sm={12}>
                        <RequestStatus 
                            patronrequest={patronrequest}
                            acceptCost={acceptCost}
                            denyCost={denyCost}
                        />
                        </Col>
                    </Row>
                    <Row><Col sm={12}>
                        Richiesto il {patronrequest.request_date}
                        Politica costi: {patronrequest.cost_policy} 
                    </Col>
                    </Row>
                    <Row><Col sm={12}>
                        Annullata il {patronrequest.cancel_date}
                        Evasa/Inevasa il  {patronrequest.fulfill_date}                        
                    </Col>
                    </Row>
                    <Row><Col sm={12}>
                    Note per la biblioteca: {patronrequest.forlibrary_note}
                    Note dalla biblioteca: {patronrequest.fromlibrary_note}
                    </Col>
                    </Row>
                </CardBody>
            </Card>
            <ReferenceDetail                 
                reference={patronrequest.reference.data} 
                icons={[]}
            />
            <Card className="detail-library">
                <CardBody>
                    <CardTitle>Biblioteca</CardTitle>
                    <Row>
                        <Col sm={12}>
                            Name: {patronrequest.library.data.name} - ({patronrequest.library_label?patronrequest.library_label.data.label:patronrequest.library.name})
                            Phone: {patronrequest.library.data.phone} | Fax: {patronrequest.library.data.fax}                            
                            DD Service Phone: {patronrequest.library.data.dd_phone} | ILL Service Phone: {patronrequest.library.data.ill_phone}                       
                            DD Service Mail: {patronrequest.library.data.dd_mail} | ILL Mail: {patronrequest.library.data.ill_mail}                            
                            Site <a target="_blank" href={patronrequest.library.data.url}>{patronrequest.library.data.url}</a>
                            Opac URL: <a target="_blank" href={patronrequest.library.data.opac}>{patronrequest.library.data.opac}</a>
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
                            {patronrequest.delivery.data.address && <span>Indirizzo: {patronrequest.delivery.data.address}</span>}
                            {patronrequest.delivery.data.town && <span>Città: {patronrequest.delivery.data.town}</span>}
                            {patronrequest.delivery.data.district && <span>Regione: {patronrequest.delivery.data.district}</span>}
                            {patronrequest.delivery.data.postcode && <span>PostCode: {patronrequest.delivery.data.postcode}</span>}
                            {patronrequest.delivery.data.state && <span>PostCode: {patronrequest.delivery.data.state}</span>}
                            </div>                                                        
                        </Col>
                    </Row>
                </CardBody>
            </Card>}
            </>        
    );
};

export default RequestDetail;