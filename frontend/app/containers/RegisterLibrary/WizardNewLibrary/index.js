import React, { useEffect } from 'react'
import {CustomForm} from 'components'
import globalMessages from 'utils/globalMessages';
import messages from 'components/Admin/LibraryForm/messages';
import {useIntl} from 'react-intl'


const WizardNewLibrary = (props) => {
    console.log('WizardNewLibrary', props)
    const intl = useIntl()

    return (
        <>  
            
                <CustomForm 
                    submitCallBack={(formData) => props.changeStep(formData, props.totalSteps > props.step ? props.step+1 : props.step )} 
                    requestData={props.formData ? props.formData : null}
                    onChangeData={(field_name, value) => props.onChangeData(field_name, value)}
                    fields={props.fields}
                    submitText={props.step !== props.totalSteps ? intl.formatMessage(globalMessages.continue) : intl.formatMessage(globalMessages.submit)}
                    className="wizard-form"
                    institution_id={props.institutionsOptionList} 
                    country_id={props.countriesOptionList}
                    subject_id={props.librarySubjectOptionList}
                    searchOptionList={props.searches} 
                    messages={{...messages, ...globalMessages}}
                    getValidation={(validation) => props.getValidation(validation) }
                />
            
            
            
        </>
    )
}

export default WizardNewLibrary