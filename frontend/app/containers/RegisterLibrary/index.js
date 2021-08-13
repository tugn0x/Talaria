import React, {useState, useEffect} from 'react'
import Navigation from './Navigation'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {institutionsOptionListSelector,
    countriesOptionListSelector, librarySubjectOptionListSelector, projectsOptionListSelector,institutionsTypeOptionListSelector,
    placesSelector, 
    institutionsByTypeCountryOptionListSelector, libraryProjectsOptionListSelector} from './selectors';
import wizardMessages from './messages'
import globalMessages from 'utils/globalMessages';
import messages from 'components/Admin/LibraryForm/messages';
import {fields, totalSteps, setNewSteps} from './fields'
import { requestGetInstitutionsOptionList, requestGetCountriesOptionList,
    requestLibrarySubjectOptionList, requestPostPublicLibrary, requestGetProjectsOptionList, requestGetInstitutionsByTypeByCountryOptionList,
    requestGetInstitutionTypeOptionList, requestGetInstitutionCountry,requestGetlibraryProjectsOptionList } from "containers/Admin/actions"
import './style.scss'
import {Button,Row, Col} from 'reactstrap'
import {useIntl} from 'react-intl'
import {CustomForm, BasePage} from 'components'
import {requestSearchPlacesByText} from '../Admin/actions';


const RegisterLibrary = (props) => {
    console.log('RegisterLibrary', props)
    let [institutionPresent, setInstitutionPresent] = useState(false)
    const intl = useIntl()
    const {dispatch} = props
    const [data, setData] = useState({})
    let [currentStep, setCurrentStep] = useState(1)
    const [currentFields, setCurrentFields] = useState({})
    const [steps, setSteps] = useState(setNewSteps)
    const [longtitude, setLongtitude] = useState(1);
    const [latitude, setLatitude] = useState(1);

    const [countryid, setCountryid] = useState(0);
    const [institutiontypeid, setInstitutiontypeid] = useState(0);
    const projectsarrname = [];
  
    // Fai le chiamate per le option list
    useEffect(() => {
        dispatch(requestGetCountriesOptionList())
        //dispatch(requestLibrarySubjectOptionList())
        dispatch(requestGetInstitutionTypeOptionList())
        dispatch(requestGetlibraryProjectsOptionList())
        //dispatch(requestGetLibrary(1,('departments,titles')))    
        //dispatch(requestGetProjectsOptionList())
    },[])

    // Filtra i CAMPI / Fields da mostrare a seconda dello step in cui ti trovi
    useEffect(() => {
        let Fields = {}
        Object.keys(fields)
            .filter(key => fields[key].group === `step_${currentStep}` )
            .map(key =>  Fields = {[key]: fields[key], ...Fields})
        setCurrentFields(Fields)
    }, [currentStep])
    
    useEffect(()=> {
        Object.keys(props.libraryProjectsOptionList).forEach(key => 
            projectsarrname.push(props.libraryProjectsOptionList[key].value))
    })

    // Cambia Step
    const onChangeStep = (formData, newStep) => {
        setData({...data, ...formData})
        setCurrentStep(parseInt(newStep))
        setSteps({...steps, [parseInt(newStep)]: {active: true} })
    }
    
    // Aggiorna dati nei campi *handle change*
    const onChangeData = (field_name, value) => {

        if (field_name === "institution_type_id")
        {
            setInstitutiontypeid(value.value);
            setInstitutiontypeid((institutiontypeid) => {
                console.log("institution type id: " + institutiontypeid); 
                fields.suggested_institution_name.hidden = true;
                return institutiontypeid;
              });
        }

        if (field_name === "int_country_id")
        {
            setCountryid(value.value);
            setCountryid((countryid) => {
            console.log("Country id: " + countryid); 
            fields.suggested_institution_name.hidden = true;
                if (countryid!==0 && institutiontypeid!==0)
                {
                    dispatch(requestGetInstitutionsByTypeByCountryOptionList(null,countryid,institutiontypeid));
                    setInstitutionPresent(true);
                }
                return countryid;
            });
        }

        if (field_name === "institution_id" && value.value === 0)
            fields.suggested_institution_name.hidden = false;
    
        if (field_name === "institution_id" && value.value !== 0)
            fields.suggested_institution_name.hidden = true;

            
        setData({...data, [field_name]: value})
    }

    const showlibraryposition = (position) => {
        if (position.lon!=null && position.lat!=null)
        {
            console.log("lon:" + position.lon + " lat: " + position.lat)
            setLongtitude(position.lon);
            setLatitude(position.lat);
            setData({...data, "lon": position.lon,"lat": position.lat })
        }
    }

    const hideComponent = (field_name, value) => {
        if (fields.opac.hidden===false)
        {
            fields.opac.required = false;
            fields.subject_id.required = false;
            
            fields.opac.hidden=true;
            fields.subject_id.hidden=true;
            
            fields.showfullProfile.label="Click here"
        }
        else
        {            
            fields.subject_id.required = true;
            fields.opac.required = true;
            
            fields.opac.hidden=false;
            fields.subject_id.hidden=false;
            
            fields.showfullProfile.label="Switch to Basic Library"
            dispatch(requestLibrarySubjectOptionList())
        }
        setData({...data, [field_name]: value})
    }

    // Check validation on change input
    const checkValidation = (validation) => {
     
        if(!validation){
            let objSteps = {}
            Object.keys(steps).map(key => {
                objSteps = {...objSteps, [key]: {active: key > currentStep ?  false : true } }
            })
            setSteps(objSteps)
        }  
    }

    return (
        <BasePage {...props} routes={[]} messages={messages} headermenu={false}>
            <h2>{intl.formatMessage(wizardMessages.header)}</h2>
            <br></br>
            <Navigation 
                step={currentStep} 
                totalSteps={totalSteps}
                steps={steps}
                messages={wizardMessages}
                changeStep={(newStep) => onChangeStep({}, newStep) }/> 
            {/* CARICA TUTTI GLI STEP DEL FORM SECONDO I FIELDS FILTRATI per STEP */}
            {Object.keys(currentFields).length > 0 && 
             currentStep <= totalSteps - 1 &&
                (<CustomForm 
                    submitCallBack={(formData) => onChangeStep(formData, totalSteps > currentStep ? currentStep+1 : currentStep )} 
                    requestData={data ? data : null}
                    onChangeData={(field_name, value) => onChangeData(field_name, value)}
                    fields={currentFields}
                    title={intl.formatMessage(wizardMessages[`step_${currentStep}`])}
                    submitText={intl.formatMessage(globalMessages.continue)}
                    className="wizard-form"
                    institution_type_id = {props.institutionsTypesOptionList}
                    country_id={props.countriesOptionList}
                    int_country_id = {props.countriesOptionList}
                    institution_id={props.institutionsByTypeCountryOptionList}
                    subject_id={props.librarySubjectOptionList}
                    project_id = {props.libraryProjectsOptionList}
                    onClickData={hideComponent}
                    onPlacesSearch={(search)=>dispatch(requestSearchPlacesByText(search))}
                    places={props.places}
                    placesFreeSearchPlaceholder={intl.formatMessage(wizardMessages.placesFreeSearchPlaceholder)}
                    getMarkers={(pos)=>showlibraryposition(pos)}
                    // markers={props.libraryList}
                    onMarkerClick={console.log("onMarkerClick")}
                    // markerPopupComponent={(marker,chooseMarkerFromMap)=>
                    //   <div className="libraryPopup">
                    //     <div className="card-body">
                    //       <h5 className="card-title">{marker.name}</h5>
                    //       <h6 className="card-subtitle mb-2 text-muted">{marker.address}</h6>
                    //       <NavLink className="btn btn-info" to={"/public/library/"+marker.id}>Library detail</NavLink>
                    //       <NavLink className="btn btn-primary" to="#" onClick={()=>chooseMarkerFromMap(marker)}>Subscribe to this library</NavLink>
                    //     </div>
                    //   </div>  
                    // }
                    searchOptionList={{ 
                        institution_type_id: (input) => dispatch(requestGetInstitutionTypeOptionList(input)), 
                        country_id: (input) => dispatch(requestGetCountriesOptionList(input)),
                        subject_id: (input) => dispatch(requestLibrarySubjectOptionList(input)), 
                        project_id: (input) => dispatch(requestGetProjectsOptionList(input)),
                        int_country_id: (input) => dispatch(requestGetCountriesOptionList(input)),
                        //disciplinary_id: (input) => dispatch(requestGetDisciplinariesOptionList(input)), 
                    }}
                    messages={{...messages, ...globalMessages}}
                    getValidation={(validation) => checkValidation(validation) }
                />)
            }

                   


            {/* FINITI GLI STEP CARICA IL RIEPILOGO E FAI IL SUBMIT */}
            {currentStep === totalSteps && 
                <div className="summary-wizard">
                    <h3>{intl.formatMessage(wizardMessages.step_4)}</h3>
                    {Object.keys(data).map(key => 
                        <Row key={key}>
                            <Col sm={6}>
                                {messages[key] ? intl.formatMessage({...messages, ...globalMessages}[key]) : key}
                            </Col>
                            <Col sm={6}>
                                {data[key]}
                            </Col>
                        </Row>
                    )}



                    <Button color="brown" onClick={() => dispatch(requestPostPublicLibrary(data, intl.formatMessage(wizardMessages.createMessage)))}>
                        {intl.formatMessage(globalMessages.submit)} 
                    </Button>

                   
                </div>
            }
        </BasePage> 
    )
}

const mapStateToProps = createStructuredSelector({
    institutionsOptionList: institutionsOptionListSelector(),
    
    institutionsByTypeCountryOptionList: institutionsByTypeCountryOptionListSelector(),
    
    libraryProjectsOptionList: libraryProjectsOptionListSelector(),
    countriesOptionList: countriesOptionListSelector(),
    librarySubjectOptionList: librarySubjectOptionListSelector(),
    projectsOptionList: projectsOptionListSelector(),
    institutionsTypesOptionList: institutionsTypeOptionListSelector(),
    places: placesSelector(),
  });
  
  function mapDispatchToProps(dispatch) {
    return {
      dispatch,
    };
  }

  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
  

export default compose(withConnect)(RegisterLibrary)