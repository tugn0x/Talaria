import React from 'react';
import { Col, Row } from 'reactstrap';
import globalMessages from 'utils/globalMessages'
import messages from './messages'; 
import {useIntl} from 'react-intl';
// import Loader from 'components/Form/Loader.js';
import {CustomForm} from 'components';
import {fields} from './fields';
import ResourceTable from 'components/Form/ResourceTable';

const UserForm = (props) => {
    console.log('UserForm', props)
    const {user, updateUser, createUser, roles, userResources} = props
    const intl = useIntl();
    return (
        <Row className="justify-content-center">
            <Col md="10">
                {user && 
                    <>
                        <CustomForm 
                            submitCallBack={(formData) => updateUser(formData) } 
                            fields={fields} 
                            messages={globalMessages}
                            updateFormData={user}
                            roles={roles}
                            title={intl.formatMessage(messages.header)} 
                            submitText={intl.formatMessage(messages.subtitle)}
                        >
                            {userResources && 
                            Object.keys(userResources).length && 
                            Object.keys(userResources).map((resource, i) => (
                                <ResourceTable 
                                    key={`${resource}-${i}`}
                                    resource={userResources[resource]}
                                    head={resource}
                                />
                            ))
                            }
                        </CustomForm>
                    </>
                ||
                    <CustomForm 
                        submitCallBack={(formData) => createUser(formData) } 
                        fields={fields} 
                        roles={roles}
                        messages={globalMessages}
                        title={intl.formatMessage(messages.createNewUser)} 
                        submitText={intl.formatMessage(messages.createNewUser)}
                    />
                }
            </Col>
        </Row>
    )
}

export default UserForm
