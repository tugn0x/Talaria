import React, { useState } from 'react';
import {Button, Card, CardBody, Row, Col,Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {useIntl} from 'react-intl';
import ReferenceDetail from '../ReferenceDetail'
import SectionTitle from 'components/SectionTitle';
import './style.scss';

const ReferenceRequest = props => {
    console.log('ReferenceRequest', props)
    const {reference, messages,libraryOptionList,deliveryOptionList,libraryOnChange} = props
    const [libdropdownOpen,setLibdropdownOpen] = useState(false);
    const [deliverydropdownOpen,setPickupdropdownOpen] = useState(false);
    const [selectedPickup,setSelectedPickup]=useState(null);

    const libdropdownToggle= () => setLibdropdownOpen(prevState => !prevState);
    const deliverydropdownToggle= () => setPickupdropdownOpen(prevState => !prevState);
    
    const intl = useIntl()

    const showPickupDetails = (pick) => {
        setSelectedPickup(pick)
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
                <Card className="detail-body">
                <ReferenceDetail 
                            messages={messages}
                            reference={reference} 
                            icons={[]}
                />
                </Card>
            </div>
            <div className="library">
                <Card className="detail-body">
                <Row>
                        <Col sm={4}>
                        {libraryOptionList && <Dropdown id="libraryDropDown" isOpen={libdropdownOpen} toggle={libdropdownToggle}>
                            <DropdownToggle caret className="dropdown-toggle">
                                Select Library
                            </DropdownToggle>
                            <DropdownMenu>
                                {libraryOptionList && libraryOptionList.map ( (lib) => 
                                        <DropdownItem key={lib.value} onClick={ () => libraryOnChange(lib.value)}>{lib.name} ({lib.label})</DropdownItem>
                                )}
                            </DropdownMenu>
                            </Dropdown>}
                        </Col>
                        <Col sm={4}>
                        {deliveryOptionList && deliveryOptionList.length>0 && <Dropdown id="deliveryDropDown" isOpen={deliverydropdownOpen} toggle={deliverydropdownToggle}>
                            <DropdownToggle caret className="dropdown-toggle">
                                Select Pickup
                            </DropdownToggle>
                            <DropdownMenu>
                                {deliveryOptionList && deliveryOptionList.map ( (pick) => 
                                        <DropdownItem key={pick.id} onClick={ () => showPickupDetails(pick)}>{pick.name}</DropdownItem>
                                )}
                            </DropdownMenu>
                            </Dropdown>}
                        </Col>
                        <Col sm={4}>
                            {selectedPickup && 
                            <div className="PickupDetail">
                                {selectedPickup.name && <span>Punto di ritiro: {selectedPickup.name}</span>}
                                {selectedPickup.email &&<span>Email: {selectedPickup.email}</span>}
                                {selectedPickup.phone && <span>Phone: {selectedPickup.phone}</span>}
                                {selectedPickup.openinghours && <span>Opening hours: {selectedPickup.openinghours}</span>}
                            
                                {selectedPickup.deliveryable && 
                                <div>
                                    {selectedPickup.deliveryable.data.address && <span>Indirizzo: {selectedPickup.deliveryable.data.address}</span>}
                                    {selectedPickup.deliveryable.data.town && <span>Città: {selectedPickup.deliveryable.data.town}</span>}
                                    {selectedPickup.deliveryable.data.district && <span>Regione: {selectedPickup.deliveryable.data.district}</span>}
                                    {selectedPickup.deliveryable.data.postcode && <span>PostCode: {selectedPickup.deliveryable.data.postcode}</span>}
                                    {selectedPickup.deliveryable.data.state && <span>PostCode: {selectedPickup.deliveryable.data.state}</span>}
                                </div>
                                } 
                            </div>}
                        </Col>
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