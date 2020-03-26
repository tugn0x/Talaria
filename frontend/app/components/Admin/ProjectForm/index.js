import React from 'react';
import {Row, Col} from 'reactstrap';
import {CustomForm} from 'components';
import {fields,fieldsGroups} from './fields';
import globalMessages from 'utils/globalMessages';
import messages from './messages';
import Loader from 'components/Form/Loader.js';
import {useIntl} from 'react-intl';

const ProjectForm = (props) => {
    const { project, loading, updateProject, createProject, titleNewProject} = props
    const intl = useIntl();
    
    return (
        <Loader show={loading} >
            <Row className="justify-content-center">
                <Col md="10">
                    {project &&
                        <CustomForm 
                            submitCallBack={(formData) => updateProject(formData)} 
                            updateFormData={project}
                            fields={fields} 
                            fieldsGroups={fieldsGroups}
                            title={project.name}
                            messages={{...messages, ...globalMessages}}
                        />
                    ||
                        <CustomForm 
                            submitCallBack={(formData) => createProject(formData)} 
                            fields={fields} 
                            fieldsGroups={fieldsGroups}
                            title={titleNewProject}
                            messages={{...messages, ...globalMessages}}
                        />
                    }
                </Col> 
            </Row>
        </Loader>
    )
}

export default ProjectForm