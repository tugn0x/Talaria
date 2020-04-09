import React from 'react';
import {CustomForm} from 'components';
import {fields,fieldsGroups} from './fields';
import globalMessages from 'utils/globalMessages';
import messages from './messages';
import {useIntl} from 'react-intl';
import SimpleForm from 'components/SimpleForm'

const ProjectForm = (props) => {
    console.log('ProjectForm', props)

    const { project, resources,usersOptionList, submitFormAction, loading, searches} = props
    const intl = useIntl();
    
    
    return (
        <SimpleForm loading={loading}>
        <CustomForm 
            submitCallBack={(formData) => submitFormAction(formData)}  
            requestData={project ? project : null}
            fields={fields} 
            fieldsGroups={fieldsGroups}
            usersOptionList={usersOptionList}
            resources={resources}
            granted_permissions={project? project.granted_permissions:[]}
            title={project && project.name ? project.name : intl.formatMessage(messages.header)}
            messages={{...messages, ...globalMessages}}
            searchOptionList={searches}
        />
    </SimpleForm>
    )
}

export default ProjectForm