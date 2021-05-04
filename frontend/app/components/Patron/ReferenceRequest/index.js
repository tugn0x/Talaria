import React, { useState,useEffect } from 'react';
import {Button, Card, CardBody, Row, Col, Input} from 'reactstrap';
import {useIntl} from 'react-intl';
import ReferenceDetail from '../ReferenceDetail'
import SectionTitle from 'components/SectionTitle';
import './style.scss';
import messages from './messages'
import RequestItem from '../RequestItem';
import ErrorMsg from 'components/ErrorMsg';
import ErrorBox from '../../Form/ErrorBox';

const ReferenceRequest = props => {
    console.log('ReferenceRequest', props)
    const {reference, libraryOptionList,deliveryOptionList,libraryOnChange,submitCallBack} = props

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
    const [formData, setFormData] = useState({
        'delivery': {},
        'library':{},
        'reference': reference,
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
        {
            l=libraryOptionList.find(x => x.library_id == evt.target.value);
            if(l && Object.keys(l).length>0)
                l=l.library.data
        }
                
        handleChange(l,'library');   
        libraryOnChange(l)     
        
     }

     useEffect(() => {       
        setIsSubmitDisabled(!(formData.library && formData.library.id && formData.delivery && formData.delivery.id))        
     }, [formData])
 


    
    /* HANDLE CHANGE Generico */
    const handleChange = (value, field_name) =>{
       // console.log("handlechange FORMDATA:",field_name,value)
        setFormData({ ...formData, [field_name]: value   }); 
    } 

    const canRequest = (ref) => {
        return (ref.active_patronrequests==0)
     }

     //NOTA: non visualizzo la tipologia del delivery quindi non so se è un desk o una biblio
     //ma forse avrebbe senso farlo
     const displayDeliveryable = (deliveryable) => {         
         return (
         <div>    
            {deliveryable.data.name && <div><i className="fas fa-luggage-cart"></i> {deliveryable.data.name}</div>}
            {deliveryable.data.address && <div><i className="fas fa-map-marker"></i> {deliveryable.data.address} {deliveryable.data.postcode} {deliveryable.data.town} {deliveryable.data.district} {deliveryable.data.state}</div>}            
        </div>
         )
     }

    
    const onSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        // form.classList.add('was-validated');
        
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

    useEffect(() => {        
        setFormData({...formData,'delivery':{} });        
    }, [deliveryOptionList])

    useEffect(() => {
       //console.log("UEEE libraryOptionsList",libraryOptionList)
       if(libraryOptionList && libraryOptionList.length>0)
       {
            let defaultLib=libraryOptionList.find(x => x.preferred == 1);            
            if(defaultLib && Object.keys(defaultLib).length>0)
            {
                handleChange(defaultLib.library.data,'library');
                libraryOnChange(defaultLib.library.data) 
            }
        }
    }, [libraryOptionList])


    return (
        <div className="detail">
            <SectionTitle 
                title={messages.headerRequest}
                back={true}
            />            
            {reference.patronddrequests && reference.patronddrequests.data && reference.patronddrequests.data.length>0 &&
            <>
            <h2>{intl.formatMessage({id: "app.components.ReferenceRequest.prevRequests"})}</h2>
            {!canRequest(reference) && <ErrorMsg cssclass="alert-warning" message={intl.formatMessage({id: "app.components.ReferenceRequest.cannotRequestError"})}/>}
            <div className="previusRequests card">                
                {reference.patronddrequests.data.map ( (req) =>
                    <RequestItem 
                        key={`request-${req.id}`}
                        data={req} 
                        /*editPath={'/patron/requests/:id?/:edit?'}*/
                    />  
                )}
            </div>
            </>
            }     
            {canRequest(reference) && 
            <form onSubmit={onSubmit} className="was-validated" noValidate>
            <h2>{intl.formatMessage({id: "app.components.ReferenceRequest.newRequest"})}</h2>
                <Card className="detail-body">
                <Row>
                        <Col sm={6}>
                            {
                                <>  
                                    <span className="text-brown">{intl.formatMessage({id: "app.global.library"})}</span> 
                                    <Input className="libraryOptionList" type="select" name="libraryOptionList" required id="libraryOptionList" value={formData.library?formData.library.id:''/*selectedLibrary?selectedLibrary.id:''*/} onChange={ (e) => handleChangeLibrary(e)}>                                        
                                            <option value='' key=''>---</option>
                                            {libraryOptionList && libraryOptionList.map ( (lib) => 
                                                    <option className={lib.preferred && lib.preferred==1?'preferred':''} value={lib.library_id} key={lib.id}>{lib.label}</option>
                                            )}
                                    </Input>
                                    <ErrorBox className="invalid-feedback" error={intl.formatMessage({id: "app.global.invalid_select"})} />
                                </>}   
                            {formData.library.id && <div className="libraryDetail">
                                <span><i className="fas fa-landmark"></i></span> {formData.library.name} <br/>
                                {intl.formatMessage({id: "app.libraries.dd_user_cost"})}: {formData.library.dd_user_cost} &euro; <br/>                                
                                {intl.formatMessage({id: "app.requests.extraCosts"})}:<select id="cost_policy" value={formData["cost_policy"]} onChange={ (evt) => handleChange(evt.target.value,'cost_policy')}>
                                    <option value="0">{intl.formatMessage({id: "app.requests.denyAnyExtraCost"})}</option>
                                    <option value="1">{intl.formatMessage({id: "app.requests.acceptAnyExtraCost"})}</option>
                                    <option value="2">{intl.formatMessage({id: "app.requests.toBeInformedAboutExtraCost"})}</option>
                                </select><br/>
                                {intl.formatMessage({id: "app.requests.forLibraryNotes"})}
                                <textarea id="forlibrary_note" value={formData["forlibrary_note"]} onChange={ (evt) => handleChange(evt.target.value,'forlibrary_note')}></textarea>

                            </div>}
                        </Col>
                        <Col sm={6}>
                            {deliveryOptionList && deliveryOptionList.length>0 && 
                                <>
                                    <span className="text-brown">{intl.formatMessage({id: "app.global.pickup"})}</span> 
                                    <Input type="select" name="deliveryOptionList" id="deliveryOptionList" required value={formData.delivery?formData.delivery.id:''} onChange={ (e) => showPickupDetails(e)}>
                                        <option value='' key=''>---</option>
                                        {deliveryOptionList && deliveryOptionList.map ( (pick) => 
                                                <option value={pick.id} key={pick.id}>{pick.name}</option>
                                        )}
                                    </Input>
                                    <ErrorBox className="invalid-feedback" error={intl.formatMessage({id: "app.global.invalid_select"})} />
                                </>
                            }
                            {formData.delivery.id && 
                            <div className="PickupDetail">                                
                                {formData.delivery.deliveryable && displayDeliveryable(formData.delivery.deliveryable)} 
                                {formData.delivery.email &&<div><i className="fas fa-envelope"></i> {formData.delivery.email}</div>}
                                {formData.delivery.phone && <div><i className="fas fa-phone"></i> {formData.delivery.phone}</div>}
                                {formData.delivery.openinghours && <div><i className="far fa-clock"></i> {formData.delivery.openinghours}</div>}                                                            
                            </div>}
                        </Col>
                </Row>                
                <div className="d-flex justify-content-between">
                    <Button type="submit" className="mt-0" color="cta" disabled={isSubmitDisabled}>
                        {intl.formatMessage({id: 'app.global.request'})}
                    </Button>
                    <Button color="cancel" onClick={() => props.history.goBack() } >
                        {intl.formatMessage({id: 'app.global.cancel'})}
                    </Button> 
                </div>
                </Card>            
            </form>
            }       
            <h2>{intl.formatMessage({id: 'app.containers.ReferencePage.headerDetail'})}</h2>
            <div className="reference">
                <ReferenceDetail                     
                    reference={reference} 
                    icons={[]}
                />
            </div>            
        </div>
    );
};

export default ReferenceRequest;