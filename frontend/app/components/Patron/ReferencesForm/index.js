import React, {useEffect} from 'react'
import {CustomForm} from 'components';
import {fields} from './fields';
import {Row, Col} from 'reactstrap'
import messages from './messages';
import Loader from 'components/Form/Loader.js';
import {useIntl} from 'react-intl';
import globalMessages from 'utils/globalMessages'


const ReferencesForm = (props) => {
    const {createReference, reference, loading, updateReference} = props
    const intl = useIntl();
    
    return (
        <Row className="justify-content-center">
            <Col md="10">
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
                    <CustomForm 
                        submitCallBack={(formData) => createReference(formData)} 
                        fields={fields} 
                        title={intl.formatMessage(messages.header)} 
                        messages={messages}
                        submitText={intl.formatMessage(messages.createSubmitText)}
                    />
                }
            </Col>
        </Row>
    )
}


export default ReferencesForm