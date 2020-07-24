import React, {useState, useEffect} from 'react'
import {CustomForm} from 'components';
import {fields} from './fields';
// import messages from './messages';
// import Loader from 'components/Form/Loader.js';
import {useIntl} from 'react-intl';
import formMessages from './messages';
import Form from './Form';
import PreForm from './PreForm';

const ReferencesForm = (props) => {
    const {createReference, reference, updateReference, messages} = props
    const [goToForm, setGoToForm] = useState(false);
    const intl = useIntl();
    
    return (
        <>
                {reference  && 
                    <CustomForm 
                        submitCallBack={(formData) => updateReference(formData)} 
                        requestData={reference}
                        fields={fields} 
                        title={`${intl.formatMessage({id: 'app.global.update'})}`} 
                        messages={messages}
                        submitText={intl.formatMessage(messages.updateSubmitText)}
                    /> 
                ||
                    <>
                        {!goToForm && 
                            <PreForm 
                                goToForm={setGoToForm}
                                messages={formMessages}
                            />
                        ||
                            <Form 
                                messages={messages} 
                                submitCallBack={(formData) => createReference(formData)}
                            />
                        }
                    </>
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