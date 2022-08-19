import React, {useState, useEffect, useRef} from 'react';
import {Card, Form as FormContainer, FormGroup, Button, Row} from 'reactstrap';
import {useIntl} from 'react-intl';
import RadioButton from '../Form/RadioButton';
import scrollTo from 'utils/scrollTo';
import Input from '../Form/Input';
import ErrorBox from '../Form/ErrorBox';

import {requiredConditions} from './requiredConditions';

import './style.scss';


//NOTA: a volte il title_part/abstract/note non è editable o lo è solo per parte della lunghezza (limite a 50 car?)
//BUG: quando cambio tipologia dovrei ri-verificare tutti i campi che hanno required dipendente dal tipo-materiale
//     altrimenti il pulsante submit non è in linea con le condizioni!

const ReferenceFormContent = (props) => {
    console.log('ReferenceFormContent', props)
    const {reference, submitCallBack,  
            applyLabels, labelsOptionList, applyGroups, groupsOptionList,
            removeLabel, removeGroup, deleteReference/*,findOA,OALink*/} = props;
    const [formData, setFormData] = useState(() => {        
        if(reference && Object.keys(reference.length > 0)) return {...reference}    
        
        //in any case force to return default
        return {material_type: 1, pubyear: "", authors: "", volume: "", pages: ""}         
        
    })
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
    const [requiredFields, setRequiredFields] = useState(true)
    const [formClasses, setFormClasses] = useState(["reference-form"])
  

    const intl = useIntl();
   
    const handleChange = (value, field_name) =>{
        setFormData({ ...formData, [field_name]: value});
        setRequiredFields(() => requiredConditions(formData));
    } 

    useEffect(() => {
      // setRequiredFields(() => requiredConditions(formData));
      // console.log("change formData: reqfield=",requiredConditions(formData))
      // console.log("CHECK REQUIRED FIELD->disabled submit:",document.querySelectorAll('.form-control:invalid').length>0);
       setIsSubmitDisabled(document.querySelectorAll('.form-control:invalid').length>0)
    }, [formData])

    /*useEffect(() => {
        setIsSubmitDisabled(document.querySelectorAll('.form-control:invalid').length>0)
        //console.log("CHECK REQUIRED FIELD->disabled submit:",document.querySelectorAll('.form-control:invalid').length>0);
        console.log("ReqFields:",requiredFields);
     }, [requiredFields])*/

    useEffect(() => {        
        reference && Object.keys(reference.length > 0) ?  setFormData({...formData, ...reference}) : null
    },[reference])

    useEffect(() => {
        setFormClasses( (state) => [...state, 'was-validated'])
        setIsSubmitDisabled(document.querySelectorAll('.form-control:invalid').length>0);
    },[]) 

    /*useEffect(()=> {
        console.log("UPDATE OA_LINK in form!")
        if(OALink && OALink!="")
            setFormData({ ...formData, 'oa_link': OALink});
    },[OALink])*/

    
    const onSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        if (form.checkValidity() === false) {
            console.log("Dont Send Form")
            const errorTarget = document.querySelectorAll('.was-validated .form-control:invalid')[0]
            scrollTo(errorTarget.offsetParent, true)
            
            return
        } else {
            // Tutto ok invia Form!
            submitCallBack(formData)
            console.log("Send Form", formData)
        }
    }



    return (                
            <FormContainer onSubmit={onSubmit} className={formClasses.join(" ")} noValidate>                
                  <h3>{intl.formatMessage({id: "app.references.materialTypeHead"})}</h3>
                  <Card>
                  <FormGroup className="radio-buttons">
                    <RadioButton 
                        label={intl.formatMessage({id: "app.references.article"})} 
                        checked={formData.material_type === 1 ? true : false}
                        handleChange={(e) =>  e.target.checked ? handleChange(1, 'material_type') : null}
                    />
                    <RadioButton 
                        label={intl.formatMessage({id: "app.references.book"})} 
                        checked={formData.material_type === 2 ? true : false}
                        handleChange={(e) =>  e.target.checked ? handleChange(2, 'material_type') : null}
                        
                    />
                    <RadioButton 
                        label={intl.formatMessage({id: "app.references.thesis"})} 
                        checked={formData.material_type === 3 ? true : false}
                        handleChange={(e) =>  e.target.checked ? handleChange(3, 'material_type') : null}
                        
                    />
                    <RadioButton 
                        label={intl.formatMessage({id: "app.references.cartography"})} 
                        checked={formData.material_type === 4 ? true : false}
                        handleChange={(e) =>  e.target.checked ? handleChange(4, 'material_type') : null}
                        
                    />
                    <RadioButton 
                        label={intl.formatMessage({id: "app.references.manuscript"})} 
                        checked={formData.material_type === 5 ? true : false}
                        handleChange={(e) =>  e.target.checked ? handleChange(5, 'material_type') : null}
                        
                    />
                   {/* a che serve? <input className="form-control" type="radio" name="radio" hidden required /> */}
                    <ErrorBox 
                        className="invalid-feedback" 
                        error={  intl.formatMessage({ id: 'app.global.invalid_field' })}
                    /> 
                </FormGroup>
                </Card>
                <h3>{intl.formatMessage({id: "app.references.titleAuthorsHead"})}</h3>
                <Card>
                    <FormGroup >
                        <Input 
                            label={formData.material_type === 1 ? intl.formatMessage({id: "app.references.pub_title"}) : intl.formatMessage({id: "app.references.title"})}
                            handleChange={(value) => handleChange(value, 'pub_title')}
                            required={true}
                            input={formData.pub_title ? formData.pub_title : ""}
                        />
                    </FormGroup>
                    {(formData.material_type === 1 || formData.material_type === 2 || formData.material_type === 3 || formData.material_type === 5) && 
                    <FormGroup>
                        <Input 
                            label={formData.material_type === 1 ? intl.formatMessage({id: "app.references.part_title"}) : formData.material_type === 2 ? intl.formatMessage({id: "app.references.section"}): intl.formatMessage({id: "app.references.chapter"})}
                            handleChange={(value) => handleChange(value, 'part_title')}
                            input={formData.part_title ? formData.part_title : ""}
                            required={formData.material_type === 1?true:false}
                        />
                    </FormGroup>}
                    {(formData.material_type !== 1 ) && 
                    <FormGroup >
                        <Input 
                            label={intl.formatMessage({id: "app.references.authors"})}
                            handleChange={(value) => handleChange(value, 'authors')}
                            input={formData.authors  ? formData.authors : ""}
                            required={(formData.material_type!==1)?true:false}
                        />
                    </FormGroup>}
                    {(formData.material_type === 1 || formData.material_type === 2) && 
                    <FormGroup >
                        <Input 
                            label={formData.material_type === 1? intl.formatMessage({id: "app.references.authors"}):intl.formatMessage({id: "app.references.part_authors"})}
                            handleChange={(value) => handleChange(value, 'part_authors')}
                            input={formData.part_authors  ? formData.part_authors : ""}
                            required={(formData.material_type===1)?requiredFields:false}
                        />
                    </FormGroup>}
                    {(formData.material_type === 3) && 
                    <FormGroup >
                        <Input 
                            label={intl.formatMessage({id: "app.references.relator"})}
                            handleChange={(value) => handleChange(value, 'relator')}
                            input={formData.relator  ? formData.relator : ""}
                            required={false}
                        />
                    </FormGroup>}
                    {(formData.material_type === 3) && 
                    <FormGroup >
                    <Input 
                        label={intl.formatMessage({id: "app.references.thesis_type"})}
                        handleChange={(value) => handleChange(value, 'thesis_type')}
                        input={formData.thesis_type  ? formData.thesis_type : ""}
                        required={false}
                    />
                    </FormGroup>}
                    {(formData.material_type === 3) && 
                    <FormGroup >
                    <Input 
                        label={intl.formatMessage({id: "app.references.degree_course"})}
                        handleChange={(value) => handleChange(value, 'degree_course')}
                        input={formData.degree_course  ? formData.degree_course : ""}
                        required={false}
                    />
                    </FormGroup>}
                    {(formData.material_type === 1 || formData.material_type === 2 || formData.material_type === 4) && 
                    <FormGroup >
                    <Input 
                        label={formData.material_type === 4? intl.formatMessage({id: "app.references.collection"}):intl.formatMessage({id: "app.references.series_title"})}
                        handleChange={(value) => handleChange(value, 'series_title')}
                        input={formData.series_title  ? formData.series_title : ""}
                        required={false}
                    />
                    </FormGroup>}
                    {(formData.material_type === 4) && 
                    <FormGroup >
                    <Input 
                        label={intl.formatMessage({id: "app.references.geographic_area"})}
                        handleChange={(value) => handleChange(value, 'geographic_area')}
                        input={formData.geographic_area  ? formData.geographic_area : ""}
                        required={false}
                    />
                    </FormGroup>}
                </Card>
                <h3>{intl.formatMessage({id: "app.references.institutionPlaceHead"})}</h3>
                <Card>
                    <Row>
                        <FormGroup className="col-md-3 col-lg-2">
                            <Input 
                                label={intl.formatMessage({id: "app.references.pubyear"})}
                                type="number"
                                handleChange={(value) => handleChange(value, 'pubyear')}
                                input={formData.pubyear ? formData.pubyear : ""}
                                required={formData.material_type===1?requiredFields:false}
                            />
                        </FormGroup>
                        {(formData.material_type === 1 || formData.material_type === 2) && 
                        <FormGroup className="col-md-3 col-lg-2">
                            <Input 
                                label={intl.formatMessage({id: "app.references.volume"})}
                                type="string"
                                handleChange={(value) => handleChange(value, 'volume')}
                                input={formData.volume ? formData.volume : ""}
                                required={formData.material_type===1?requiredFields:false}
                            />
                        </FormGroup>}
                        {(formData.material_type === 1) && 
                        <FormGroup className="col-md-3 col-lg-2">
                            <Input 
                                label={intl.formatMessage({id: "app.references.issue"})}
                                type="string"
                                handleChange={(value) => handleChange(value, 'issue')}
                                input={formData.issue ? formData.issue : ""}
                                required={false}
                            />
                        </FormGroup>}
                        {(formData.material_type !== 4 ) && 
                        <FormGroup className="col-md-4 col-lg-3">
                            <Input 
                                label={intl.formatMessage({id: "app.references.pages"})}
                                type="string"
                                handleChange={(value) => handleChange(value, 'pages')}
                                input={formData.pages ? formData.pages : ""}
                                required={formData.material_type===1?requiredFields:false}
                            />
                        </FormGroup>}
                    </Row>
                    <Row>
                        {formData.material_type != 5 && 
                        <FormGroup className="col-md-4">
                            <Input 
                                label={formData.material_type === 3?intl.formatMessage({id: "app.references.university"}):intl.formatMessage({id: "app.references.publisher"})}
                                handleChange={(value) => handleChange(value, 'publisher')}
                                input={formData.publisher ? formData.publisher : ""}
                                required={formData.material_type===3?true:false}
                            />
                        </FormGroup>}
                        {formData.material_type != 1 &&
                        <FormGroup className="col-md-4">
                            <Input                                 
                                label={intl.formatMessage({id: "app.references.publishing_place"})}
                                handleChange={(value) => handleChange(value, 'publishing_place')}
                                input={formData.publishing_place?formData.publishing_place : ""}
                                required={false}
                            />
                        </FormGroup>}
                    </Row>
                </Card>
                <h3>{intl.formatMessage({id: "app.references.identificationHead"})}</h3>
                <Card>
                    <Row>
                        {(formData.material_type === 2 || formData.material_type === 4 )&& 
                        <FormGroup className="col-sm-3">
                                <Input 
                                    label={intl.formatMessage({id: "app.references.isbn"})}
                                    handleChange={(value) => handleChange(value, "isbn")}
                                    input={formData.isbn ? formData.isbn  : ""}
                                    required={false}
                                />
                        </FormGroup>}
                        {(formData.material_type === 1 || formData.material_type === 2 || formData.material_type === 4 )&& 
                        <FormGroup className="col-sm-3">
                        <Input 
                                    label={intl.formatMessage({id: "app.references.issn"})}
                                    handleChange={(value) => handleChange(value, "issn")}
                                    input={formData.issn ? formData.issn : ""}
                                    required={false}
                                />
                        </FormGroup>}
                        <FormGroup className="col-sm-3">
                            <Input 
                                label={intl.formatMessage({id: "app.references.pmid"})}
                                handleChange={(value) => handleChange(value, 'pmid')}
                                input={formData.pmid ? formData.pmid : ""}
                                required={false}
                            />
                        </FormGroup>      
                        <FormGroup className="col-sm-5">
                            <Input 
                                label={intl.formatMessage({id: "app.references.doi"})}
                                handleChange={(value) => handleChange(value, 'doi')}
                                input={formData.doi ? formData.doi : ""}
                                required={false}
                            />
                        </FormGroup>                       
                    </Row>   
                </Card>
                <h3>{intl.formatMessage({id: "app.references.abstract"})}</h3>
                <Card>
                    <Input 
                        handleChange={(value) => handleChange(value, 'abstract')}
                        input={formData.abstract ? formData.abstract : ""}
                        type="textarea"
                        required={false}
                    />
                    
                </Card>
                <h3>{formData.material_type === 3?intl.formatMessage({id: "app.references.indications"}):formData.material_type === 4?intl.formatMessage({id: "app.references.mathnote"}):intl.formatMessage({id: "app.references.note"})}</h3>
                <Card>
                    <Input 
                        handleChange={(value) => handleChange(value, 'note')}
                        input={formData.note ? formData.note : ""}
                        type="textarea"
                        required={false}
                    />
                </Card>
                <div className="d-flex justify-content-between">
                <Button type="submit" className="mt-0" color="cta" disabled={isSubmitDisabled}>
                    {intl.formatMessage({id: 'app.global.submit'})}
                </Button>
                {reference && reference.id && 
                <Button color="cancel" onClick={() => props.history.goBack() } >
                        {intl.formatMessage({id: 'app.global.cancel'})}
                </Button> 
                }
                </div>
            </FormContainer>        
    );
};

export default ReferenceFormContent;