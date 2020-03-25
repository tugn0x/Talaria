import React from 'react';
import {CustomForm} from 'components';
import {fields,fieldsGroups} from './fields';
import globalMessages from 'utils/globalMessages';
import messages from './messages';
import {useIntl} from 'react-intl';
import SimpleForm from 'components/SimpleForm'

const InstitutionForm = (props) => {
    console.log('InstitutionForm', props)
    const { institution, updateInstitution, loading, createInstitution, searches, institutionsOptionList, countriesOptionList} = props
    const intl = useIntl();
    return (
        <SimpleForm loading={loading}>
            { institution &&
                <CustomForm 
                    submitCallBack={(formData) => updateInstitution(formData)} 
                    requestData={institution}
                    fields={fields} 
                    institution_type_id={institutionsOptionList} 
                    country_id={countriesOptionList}
                    fieldsGroups={fieldsGroups}
                    title={institution.name}
                    messages={messages}
                    searchOptionList={searches}
                />
            || 
                <CustomForm
                    institution_type_id={institutionsOptionList}
                    country_id={countriesOptionList}
                    submitCallBack={(formData) => createInstitution(formData)}
                    fields={fields}
                    fieldsGroups={fieldsGroups}
                    searchOptionList={searches}
                    title={intl.formatMessage(messages.header)}
                    messages={{...messages, ...globalMessages}}
                />
            }
        </SimpleForm>
        
    )
}

export default InstitutionForm
