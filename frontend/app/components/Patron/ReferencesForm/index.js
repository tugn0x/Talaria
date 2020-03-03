import React, {useEffect} from 'react'
import {CustomForm} from 'components';
import {fields} from './fields';
import {Row, Col} from 'reactstrap'
import messages from './messages';
import Loader from 'components/Form/Loader.js';
import {useIntl} from 'react-intl';
import globalMessages from 'utils/globalMessages'


const ReferencesForm = (props) => {
    const {createReferences, currentReference, updateReferences} = props
    const intl = useIntl();
    
    return (
        <Loader show={props.loading} >
            <Row className="justify-content-center">
                <Col md="10">
                    {currentReference && Object.keys(currentReference).length > 0 &&
                        <CustomForm 
                            submitCallBack={(formData) => updateReferences(formData)} 
                            updateFormData={currentReference}
                            fields={fields} 
                            title={`${intl.formatMessage(globalMessages.update)} ${currentReference.pub_title}`} 
                            messages={messages}
                            submitText={intl.formatMessage(messages.updateSubmitText)}
                        /> 
                    ||
                        <CustomForm 
                            submitCallBack={(formData) => createReferences(formData)} 
                            fields={fields} 
                            title={intl.formatMessage(messages.header)} 
                            messages={messages}
                            submitText={intl.formatMessage(messages.createSubmitText)}
                        />
                    }
                </Col>
            </Row>
        </Loader>
    )
}


export default ReferencesForm