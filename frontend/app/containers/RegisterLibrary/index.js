import React, {useState, useEffect} from 'react'
import {BasePage} from "components";
import WizardNewLibrary from './WizardNewLibrary'
import Header from './WizardNewLibrary/Header'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {institutionsOptionListSelector,
    countriesOptionListSelector, librarySubjectOptionListSelector } from './selectors';
import messages from './messages'
import {fields, totalSteps, setNewSteps} from './fields'
import { requestGetInstitutionTypeOptionList, requestGetCountriesOptionList,
    requestLibrarySubjectOptionList, requestPostPublicLibrary } from "containers/Admin/actions"
import './style.scss'
import {Button,Row, Col} from 'reactstrap'
import {useIntl} from 'react-intl'

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
            <Header 
                step={currentStep} 
                totalSteps={totalSteps}
                steps={steps}
                changeStep={(newStep) => onChangeStep({}, newStep) }/> 
            {Object.keys(currentFields).length > 0 && 
             currentStep <= totalSteps - 1 &&
                (<WizardNewLibrary 
                    totalSteps={totalSteps}
                    step={currentStep}
                    changeStep={(formData, newStep) => onChangeStep(formData, newStep) }
                    formData={data ? data : {}}
                    onChangeData={(field_name, value) => onChangeData(field_name, value)}
                    getValidation={(validation) => checkValidation(validation)}
                    fields={currentFields}
                    institutionsOptionList={props.institutionsOptionList}
                    countriesOptionList={props.countriesOptionList}
                    librarySubjectOptionList={props.librarySubjectOptionList}
                    searches={{ 
                        institution_type_id: (input) => dispatch(requestGetInstitutionTypeOptionList(input)), 
                        country_id: (input) => dispatch(requestGetCountriesOptionList(input)),
                        subject_id: (input) => dispatch(requestLibrarySubjectOptionList(input)) 
                    }}
                />)}
            
            {currentStep === totalSteps && 
                <>
                    {Object.keys(data).map(key => 
                        <Row key={key}>
                            <Col sm={6}>
                                {key}
                            </Col>
                            <Col sm={6}>
                                {data[key]}
                            </Col>
                        </Row>
                    )}
                    <Button color="brown" onClick={() => dispatch(requestPostPublicLibrary(data, intl.formatMessage(messages.createMessage)))}>
                        Submit 
                    </Button>
                </>
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