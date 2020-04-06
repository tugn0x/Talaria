import React, {useState, useEffect} from 'react'
import {BasePage} from "components";
import Navigation from './Navigation'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {institutionsOptionListSelector,
    countriesOptionListSelector, librarySubjectOptionListSelector } from './selectors';
import wizardMessages from './messages'
import globalMessages from 'utils/globalMessages';
import messages from 'components/Admin/LibraryForm/messages';
import {fields, totalSteps, setNewSteps} from './fields'
import { requestGetInstitutionTypeOptionList, requestGetCountriesOptionList,
    requestLibrarySubjectOptionList, requestPostPublicLibrary } from "containers/Admin/actions"
import './style.scss'
import {Button,Row, Col} from 'reactstrap'
import {useIntl} from 'react-intl'
import {CustomForm} from 'components'

const RegisterLibrary = (props) => {
    console.log('RegisterLibrary', props)
    const intl = useIntl()
    const {dispatch} = props
    const [data, setData] = useState({})
    let [currentStep, setCurrentStep] = useState(1)
    const [currentFields, setCurrentFields] = useState({})
    const [steps, setSteps] = useState(setNewSteps)

    // Fai le chiamate per le option list
    useEffect(() => {
        dispatch(requestGetInstitutionTypeOptionList())
        dispatch(requestGetCountriesOptionList())
        dispatch(requestLibrarySubjectOptionList())
    },[])

    // Filtra i CAMPI / Fields da mostrare a seconda dello step in cui ti trovi
    useEffect(() => {
        let Fields = {}
        Object.keys(fields)
            .filter(key => fields[key].group === `step_${currentStep}` )
            .map(key =>  Fields = {[key]: fields[key], ...Fields})
        setCurrentFields(Fields)
    }, [currentStep])

    
    // Cambia Step
    const onChangeStep = (formData, newStep) => {
        setData({...data, ...formData})
        setCurrentStep(parseInt(newStep))
        setSteps({...steps, [parseInt(newStep)]: {active: true} })
    }

    // Aggiorna dati nei campi *handle change*
    const onChangeData = (field_name, value) => {
        // data[field_name] = value
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
        <BasePage {...props}>
            <h2>{intl.formatMessage(wizardMessages.header)}</h2>
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
                    institution_id={props.institutionsOptionList} 
                    country_id={props.countriesOptionList}
                    subject_id={props.librarySubjectOptionList}
                    searchOptionList={{ 
                        institution_type_id: (input) => dispatch(requestGetInstitutionTypeOptionList(input)), 
                        country_id: (input) => dispatch(requestGetCountriesOptionList(input)),
                        subject_id: (input) => dispatch(requestLibrarySubjectOptionList(input)) 
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
    countriesOptionList: countriesOptionListSelector(),
    librarySubjectOptionList: librarySubjectOptionListSelector()
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