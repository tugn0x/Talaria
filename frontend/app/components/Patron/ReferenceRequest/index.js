import React, { useState,useEffect } from 'react';
import {Button, Card, CardBody, Row, Col, Input} from 'reactstrap';
import {useIntl} from 'react-intl';
import ReferenceDetail from '../ReferenceDetail'
import SectionTitle from 'components/SectionTitle';
import './style.scss';
import RequestItem from '../RequestItem';
import ErrorBox from '../../Form/ErrorBox';

const ReferenceRequest = props => {
    console.log('ReferenceRequest', props)
    const {reference, messages,libraryOptionList,deliveryOptionList,libraryOnChange,submitCallBack} = props

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
    const [formData, setFormData] = useState({
        'delivery': {},
        'library':{},
        'reference': {},
        'cost_policy': '2'
    })


    useEffect(() => {
        handleChange(reference,'reference')
     }, [reference])
 
    
    const intl = useIntl()

    const showPickupDetails = (evt) => {
       evt.preventDefault();
       let p={};
        if(evt.target.value!='')
            p=deliveryOptionList.find(x => x.id == evt.target.value );
       
       handleChange(p,'delivery');     
     }

    

     const handleChangeLibrary = (evt) => {
        evt.preventDefault();
        let l={};
        if(evt.target.value!='')
            l=libraryOptionList.find(x => x.library_id == evt.target.value).library.data;
        console.log(l)
        handleChange(l,'library');
        libraryOnChange(l)     
        
     }

     useEffect(() => {
        console.log("FORMDATA:", formData)
        deliveryOptionList.length === 0 ? setIsSubmitDisabled(!(formData.library && formData.library.id)) :
        setIsSubmitDisabled(!(formData.library && formData.library.id && formData.delivery && formData.delivery.id))
     }, [formData])
 


    
    /* HANDLE CHANGE Generico */
    const handleChange = (value, field_name) =>{
        console.log("handlechange FORMDATA:",field_name,value)
        setFormData({ ...formData, [field_name]: value   }); 
    } 

    
    const onSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        form.classList.add('was-validated');
        
        if (form.checkValidity() === false) {
            console.log("Dont Send Form")
            // Ci sono ERRORI nella VALIDAZIONE!
            // Scroll sul campo che non e' stato fillato
            // const errorTarget = document.querySelectorAll('.was-validated .form-control:invalid')[0]
            // scrollTo(errorTarget.offsetParent, true)
            alert("ERRORRRR");
            // return
        } else {
            let dataToSend = {
                'borrowing_library_id': formData.library.id,
                'delivery_id':formData.delivery.id,
                'reference_id':formData.reference.id,
                'cost_policy':parseInt(formData.cost_policy),
                'forlibrary_note':formData.forlibrary_note
            }

            // Tutto ok invia Form!
            submitCallBack(dataToSend)
            console.log("Send Form", dataToSend)
        }
       
        return
    }


    return (
        <div className="detail">
            <SectionTitle 
                title={messages.headerRequest}
                back={true}
            />
            <div className="previusRequests">
                Precedenti richieste:<br/>
                {reference.patronddrequests.data && reference.patronddrequests.data.map ( (req) =>
                    <RequestItem 
                        data={req} 
                        editPath={'/patron/requests/:id?/:edit?'}
                    />  
                )}
            </div>
            <div className="reference">
                <ReferenceDetail 
                    messages={messages}
                    reference={reference} 
                    icons={[]}
                />
            </div>
            <form onSubmit={onSubmit} noValidate className="">
            <div className="library">
                <Card className="detail-body">
                <Row>
                        <Col sm={6}>
                            {libraryOptionList && 
                                <>  
                                    <span className="text-brown">Library:</span> 
                                    <Input type="select" name="libraryOptionList" required id="libraryOptionList" value={formData.library?formData.library.id:''/*selectedLibrary?selectedLibrary.id:''*/} onChange={ (e) => handleChangeLibrary(e)}>
                                        <option value='' key=''>Select</option>
                                            {libraryOptionList && libraryOptionList.map ( (lib) => 
                                                    <option value={lib.library_id} key={lib.id}>{lib.label}</option>
                                            )}
                                    </Input>
                                    <ErrorBox className="invalid-feedback" error={intl.formatMessage({id: "app.global.invalid_select"})} />
                                </>}   
                            {formData.library.id && <div className="libraryDetail">
                                Name: {formData.library.name} <br/>
                                Cost: {formData.library.dd_user_cost} € <br/>
                                Altri costi (FN):<select id="cost_policy" value={formData["cost_policy"]} onChange={ (evt) => handleChange(evt.target.value,'cost_policy')}>
                                    <option value="0">Rifiuto ogni costo</option>
                                    <option value="1">Accetto ogni costo</option>
                                    <option value="2">Voglio essere informato</option>
                                </select><br/>
                                Note per la biblioteca
                                <textarea id="forlibrary_note" value={formData["forlibrary_note"]} onChange={ (evt) => handleChange(evt.target.value,'forlibrary_note')}></textarea>

                            </div>}
                        </Col>
                        <Col sm={6}>
                            {deliveryOptionList && deliveryOptionList.length>0 && 
                            <><span className="text-brown">Pickup:</span> 
                            <select id="deliveryOptionList" required value={formData.delivery?formData.delivery.id:''} onChange={ (e) => showPickupDetails(e)}>
                                <option value='' key=''>Select</option>
                                {deliveryOptionList && deliveryOptionList.map ( (pick) => 
                                        <option value={pick.id} key={pick.id}>{pick.name}</option>
                                )}
                            </select></>}
                            {formData.delivery.id && 
                            <div className="PickupDetail">
                                <span className="text-brown">Detail:</span><br/>
                                {formData.delivery.name && <span>Punto di ritiro: {formData.delivery.name}</span>}
                                {formData.delivery.email &&<span>Email: {formData.delivery.email}</span>}
                                {formData.delivery.phone && <span>Phone: {formData.delivery.phone}</span>}
                                {formData.delivery.openinghours && <span>Opening hours: {formData.delivery.openinghours}</span>}
                            
                                {formData.delivery.deliveryable && 
                                <div>
                                    {formData.delivery.deliveryable.data.address && <span>Indirizzo: {formData.delivery.deliveryable.data.address}</span>}
                                    {formData.delivery.deliveryable.data.town && <span>Città: {formData.delivery.deliveryable.data.town}</span>}
                                    {formData.delivery.deliveryable.data.district && <span>Regione: {formData.delivery.deliveryable.data.district}</span>}
                                    {formData.delivery.deliveryable.data.postcode && <span>PostCode: {formData.delivery.deliveryable.data.postcode}</span>}
                                    {formData.delivery.deliveryable.data.state && <span>PostCode: {formData.delivery.deliveryable.data.state}</span>}
                                </div>
                                } 
                            </div>}
                        </Col>
                </Row>
                </Card>
                <div className="d-flex justify-content-between">
                    <Button type="submit" className="mt-0" color="cta" disabled={isSubmitDisabled}>
                        {intl.formatMessage({id: 'app.global.submit'})}
                    </Button>
                    <Button color="cancel" onClick={() => props.history.goBack() } >
                        {intl.formatMessage({id: 'app.global.cancel'})}
                    </Button> 
                </div>
            </div>
            </form>
        </div>
    );
};

export default ReferenceRequest;