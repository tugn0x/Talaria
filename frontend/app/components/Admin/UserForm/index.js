import React from 'react';
import { Col, Row } from 'reactstrap';
import globalMessages from 'utils/globalMessages'
import messages from './messages'; 
import {useIntl} from 'react-intl';
// import Loader from 'components/Form/Loader.js';
import {CustomForm} from 'components';
import {fields} from './fields';
import ResourceTable from 'components/Form/ResourceTable';
import SimpleForm from 'components/SimpleForm'

const UserForm = (props) => {
    console.log('UserForm', props)
    const {user, loading, roles, submitFormAction, userResources} = props
    const intl = useIntl();
    return (
        //<SimpleForm loading={loading}>
            <CustomForm 
                submitCallBack={(formData) => submitFormAction(formData)}  
                fields={fields} 
                messages={globalMessages}
                requestData={user ? user : null}
                roles={roles}
                title={user ? user.name : intl.formatMessage(messages.header)} 
                submitText={user ? intl.formatMessage(messages.subtitle) : intl.formatMessage(messages.createNewUser)}
            >
                {userResources && 
                Object.keys(userResources).length > 0 && 
                Object.keys(userResources).map((resource, i) => (
                    <ResourceTable 
                        key={`${resource}-${i}`}
                        resource={userResources[resource]}
                        head={resource}
                    />
                ))
                }
            </CustomForm>
         // </SimpleForm>  
    )
}

export default UserForm
