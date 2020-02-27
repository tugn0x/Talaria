import React from 'react'
import {CustomForm} from 'components';
import {fields} from './fields';
import {Row, Col} from 'reactstrap'
import messages from './messages';
import Loader from 'components/Form/Loader.js';
import {useIntl} from 'react-intl';

const ReferencesForm = (props) => {
    const {createReferences} = props
    const intl = useIntl();
    return (
        <Loader show={props.loading} >
            <Row className="justify-content-center">
                <Col md="9" lg="7" xl="6">
                    <CustomForm 
                        submitCallBack={(formData) => createReferences(formData)} 
                        // user={user}  
                        fields={fields} 
                        title={intl.formatMessage(messages.header)} 
                        messages={messages}
                        // submitText={intl.formatMessage({ id: 'app.containers.UserProfile.subtitle' })}
                        /> 
                </Col>
            </Row>
        </Loader>
    )
}


export default ReferencesForm