import React, { useState } from 'react';
import {Button, Card, CardBody, Row, Col} from 'reactstrap';
import {useIntl} from 'react-intl';
import ReferenceDetail from '../ReferenceDetail'
import SectionTitle from 'components/SectionTitle';
import './style.scss';

const ReferenceRequest = props => {
    console.log('ReferenceRequest', props)
    const {reference, messages,selectedLibrary,libraryOptionList,selectedDelivery,deliveryOptionList,libraryOnChange,deliveryOnChange,onSubmitRequest} = props

    
    const intl = useIntl()

    const showPickupDetails = (evt) => {
       evt.preventDefault();
       let p=null;
        if(evt.target.value!='')
            p=deliveryOptionList.find(x => x.id == evt.target.value );
        
       deliveryOnChange(p) 
     }

    

     const handleChangeLibrary = (evt) => {
        evt.preventDefault();
        let l=null;
        if(evt.target.value!='')
            l=libraryOptionList.find(x => x.library_id == evt.target.value).library.data;
       
        libraryOnChange(l)  
     }


    return (
        <div className="detail">
            <SectionTitle 
                title={messages.headerRequest}
                back={true}
            />
            <div>
                * check richieste già effettuate o in corso
            </div>
            <div className="reference">
                <ReferenceDetail 
                            messages={messages}
                            reference={reference} 
                            icons={[]}
                />
            </div>
            <div className="library">
                <form onSubmit={onSubmitRequest}>
                <Card className="detail-body">
                <Row>
                        <Col sm={6}>
                            {libraryOptionList && <><span className="text-brown">Library:</span> 
                            <select id="libraryOptionList" value={selectedLibrary?selectedLibrary.id:''} onChange={ (e) => handleChangeLibrary(e)}>
                                <option value='' key=''>Select</option>
                                {libraryOptionList && libraryOptionList.map ( (lib) => 
                                        <option value={lib.library_id} key={lib.library_id}>{lib.label}</option>
                                )}
                            </select></>}   
                            {selectedLibrary && <div className="libraryDetail">
                                Name: {selectedLibrary.name}
                                Cost: {selectedLibrary.dd_user_cost} €
                            </div>}
                        </Col>
                        <Col sm={6}>
                            {deliveryOptionList && deliveryOptionList.length>0 && 
                            <><span className="text-brown">Pickup:</span> 
                            <select id="deliveryOptionList" value={selectedDelivery?selectedDelivery.id:''} onChange={ (e) => showPickupDetails(e)}>
                                <option value='' key=''>Select</option>
                                {deliveryOptionList && deliveryOptionList.map ( (pick) => 
                                        <option value={pick.id} key={pick.id}>{pick.name}</option>
                                )}
                            </select></>}
                            {selectedDelivery && 
                            <div className="PickupDetail">
                                <span className="text-brown">Detail:</span><br/>
                                {selectedDelivery.name && <span>Punto di ritiro: {selectedDelivery.name}</span>}
                                {selectedDelivery.email &&<span>Email: {selectedDelivery.email}</span>}
                                {selectedDelivery.phone && <span>Phone: {selectedDelivery.phone}</span>}
                                {selectedDelivery.openinghours && <span>Opening hours: {selectedDelivery.openinghours}</span>}
                            
                                {selectedDelivery.deliveryable && 
                                <div>
                                    {selectedDelivery.deliveryable.data.address && <span>Indirizzo: {selectedDelivery.deliveryable.data.address}</span>}
                                    {selectedDelivery.deliveryable.data.town && <span>Città: {selectedDelivery.deliveryable.data.town}</span>}
                                    {selectedDelivery.deliveryable.data.district && <span>Regione: {selectedDelivery.deliveryable.data.district}</span>}
                                    {selectedDelivery.deliveryable.data.postcode && <span>PostCode: {selectedDelivery.deliveryable.data.postcode}</span>}
                                    {selectedDelivery.deliveryable.data.state && <span>PostCode: {selectedDelivery.deliveryable.data.state}</span>}
                                </div>
                                } 
                            </div>}
                        </Col>
                </Row>
                </Card>
                <Button type="submit" className="btn-cta">
                    {intl.formatMessage({id: 'app.global.submit'})}
                </Button>
                </form>
            </div>
           
        </div>
    );
};

export default ReferenceRequest;