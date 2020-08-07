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

    const [deliveryDetail,setDeliveryDetail]=useState(null);

    const showPickupDetails = (evt) => {
        evt.preventDefault();
       let p=null;
        if(evt.target.value!='')
            p=deliveryOptionList.find(x => x.id == evt.target.value );
        
        setDeliveryDetail(p);
       deliveryOnChange(evt.target.value) 
     }

     const handleChangeLibrary = (evt) => {
        evt.preventDefault();
       // setSelectedLibrary(evt.target.value)
        libraryOnChange(evt.target.value)  
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
                            <select id="libraryOptionList" value={selectedLibrary} onChange={ (e) => handleChangeLibrary(e)}>
                                <option value='' key=''>Select</option>
                                {libraryOptionList && libraryOptionList.map ( (lib) => 
                                        <option value={lib.value} key={lib.value}>{lib.label}</option>
                                )}
                            </select></>}   
                        </Col>
                        <Col sm={6}>
                            {deliveryOptionList && deliveryOptionList.length>0 && 
                            <><span className="text-brown">Pickup:</span> 
                            <select id="deliveryOptionList" value={selectedDelivery} onChange={ (e) => showPickupDetails(e)}>
                                <option value='' key=''>Select</option>
                                {deliveryOptionList && deliveryOptionList.map ( (pick) => 
                                        <option value={pick.id} key={pick.id}>{pick.name}</option>
                                )}
                            </select></>}
                            {selectedDelivery && 
                            <div className="PickupDetail">
                                <span className="text-brown">Detail:</span><br/>
                                {deliveryDetail.name && <span>Punto di ritiro: {deliveryDetail.name}</span>}
                                {deliveryDetail.email &&<span>Email: {deliveryDetail.email}</span>}
                                {deliveryDetail.phone && <span>Phone: {deliveryDetail.phone}</span>}
                                {deliveryDetail.openinghours && <span>Opening hours: {deliveryDetail.openinghours}</span>}
                            
                                {deliveryDetail.deliveryable && 
                                <div>
                                    {deliveryDetail.deliveryable.data.address && <span>Indirizzo: {deliveryDetail.deliveryable.data.address}</span>}
                                    {deliveryDetail.deliveryable.data.town && <span>Città: {deliveryDetail.deliveryable.data.town}</span>}
                                    {deliveryDetail.deliveryable.data.district && <span>Regione: {deliveryDetail.deliveryable.data.district}</span>}
                                    {deliveryDetail.deliveryable.data.postcode && <span>PostCode: {deliveryDetail.deliveryable.data.postcode}</span>}
                                    {deliveryDetail.deliveryable.data.state && <span>PostCode: {deliveryDetail.deliveryable.data.state}</span>}
                                </div>
                                } 
                            </div>}
                        </Col>
                </Row>
                <p>Service note and cost</p>
                <p>Cost Policy ...</p>
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