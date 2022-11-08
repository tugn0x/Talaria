import React from 'react';
import {CustomForm} from 'components';
import {fields,fieldsGroups} from './fields';
import globalMessages from 'utils/globalMessages';
import messages from './messages';
import {useIntl} from 'react-intl';

const InstitutionForm = (props) => {
    console.log('InstitutionForm', props)
    const { institution, submitFormAction, searches, institutionsTypesOptionList, countriesOptionList} = props
    const intl = useIntl();    
    return (
            <CustomForm 
                submitCallBack={(formData) => submitFormAction(formData)}  
                requestData={institution ? institution : null}
                fields={fields} 
                fieldsGroups={fieldsGroups}
                institution_type_id={institutionsTypesOptionList} 
                country_id={countriesOptionList}
                title={institution && institution.name ? institution.name : intl.formatMessage(messages.header)}
                messages={{...messages, ...globalMessages}}
                searchOptionList={searches}
            />
        
    )
}

export default InstitutionForm
