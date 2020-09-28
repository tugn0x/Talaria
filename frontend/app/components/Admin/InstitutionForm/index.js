import React from 'react';
import {CustomForm} from 'components';
import {fields,fieldsGroups} from './fields';
import globalMessages from 'utils/globalMessages';
import messages from './messages';
import {useIntl} from 'react-intl';
import SimpleForm from 'components/SimpleForm'

const InstitutionForm = (props) => {
    console.log('InstitutionForm', props)
    const { institution,resources,  usersOptionList, submitFormAction, loading, searches, institutionsTypesOptionList, countriesOptionList} = props
    const intl = useIntl();
    // console.log(intl.formatMessage(messages.header))
    return (
        //<SimpleForm loading={loading}>
            <CustomForm 
                submitCallBack={(formData) => submitFormAction(formData)}  
                requestData={institution ? institution : null}
                fields={fields} 
                fieldsGroups={fieldsGroups}
                institution_type_id={institutionsTypesOptionList} 
                country_id={countriesOptionList}
                usersOptionList={usersOptionList}
                resources={resources}
                granted_permissions={institution.granted_permissions}
                title={institution && institution.name ? institution.name : intl.formatMessage(messages.header)}
                messages={{...messages, ...globalMessages}}
                searchOptionList={searches}
            />
        //</SimpleForm>
    )
}

export default InstitutionForm
