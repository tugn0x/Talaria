import React, {useState, useEffect} from 'react'
import {BasePage} from "components";
import WizardNewLibrary from './WizardNewLibrary'
import Header from './WizardNewLibrary/Header'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {institutionsOptionListSelector,
    countriesOptionListSelector, librarySubjectOptionListSelector } from './selectors';
// import messages from './messages'
import {fields, totalSteps} from './fields'
import { requestGetInstitutionTypeOptionList, requestGetCountriesOptionList,
    requestLibrarySubjectOptionList } from "containers/Admin/actions"
import './style.scss'

const RegisterLibrary = (props) => {
    console.log('RegisterLibrary', props)
    const {dispatch} = props
    const [data, setData] = useState({})
    const [step, setStep] = useState(1)
    const [currFields, setCurrFields] = useState({})
    // const [ifNextStep, setIfNextStep] = useState({})

    useEffect(() => {
        dispatch(requestGetInstitutionTypeOptionList())
        dispatch(requestGetCountriesOptionList())
        dispatch(requestLibrarySubjectOptionList())
    },[])

    useEffect(() => {
        let Fields = {}
        Object.keys(fields)
            .filter(key => fields[key].group === `step_${step}` )
            .map(key =>  Fields = {[key]: fields[key], ...Fields})
        setCurrFields(Fields)
    }, [step])

    const onChangeStep = (formData, step) => {
        setData({...data, ...formData})
        setStep(step)
       
    }

    const onChangeData = (field_name, value) => {
        data[field_name] = value
        setData(data)
    }

  /*   useEffect(() => {
        
    }, []) */

    return (
        <BasePage {...props}>
            <Header 
                step={step} 
                totalSteps={totalSteps}
                changeStep={(step) => onChangeStep({}, step) }/>
            {Object.keys(currFields).length > 0 &&
                <WizardNewLibrary 
                    totalSteps={totalSteps}
                    step={step}
                    changeStep={(formData, step) => onChangeStep(formData, step) }
                    formData={data ? data : {}}
                    onChangeData={(field_name, value) => onChangeData(field_name, value)}
                    fields={currFields}
                    institutionsOptionList={props.institutionsOptionList}
                    countriesOptionList={props.countriesOptionList}
                    librarySubjectOptionList={props.librarySubjectOptionList}
                    searches={{ 
                        institution_type_id: (input) => dispatch(requestGetInstitutionTypeOptionList(input)), 
                        country_id: (input) => dispatch(requestGetCountriesOptionList(input)),
                        subject_id: (input) => dispatch(requestLibrarySubjectOptionList(input)) 
                    }}
                />
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