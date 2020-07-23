import React, {useEffect} from 'react'
import {CustomForm} from 'components';
import {fields} from './fields';
// import messages from './messages';
// import Loader from 'components/Form/Loader.js';
import {useIntl} from 'react-intl';
import globalMessages from 'utils/globalMessages'
import Form from './Form';

const ReferencesForm = (props) => {
    const {createReference, reference, updateReference, messages} = props
    const intl = useIntl();
    
    return (
        <>
                {reference  && 
                    <CustomForm 
                        submitCallBack={(formData) => updateReference(formData)} 
                        requestData={reference}
                        fields={fields} 
                        title={`${intl.formatMessage(globalMessages.update)}`} 
                        messages={messages}
                        submitText={intl.formatMessage(messages.updateSubmitText)}
                    /> 
                ||
                    <Form 
                        messages={messages} 
                        submitCallBack={(formData) => createReference(formData)}
                    />
                }
        </>
    )
}

/* 
<CustomForm 
    submitCallBack={(formData) => createReference(formData)} 
    fields={fields} 
    title={intl.formatMessage(messages.header)} 
    messages={messages}
    submitText={intl.formatMessage(messages.createSubmitText)}
/> */

export default ReferencesForm