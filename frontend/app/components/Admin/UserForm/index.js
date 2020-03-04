import React from 'react';
import { Col, Row } from 'reactstrap';
import messages from 'components/Auth/ProfileForm/messages'; 
import {useIntl} from 'react-intl';
import Loader from 'components/Form/Loader.js';

import {CustomForm} from 'components';
import {fields} from './fields';

const UserForm = (props) => {
    const {user, updateUser, loading, createUser} = props
    const intl = useIntl();
    return (
        <Loader show={loading} >
            <Row className="justify-content-center">
                <Col md="9" lg="7" xl="6">
                    {user && 
                        <CustomForm 
                            submitCallBack={(formData) => updateUser(formData) } 
                            fields={fields} 
                            messages={messages}
                            updateFormData={user}
                            title={intl.formatMessage(messages.header)} 
                            submitText={intl.formatMessage(messages.subtitle)}
                        />
                    ||
                        <CustomForm 
                            submitCallBack={(formData) => createUser(formData) } 
                            fields={fields} 
                            messages={messages}
                            title={"Create New User"} 
                            submitText={"Create new User"}
                        />
                    }
                     
                </Col>
            </Row>
        </Loader>
    )
}

export default UserForm
