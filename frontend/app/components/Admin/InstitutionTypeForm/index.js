import React from 'react';
import {CustomForm} from 'components';
import {fields,fieldsGroups} from './fields';
import globalMessages from 'utils/globalMessages';
import messages from './messages';
import {useIntl} from 'react-intl';

const InstitutionTypeForm = (props) => {
    console.log('InstitutionTypeForm', props)
    const { institutiontype, submitFormAction} = props
    const intl = useIntl();    
    return (
            <CustomForm 
                submitCallBack={(formData) => submitFormAction(formData)}  
                requestData={institutiontype ? institutiontype : null}
                fields={fields}                 
                title={institutiontype && institutiontype.name ? institutiontype.name : intl.formatMessage(messages.header)}
                messages={{...messages, ...globalMessages}}                
            />
        
    )
}

export default InstitutionTypeForm
